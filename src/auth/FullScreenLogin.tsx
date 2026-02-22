"use client";
import React, { useState } from "react";

export type Field =
  | { name: "email"; label?: string; type?: "email"; placeholder?: string }
  | { name: "username"; label?: string; type?: "text"; placeholder?: string }
  | { name: "phone"; label?: string; type?: "tel"; placeholder?: string }
  | { name: "password"; label?: string; type?: "password"; placeholder?: string };

export type Login2Props = {
  fields: Field[];
  onLogin?: (values: Record<string, string>) => void;
  isLoading?: boolean;
  error?: string | null;
  success?: string | null;
  /** Control the initial theme from outside. Defaults to "dark". */
  system?: { theme?: "light" | "dark" };
};

export default function Login2({
  fields,
  onLogin,
  isLoading,
  error,
  success,
  system,
}: Login2Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Reads system.theme to set the initial state correctly.
  // system={{ theme: "light" }} → isDark starts as false (light mode)
  // system={{ theme: "dark" }} or omitted → isDark starts as true (dark mode)
  const [isDark, setIsDark] = useState(system?.theme === "dark");

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin?.(values);
  };

  // ── Token maps ──────────────────────────────────────────────────────────────
  const t = isDark
    ? {
        root:          "bg-[#0c0c0e]",
        topBar:        "bg-[#0c0c0e] border-[#1e1e24]",
        panel:         "bg-[#111114] border-[#1e1e24]",
        formBg:        "bg-[#0c0c0e]",
        inputBg:       "bg-[#16161a]",
        inputFocusBg:  "focus:bg-[#18181e]",
        inputBorder:   "border-[#222228]",
        tagline:       "text-[#e8e8e0]",
        panelFooter:   "text-[#3a3a44]",
        brandText:     "text-[#5a5a66]",
        heading:       "text-[#f0f0ea]",
        sub:           "text-[#4a4a56]",
        label:         "text-[#4a4a56]",
        inputText:     "text-[#e8e8e0]",
        placeholder:   "placeholder-[#2e2e38]",
        toggleText:    "text-[#3a3a46]",
        spinnerBorder: "border-[rgba(12,12,14,0.3)] border-t-[#0c0c0e]",
        toggleBg:      "bg-[#e8c97a]",
        thumbBg:       "bg-[#0c0c0e]",
        thumbPos:      "translate-x-0",
      }
    : {
        root:          "bg-[#f5f4f0]",
        topBar:        "bg-[#f5f4f0] border-[#ddd9ce]",
        panel:         "bg-[#eeeae0] border-[#ddd9ce]",
        formBg:        "bg-[#f5f4f0]",
        inputBg:       "bg-white",
        inputFocusBg:  "focus:bg-white",
        inputBorder:   "border-[#ddd9ce]",
        tagline:       "text-[#1a1a14]",
        panelFooter:   "text-[#b0aa9a]",
        brandText:     "text-[#9a9488]",
        heading:       "text-[#1a1a14]",
        sub:           "text-[#7a7468]",
        label:         "text-[#7a7468]",
        inputText:     "text-[#1a1a14]",
        placeholder:   "placeholder-[#c0bbb0]",
        toggleText:    "text-[#b0aa9a]",
        spinnerBorder: "border-[rgba(245,244,240,0.4)] border-t-[#0c0c0e]",
        toggleBg:      "bg-[#ddd9ce]",
        thumbBg:       "bg-white",
        thumbPos:      "translate-x-7",
      };

  const orbGradient = isDark
    ? "radial-gradient(circle at 40% 40%, rgba(232,201,122,0.06) 0%, transparent 70%)"
    : "radial-gradient(circle at 40% 40%, rgba(232,201,122,0.18) 0%, transparent 70%)";

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${t.root}`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Top bar ── */}
      <div className={`w-full flex items-center justify-between px-6 py-3 border-b transition-colors duration-300 ${t.topBar}`}>
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#e8c97a]" />
          <span className={`text-[0.78rem] font-medium tracking-[0.14em] uppercase transition-colors duration-300 ${t.brandText}`}>
            Your Company
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
            <div className="w-14 h-[3px] bg-[#e8c97a] rounded-full mb-6" />
            <p
              className={`text-[2.1rem] leading-[1.3] max-w-[280px] italic font-normal transition-colors duration-300 ${t.tagline}`}
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              The place where<br />
              <strong className="not-italic font-bold text-[#e8c97a]">great work</strong><br />
              begins.
            </p>
          </div>
          <span className={`relative text-[0.72rem] tracking-widest uppercase transition-colors duration-300 ${t.panelFooter}`}>
            © 2026 Your Company
          </span>
        </div>

        {/* Right form panel */}
        <div className={`flex-1 flex items-center justify-center px-6 py-10 transition-colors duration-300 ${t.formBg}`}>
          <div className="w-full max-w-[400px] pt-4">

            <h1
              className={`text-[2.2rem] leading-[1.15] mb-1.5 font-bold transition-colors duration-300 ${t.heading}`}
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Welcome<br />back.
            </h1>
            <p className={`text-[0.87rem] font-light mb-8 leading-relaxed transition-colors duration-300 ${t.sub}`}>
              Sign in to continue where you left off.
            </p>

            {/* Error alert */}
            {error && (
              <div
                className="flex items-start gap-3 px-4 py-3.5 rounded-[10px] mb-6 text-[0.82rem] leading-snug text-[#c0402a] border"
                style={{ background: "rgba(220,80,60,0.1)", borderColor: "rgba(220,80,60,0.2)" }}
                role="alert"
              >
                <svg className="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 5v3.5M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {error}
              </div>
            )}

            {/* Success alert */}
            {success && (
              <div
                className="flex items-start gap-3 px-4 py-3.5 rounded-[10px] mb-6 text-[0.82rem] leading-snug text-[#2a8a58] border"
                style={{ background: "rgba(80,180,120,0.1)", borderColor: "rgba(80,180,120,0.2)" }}
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
                        className={`block text-[0.72rem] font-medium tracking-[0.1em] uppercase mb-2 transition-colors duration-300 ${t.label}`}
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
                            "w-full border rounded-[10px]",
                            "px-4 py-3.5 text-[0.9rem]",
                            "outline-none transition-all duration-200",
                            "focus:border-[#e8c97a]",
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
                            className={`absolute right-4 top-1/2 -translate-y-1/2 text-[0.7rem] font-medium tracking-[0.08em] uppercase hover:text-[#e8c97a] transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed ${t.toggleText}`}
                          >
                            {showPassword ? "Hide" : "Show"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-[#e8c97a] text-[#0c0c0e] text-[0.87rem] font-medium tracking-[0.06em] rounded-[10px] cursor-pointer transition-all duration-200 hover:bg-[#f0d88a] hover:-translate-y-px active:translate-y-0 disabled:opacity-55 disabled:cursor-not-allowed"
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