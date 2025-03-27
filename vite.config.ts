import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/main.ts",
      name: "ReactSwapMotionUi",
    },
  },
  plugins: [react(), cssInjectedByJsPlugin()],
});
