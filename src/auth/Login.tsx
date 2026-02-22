"use client";

import React, { useState } from "react";
import { Button } from "../ui";

export type Field =
  | { name: "email"; label?: string; type?: "email"; placeholder?: string }
  | { name: "username"; label?: string; type?: "text"; placeholder?: string }
  | { name: "phone"; label?: string; type?: "tel"; placeholder?: string }
  | { name: "password"; label?: string; type?: "password"; placeholder?: string };

export type Login1Props = {
  fields: Field[];
  onLogin?: (values: Record<string, string>) => void;
  isLoading?: boolean;
  error?: string | null;
  success?: string | null;
};

export default function Login1({
  fields,
  onLogin,
  isLoading,
  error,
  success,
}: Login1Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin?.(values);
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <div className="w-full max-w-sm mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-black mb-4">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to your account to continue</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {error && (
            <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg px-4 py-3 mb-5">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          {success && (
            <div className="flex items-start gap-2 text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-4 py-3 mb-5">
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
                  ? "e.g. chesthareah"
                  : field.name === "phone"
                  ? "e.g. 012345678"
                  : "••••••••");

              const type =
                field.name === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : field.type ?? (field.name === "email" ? "email" : "text");

              return (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
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
                      className={`w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                        field.name === "password" ? "pr-16" : ""
                      }`}
                    />

                    {field.name === "password" && (
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        disabled={isLoading}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors disabled:opacity-50"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            <Button
              type="submit"
              disabled={isLoading}
              style={{ width: "100%", marginTop: 8 }}
            >
              {isLoading ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}