"use client";
import React, { useState } from "react";

export type Field =
  | { name: "email"; label?: string; type?: "email"; placeholder?: string }
  | { name: "username"; label?: string; type?: "text"; placeholder?: string }
  | { name: "phone"; label?: string; type?: "tel"; placeholder?: string }
  | { name: "password"; label?: string; type?: "password"; placeholder?: string };

export type FullScreenLoginProps = {
  fields: Field[];
  onLogin?: (values: Record<string, string>) => void;
  isLoading?: boolean;
  error?: string | null;
  success?: string | null;
  /** Company name shown in the top bar and left panel footer. */
  companyName?: string;
  /** URL of the company logo shown in the top bar and left panel. */
  companyLogo?: string;
  /** Control the initial theme from outside. Defaults to "light". */
  system?: { theme?: "light" | "dark" };
};

export default function FullScreenLogin({
  fields,
  onLogin,
  isLoading,
  error,
  success,
  companyName = "Your Company",
  companyLogo,
  system,
}: FullScreenLoginProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const [isDark, setIsDark] = useState(system?.theme === "dark");

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin?.(values);
  };

  // ── Token maps ──────────────────────────────────────────────────────────────
  // Colors now mirror Login: grays, black accent, red/green alerts
  const t = isDark
    ? {
        root:          "bg-gray-950",
        topBar:        "bg-gray-950 border-gray-800",
        panel:         "bg-gray-900 border-gray-800",
        formBg:        "bg-gray-950",
        inputBg:       "bg-gray-900",
        inputFocusBg:  "focus:bg-gray-800",
        inputBorder:   "border-gray-700",
        tagline:       "text-gray-100",
        panelFooter:   "text-gray-600",
        brandText:     "text-gray-500",
        heading:       "text-gray-100",
        sub:           "text-gray-500",
        label:         "text-gray-400",
        inputText:     "text-gray-100",
        placeholder:   "placeholder-gray-600",
        toggleText:    "text-gray-500",
        spinnerBorder: "border-gray-800 border-t-gray-950",
        toggleBg:      "bg-gray-800",
        thumbBg:       "bg-gray-950",
        thumbPos:      "translate-x-0",
      }
    : {
        root:          "bg-gray-50",
        topBar:        "bg-gray-50 border-gray-200",
        panel:         "bg-white border-gray-200",
        formBg:        "bg-gray-50",
        inputBg:       "bg-gray-50",
        inputFocusBg:  "focus:bg-white",
        inputBorder:   "border-gray-200",
        tagline:       "text-gray-900",
        panelFooter:   "text-gray-400",
        brandText:     "text-gray-500",
        heading:       "text-gray-900",
        sub:           "text-gray-500",
        label:         "text-gray-700",
        inputText:     "text-gray-900",
        placeholder:   "placeholder-gray-400",
        toggleText:    "text-gray-400",
        spinnerBorder: "border-gray-200 border-t-gray-900",
        toggleBg:      "bg-gray-200",
        thumbBg:       "bg-white",
        thumbPos:      "translate-x-7",
      };

  const orbGradient = isDark
    ? "radial-gradient(circle at 40% 40%, rgba(0,0,0,0.3) 0%, transparent 70%)"
    : "radial-gradient(circle at 40% 40%, rgba(0,0,0,0.04) 0%, transparent 70%)";

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${t.root}`}
      // Font changed to match Login: system sans-serif stack (Tailwind default)
    >
      {/* ── Top bar ── */}
      <div className={`w-full flex items-center justify-between px-6 py-3 border-b transition-colors duration-300 ${t.topBar}`}>
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          {companyLogo ? (
            <img
              src={companyLogo}
              alt={companyName}
              className="h-7 w-auto object-contain"
            />
          ) : (
            <div className="w-2 h-2 rounded-full bg-black" />
          )}
          <span className={`text-[0.78rem] font-medium tracking-[0.14em] uppercase transition-colors duration-300 ${t.brandText}`}>
            {companyName}
          </span>
        </div>

        {/* Theme toggle pill */}
        <button
          type="button"
          onClick={() => setIsDark((v) => !v)}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className={`relative flex items-center w-14 h-7 rounded-full px-1 transition-all duration-300 focus:outline-none ${t.toggleBg}`}
        >
          <span className="absolute left-1.5 text-[0.65rem]">🌙</span>
          <span className="absolute right-1.5 text-[0.65rem]">☀️</span>
          <span
            className={`relative z-10 w-5 h-5 rounded-full shadow-md transition-all duration-300 ${t.thumbBg} ${t.thumbPos}`}
          />
        </button>
      </div>

      {/* ── Main split layout ── */}
      <div className="flex flex-1">

        {/* Left decorative panel */}
        <div className={`hidden lg:flex w-[42%] border-r ${t.panel} p-12 flex-col justify-between relative overflow-hidden transition-colors duration-300`}>
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />
          <div
            className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full pointer-events-none transition-all duration-300"
            style={{ background: orbGradient }}
          />
          <div className="relative">
            {companyLogo ? (
              <img
                src={companyLogo}
                alt={companyName}
                className="h-12 w-auto object-contain mb-8"
              />
            ) : (
              <div className="w-14 h-[3px] bg-black rounded-full mb-6" />
            )}
            <p
              className={`text-[2.1rem] leading-[1.3] max-w-[280px] italic font-normal transition-colors duration-300 ${t.tagline}`}
            >
              The place where<br />
              {/* Accent text: black */}
              <strong className="not-italic font-bold text-black">great work</strong><br />
              begins.
            </p>
          </div>
          <span className={`relative text-[0.72rem] tracking-widest uppercase transition-colors duration-300 ${t.panelFooter}`}>
            © {new Date().getFullYear()} {companyName}
          </span>
        </div>

        {/* Right form panel */}
        <div className={`flex-1 flex items-center justify-center px-6 py-10 transition-colors duration-300 ${t.formBg}`}>
          <div className="w-full max-w-[400px] pt-4">

            <h1
              className={`text-[2.2rem] leading-[1.15] mb-1.5 font-bold tracking-tight transition-colors duration-300 ${t.heading}`}
            >
              Welcome<br />back.
            </h1>
            <p className={`text-sm font-light mb-8 leading-relaxed transition-colors duration-300 ${t.sub}`}>
              Sign in to continue where you left off.
            </p>

            {/* Error alert — colors match Login's red-50/red-700/red-100 */}
            {error && (
              <div
                className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg px-4 py-3 mb-6"
                role="alert"
              >
                <svg className="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 5v3.5M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {error}
              </div>
            )}

            {/* Success alert — colors match Login's green-50/green-700/green-100 */}
            {success && (
              <div
                className="flex items-start gap-2 text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-4 py-3 mb-6"
                role="alert"
              >
                <svg className="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {success}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4 mb-8">
                {fields.map((field) => {
                  const label =
                    field.label ??
                    (field.name === "email"
                      ? "Email address"
                      : field.name === "username"
                      ? "Username"
                      : field.name === "phone"
                      ? "Phone number"
                      : "Password");

                  const placeholder =
                    field.placeholder ??
                    (field.name === "email"
                      ? "you@example.com"
                      : field.name === "username"
                      ? "e.g. username"
                      : field.name === "phone"
                      ? "e.g. 012345678"
                      : "••••••••");

                  const type =
                    field.name === "password"
                      ? showPassword ? "text" : "password"
                      : field.type ?? (field.name === "email" ? "email" : "text");

                  return (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className={`block text-sm font-medium mb-1.5 transition-colors duration-300 ${t.label}`}
                      >
                        {label}
                      </label>
                      <div className="relative">
                        <input
                          id={field.name}
                          name={field.name}
                          type={type}
                          value={values[field.name] ?? ""}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          placeholder={placeholder}
                          disabled={isLoading}
                          className={[
                            "w-full border rounded-xl",
                            "px-3.5 py-2.5 text-sm",
                            "outline-none transition-all duration-200",
                            // Black focus ring to match Login's focus:ring-black
                            "focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent",
                            "disabled:opacity-50 disabled:cursor-not-allowed",
                            t.inputBg,
                            t.inputFocusBg,
                            t.inputBorder,
                            t.inputText,
                            t.placeholder,
                            field.name === "password" ? "pr-16" : "",
                          ].filter(Boolean).join(" ")}
                        />
                        {field.name === "password" && (
                          <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            disabled={isLoading}
                            className={`absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium hover:text-gray-700 transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed ${t.toggleText}`}
                          >
                            {showPassword ? "Hide" : "Show"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Submit — black button to match Login's black Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-black text-white text-sm font-medium rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-800 hover:-translate-y-px active:translate-y-0 disabled:opacity-55 disabled:cursor-not-allowed"
              >
                {isLoading && (
                  <span className={`w-3.5 h-3.5 border-2 rounded-full animate-spin shrink-0 ${t.spinnerBorder}`} />
                )}
                {isLoading ? "Signing in…" : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}