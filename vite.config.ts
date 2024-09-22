import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import dts from "vite-plugin-dts"
import cssInjectedByJS from "vite-plugin-css-injected-by-js"

export default defineConfig({
  plugins: [
    react(),
    dts({
      outDir: "dist/types",
      insertTypesEntry: true,
    }),
    cssInjectedByJS(),
  ],
  css: {
    devSourcemap: true,
  },
  build: {
    lib: {
      entry: "src/index.tsx",
      name: "pk-components",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      input: "src/index.tsx",
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
})
