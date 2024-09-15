import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import dts from "vite-plugin-dts"
import postcss from "rollup-plugin-postcss"

export default defineConfig({
  plugins: [
    react(),
    dts({
      outDir: "dist/types",
      insertTypesEntry: true,
    }),
    postcss({
      inject: true,
      extract: true,
      minimize: true,
    }),
  ],
  build: {
    lib: {
      entry: "src/index.tsx",
      name: "pk-components",
      // fileName: format => `pk-components.${format}.js`,
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
