import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import dts from "vite-plugin-dts"
import cssInjectedByJS from "vite-plugin-css-injected-by-js"

const libBuildConfig = {
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
      entry: "src/lib/index.tsx",
      name: "pk-components",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      input: "src/lib/index.tsx",
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    sourcemap: true,
  },
}

const demoBuildConfig = {
  build: {
    outDir: "build",
    rollupOptions: {
      input: "index.html",
    },
    sourcemap: true,
  },
  plugins: [react()],
  css: {
    devSourcemap: true,
  },
}

const defaultConfig = {
  plugins: [react()],
  css: {
    devSourcemap: true,
  },
}

export default defineConfig(({ mode }) => {
  switch (mode) {
    case "lib":
      return libBuildConfig
    case "demo":
      return demoBuildConfig
    default:
      return defaultConfig
  }
})
