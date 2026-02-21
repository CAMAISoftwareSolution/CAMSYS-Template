import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    ui: "src/ui/index.ts",
    auth: "src/auth/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
});