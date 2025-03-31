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
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    outDir: "dist/lib",
    minify: "terser",
  },
  plugins: [react(), cssInjectedByJsPlugin()],
});
