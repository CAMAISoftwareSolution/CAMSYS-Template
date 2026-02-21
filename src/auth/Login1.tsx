import React from "react";
import { Button } from "../ui";

export default function Login1() {
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div style={{ width: 360, padding: 24, border: "1px solid #eee", borderRadius: 12 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Login</h1>

        <input placeholder="Email" style={{ width: "100%", padding: 10, marginBottom: 12 }} />
        <input
          placeholder="Password"
          type="password"
          style={{ width: "100%", padding: 10, marginBottom: 12 }}
        />

        <Button style={{ width: "100%" }}>Sign in</Button>
      </div>
    </div>
  );
}