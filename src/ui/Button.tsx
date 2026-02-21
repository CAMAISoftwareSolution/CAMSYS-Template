import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export default function Button({
  variant = "primary",
  style,
  ...props
}: ButtonProps) {
  const base: React.CSSProperties = {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #ddd",
    cursor: "pointer",
    fontWeight: 600,
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: { background: "#111", color: "#fff", borderColor: "#111" },
    ghost: { background: "transparent", color: "#111" },
  };

  return <button {...props} style={{ ...base, ...variants[variant], ...style }} />;
}