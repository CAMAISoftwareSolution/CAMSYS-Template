// src/ui/Button.tsx
import { jsx } from "react/jsx-runtime";
function Button({
  variant = "primary",
  style,
  ...props
}) {
  const base = {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #ddd",
    cursor: "pointer",
    fontWeight: 600
  };
  const variants = {
    primary: { background: "#111", color: "#fff", borderColor: "#111" },
    ghost: { background: "transparent", color: "#111" }
  };
  return /* @__PURE__ */ jsx("button", { ...props, style: { ...base, ...variants[variant], ...style } });
}

export {
  Button
};
//# sourceMappingURL=chunk-TCO2LCXV.js.map