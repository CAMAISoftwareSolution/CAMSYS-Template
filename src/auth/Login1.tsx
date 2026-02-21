"use client";

import React, { useState } from "react";
import { Button } from "../ui";

export type Login1Props = {
  onLogin?: (email: string, password: string) => void;
  isLoading?: boolean;
  error?: string | null;
  success?: string | null;
};

export default function Login1({ onLogin, isLoading, error, success }: Login1Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin?.(email, password);
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div style={{ width: 360, padding: 24, border: "1px solid #eee", borderRadius: 12 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Sign in</h1>
        <p style={{ color: "#888", marginBottom: 20, fontSize: 14 }}>Enter your credentials to continue</p>

        {error && <p style={{ color: "red", marginBottom: 12, fontSize: 14 }}>{error}</p>}
        {success && <p style={{ color: "green", marginBottom: 12, fontSize: 14 }}>{success}</p>}

        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            disabled={isLoading}
            style={{ width: "100%", padding: 10, marginBottom: 12, boxSizing: "border-box" }}
          />

          <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Password</label>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              disabled={isLoading}
              style={{ width: "100%", padding: 10, paddingRight: 40, boxSizing: "border-box" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                color: "#888",
                padding: 0,
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <Button type="submit" disabled={isLoading} style={{ width: "100%" }}>
            {isLoading ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}