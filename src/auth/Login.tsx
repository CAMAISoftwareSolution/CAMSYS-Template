"use client";

import React, { useState, useEffect, useLayoutEffect } from "react";
import { Button } from "../ui";

export type Field =
  | { name: "email"; label?: string; type?: "email"; placeholder?: string }
  | { name: "username"; label?: string; type?: "text"; placeholder?: string }
  | { name: "phone"; label?: string; type?: "tel"; placeholder?: string }
  | { name: "password"; label?: string; type?: "password"; placeholder?: string };

export type LoginProps = {
  fields: Field[];
  onLogin?: (values: Record<string, string>) => void;
  isLoading?: boolean;
  error?: string | null;
  success?: string | null;
  theme?: "light" | "dark" | "auto";
  logo?: string;
  logoAlt?: string;
  title?: string;
  subtitle?: string;
  submitLabel?: string;
  buttonProps?: Omit<React.ComponentProps<typeof Button>, "type" | "disabled" | "children">;
  footer?: React.ReactNode;
};

export default function Login({
  fields,
  onLogin,
  isLoading,
  error,
  success,
  theme,
  logo,
  logoAlt = "Logo",
  title = "Welcome back",
  subtitle = "Sign in to your account to continue",
  submitLabel = "Sign in",
  buttonProps,
  footer,
}: LoginProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  // ── Dark mode: prop → localStorage → OS preference ───────────────────────
  const [isDark, setIsDark] = useState(theme === "dark");

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
    if (theme && theme !== "auto") return; // explicit prop wins — no observer needed
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [theme]);

  useEffect(() => {
    setLogoFailed(false);
  }, [logo]);

  // ── Design tokens ──────────────────────────────────────────────────────────
  const T = {
    pageBg: isDark ? "bg-gray-950" : "bg-gray-50",
    cardBg: isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100",
    heading: isDark ? "text-white" : "text-gray-900",
    subtext: isDark ? "text-gray-400" : "text-gray-500",
    label: isDark ? "text-gray-300" : "text-gray-700",
    input: isDark
      ? "border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:ring-indigo-500 focus:bg-gray-800"
      : "border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-black focus:bg-white",
    eyeBtn: isDark ? "text-gray-500 hover:text-gray-200" : "text-gray-400 hover:text-gray-700",
    iconBg: isDark ? "bg-indigo-600" : "bg-black",
    error: isDark ? "text-red-400 bg-red-950 border-red-900" : "text-red-700 bg-red-50 border-red-100",
    success: isDark ? "text-green-400 bg-green-950 border-green-900" : "text-green-700 bg-green-50 border-green-100",
  };

  const handleChange = (name: string, value: string) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin?.(values);
  };

  if (!isReady) return null;

  return (
    <div className={`h-full flex items-center justify-center ${T.pageBg} px-4 py-8 transition-colors duration-300`}>
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-8">
          {logo && !logoFailed ? (
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
              <img
                src={logo}
                alt={logoAlt}
                className="w-12 h-12 object-contain"
                onError={() => setLogoFailed(true)}
              />
            </div>
          ) : (
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${T.iconBg} mb-4 transition-colors duration-300`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          )}
          <h1 className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${T.heading}`}>{title}</h1>
          <p className={`text-sm mt-1 transition-colors duration-300 ${T.subtext}`}>{subtitle}</p>
        </div>

        {/* Card */}
        <div className={`rounded-2xl shadow-sm border p-8 transition-colors duration-300 ${T.cardBg}`}>

          {error && (
            <div className={`flex items-start gap-2 text-sm rounded-lg px-4 py-3 mb-5 border ${T.error}`}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          {success && (
            <div className={`flex items-start gap-2 text-sm rounded-lg px-4 py-3 mb-5 border ${T.success}`}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => {
              const label =
                field.label ??
                (field.name === "email" ? "Email address"
                  : field.name === "username" ? "Username"
                    : field.name === "phone" ? "Phone number"
                      : "Password");

              const placeholder =
                field.placeholder ??
                (field.name === "email" ? "you@example.com"
                  : field.name === "username" ? "e.g. username"
                    : field.name === "phone" ? "e.g. 012345678"
                      : "••••••••");

              const type =
                field.name === "password"
                  ? showPassword ? "text" : "password"
                  : field.type ?? (field.name === "email" ? "email" : "text");

              return (
                <div key={field.name}>
                  <label className={`block text-sm font-medium mb-1.5 transition-colors duration-300 ${T.label}`}>
                    {label}
                  </label>
                  <div className={field.name === "password" ? "relative" : ""}>
                    <input
                      type={type}
                      required
                      disabled={isLoading}
                      value={values[field.name] ?? ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      placeholder={placeholder}
                      className={`w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed ${T.input} ${field.name === "password" ? "pr-16" : ""
                        }`}
                    />
                    {field.name === "password" && (
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        disabled={isLoading}
                        className={`absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium transition-colors disabled:opacity-50 ${T.eyeBtn}`}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            <Button
              {...buttonProps}
              type="submit"
              disabled={isLoading}
              style={{ width: "100%", marginTop: 8, ...buttonProps?.style }}
            >
              {isLoading ? "Signing in…" : submitLabel}
            </Button>
          </form>

          {footer && <div className="mt-5">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
