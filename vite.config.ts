import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import dts from "vite-plugin-dts"

export default defineConfig({
  plugins: [
    react(),
    dts({
      outDir: "dist/types",
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: "src/index.tsx",
      name: "psikai-component-lib",
      // fileName: format => `psikai-component-lib.${format}.js`,
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
