"use client";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";

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
  companyName?: string;
  companyLogo?: string;
  theme?: "light" | "dark" | "auto";
  title?: string;
  subtitle?: string;
  submitLabel?: string;
  footer?: React.ReactNode;
  tagline?: React.ReactNode;
};

// ── Phone formatting helper ────────────────────────────────────────────────
function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

// ── Treat anything under 600px as mobile ──────────────────────────────────
const MOBILE_BREAKPOINT = 600;

export default function FullScreenLogin({
  fields,
  onLogin,
  isLoading,
  error,
  success,
  companyName = "Your Company",
  companyLogo,
  theme,
  title = "Welcome back.",
  subtitle = "Sign in to continue where you left off.",
  submitLabel = "Sign in",
  footer,
  tagline,
}: FullScreenLoginProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isDark, setIsDark] = useState(theme === "dark");
  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // ── Dark mode via prop → localStorage → OS preference ───────────────────
  useLayoutEffect(() => {
    if (theme) {
      setIsDark(theme === "dark");
      setIsReady(true);
      return;
    }
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(saved === "dark" || (!saved && prefersDark));
    setIsReady(true);
  }, [theme]);

  useEffect(() => {
    if (theme && theme !== "auto") return;
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [theme]);

  // ── Container-width based mobile detection ───────────────────────────────
  // NOTE: depends on `isReady` because the component returns null until
  // isReady=true, so rootRef.current is null on the first effect run.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setIsMobile(entry.contentRect.width < MOBILE_BREAKPOINT);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [isReady]);

  // ── Handle input change with phone formatting ────────────────────────────
  const handleChange = (name: string, value: string) => {
    const formatted = name === "phone" ? formatPhone(value) : value;
    setValues((prev) => ({ ...prev, [name]: formatted }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin?.(values);
  };

  if (!isReady) return null;

  // ── Design tokens ──────────────────────────────────────────────────────
  const t = isDark
    ? {
      root: "bg-gray-950 text-white",
      panel: "bg-gray-900 border-gray-800",
      formBg: "bg-gray-950",
      inputBg: "bg-gray-900",
      inputFocusBg: "focus:bg-gray-800",
      inputBorder: "border-gray-700",
      inputText: "text-gray-100",
      placeholder: "placeholder-gray-600",
      label: "text-gray-400",
      heading: "text-gray-100",
      sub: "text-gray-500",
      tagline: "text-gray-100",
      taglineAccent: "text-white",
      panelFooter: "text-gray-600",
      toggleText: "text-gray-500",
      decorLine: "bg-white",
      dot: "bg-white",
      mobileHeader: "bg-gray-900 border-gray-800",
      mobileHeaderText: "text-gray-400",
    }
    : {
      root: "bg-gray-50 text-gray-900",
      panel: "bg-white border-gray-200",
      formBg: "bg-gray-50",
      inputBg: "bg-gray-50",
      inputFocusBg: "focus:bg-white",
      inputBorder: "border-gray-200",
      inputText: "text-gray-900",
      placeholder: "placeholder-gray-400",
      label: "text-gray-700",
      heading: "text-gray-900",
      sub: "text-gray-500",
      tagline: "text-gray-900",
      taglineAccent: "text-black",
      panelFooter: "text-gray-400",
      toggleText: "text-gray-400",
      decorLine: "bg-black",
      dot: "bg-black",
      mobileHeader: "bg-white border-gray-200",
      mobileHeaderText: "text-gray-500",
    };

  const orbGradient = isDark
    ? "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.03) 0%, transparent 70%)"
    : "radial-gradient(circle at 40% 40%, rgba(0,0,0,0.04) 0%, transparent 70%)";

  // ── Shared form JSX ──────────────────────────────────────────────────────
  const form = (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 mb-6">
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
                  ? "(000) 000-0000"
                  : "••••••••");

          const type =
            field.name === "password"
              ? showPassword
                ? "text"
                : "password"
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
                  inputMode={field.name === "phone" ? "numeric" : undefined}
                  maxLength={field.name === "phone" ? 14 : undefined}
                  autoComplete={
                    field.name === "phone"
                      ? "tel"
                      : field.name === "email"
                        ? "email"
                        : field.name === "username"
                          ? "username"
                          : field.name === "password"
                            ? "current-password"
                            : undefined
                  }
                  className={[
                    "w-full border rounded-xl px-3.5 py-2.5 text-sm",
                    "outline-none transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    t.inputBg,
                    t.inputFocusBg,
                    t.inputBorder,
                    t.inputText,
                    t.placeholder,
                    field.name === "password" ? "pr-16" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />
                {field.name === "password" && (
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    disabled={isLoading}
                    className={`absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium hover:text-gray-700 transition-colors disabled:opacity-40 ${t.toggleText}`}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-black text-white text-sm font-medium rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-800 hover:-translate-y-px active:translate-y-0 disabled:opacity-55 disabled:cursor-not-allowed"
      >
        {isLoading && (
          <span className="w-3.5 h-3.5 border-2 border-gray-600 border-t-white rounded-full animate-spin shrink-0" />
        )}
        {isLoading ? "Signing in…" : submitLabel}
      </button>

      {footer && <div className="mt-5">{footer}</div>}
    </form>
  );

  const alerts = (
    <>
      {error && (
        <div
          className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg px-4 py-3 mb-5"
          role="alert"
        >
          <svg className="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M8 5v3.5M8 11h.01"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          {error}
        </div>
      )}
      {success && (
        <div
          className={[
            "flex items-start gap-2 text-sm border rounded-lg px-4 py-3 mb-5",
            isDark
              ? "text-green-300 bg-green-950/40 border-green-900"
              : "text-green-700 bg-green-50 border-green-100",
          ].join(" ")}
          role="alert"
        >
          <svg className="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M5 8l2 2 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {success}
        </div>
      )}
    </>
  );

  return (
    <div ref={rootRef} className={`h-full flex transition-colors duration-300 ${t.root}`}>
      {/* ── MOBILE layout ───────────────────────────────────────── */}
      <div
        className={`${isMobile ? "flex" : "hidden"} flex-col w-full h-full overflow-auto transition-colors duration-300 ${t.formBg}`}
      >
        {/* Top bar with brand */}
        <div
          className={`shrink-0 flex items-center justify-center gap-2.5 px-5 py-4 duration-300`}
        >
          {companyLogo ? (
            <img src={companyLogo} alt={companyName} className="h-6 w-auto object-contain" />
          ) : (
            <div className={`w-1.5 h-1.5 rounded-full ${t.dot}`} />
          )}
          <span
            className={`text-[0.72rem] font-medium tracking-[0.14em] uppercase ${t.mobileHeaderText}`}
          >
            {companyName}
          </span>
        </div>

        {/* Form area */}
        <div className="flex-1 flex flex-col justify-center px-5 py-8">
          <h1
            className={`text-[1.8rem] leading-[1.15] mb-1 font-bold tracking-tight ${t.heading}`}
          >
            {title}
          </h1>
          <p className={`text-sm font-light mb-7 leading-relaxed ${t.sub}`}>{subtitle}</p>
          {alerts}
          {form}
        </div>

        {/* Footer */}
        <div className="shrink-0 px-5 py-4 text-center">
          <span className={`text-[0.65rem] tracking-widest uppercase ${t.panelFooter}`}>
            © {new Date().getFullYear()} {companyName}
          </span>
        </div>
      </div>

      {/* ── DESKTOP layout (split panel) ────────────────────────────────────────── */}
      <div className={`${isMobile ? "hidden" : "flex"} flex-1 overflow-hidden w-full transition-colors duration-300 ${t.root}`}>
        {/* Left decorative panel */}
        <div
          className={`flex w-[42%] border-r ${t.panel} p-12 flex-col justify-between relative overflow-hidden transition-colors duration-300`}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />
          <div
            className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
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
              <div className={`w-14 h-[3px] rounded-full mb-6 ${t.decorLine}`} />
            )}
            {tagline ? (
              <div
                className={`text-[2.1rem] leading-[1.3] max-w-[280px] transition-colors duration-300 ${t.tagline}`}
              >
                {tagline}
              </div>
            ) : (
              <p
                className={`text-[2.1rem] leading-[1.3] max-w-[280px] italic font-normal transition-colors duration-300 ${t.tagline}`}
              >
                The place where
                <br />
                <strong className={`not-italic font-bold ${t.taglineAccent}`}>great work</strong>
                <br />
                begins.
              </p>
            )}
          </div>

          <span
            className={`relative text-[0.72rem] tracking-widest uppercase transition-colors duration-300 ${t.panelFooter}`}
          >
            © {new Date().getFullYear()} {companyName}
          </span>
        </div>

        {/* Right form panel */}
        <div
          className={`flex-1 flex items-center justify-center px-6 py-10 overflow-auto transition-colors duration-300 ${t.formBg}`}
        >
          <div className="w-full max-w-[400px]">
            <h1
              className={`text-[2.2rem] leading-[1.15] mb-1.5 font-bold tracking-tight transition-colors duration-300 ${t.heading}`}
            >
              {title}
            </h1>
            <p
              className={`text-sm font-light mb-8 leading-relaxed transition-colors duration-300 ${t.sub}`}
            >
              {subtitle}
            </p>
            {alerts}
            {form}
          </div>
        </div>
      </div>
    </div>
  );
}