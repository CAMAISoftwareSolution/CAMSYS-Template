"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Button: () => Button,
  Login1: () => Login1
});
module.exports = __toCommonJS(src_exports);

// src/ui/Button.tsx
var import_jsx_runtime = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { ...props, style: { ...base, ...variants[variant], ...style } });
}

// src/auth/Login1.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function Login1() {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { minHeight: "100vh", display: "grid", placeItems: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { width: 360, padding: 24, border: "1px solid #eee", borderRadius: 12 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h1", { style: { fontSize: 22, fontWeight: 700, marginBottom: 16 }, children: "Login" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { placeholder: "Email", style: { width: "100%", padding: 10, marginBottom: 12 } }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "input",
      {
        placeholder: "Password",
        type: "password",
        style: { width: "100%", padding: 10, marginBottom: 12 }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Button, { style: { width: "100%" }, children: "Sign in" })
  ] }) });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  Login1
});
//# sourceMappingURL=index.cjs.map