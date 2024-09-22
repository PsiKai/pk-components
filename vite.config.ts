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
  },
}

const demoBuildConfig = {
  // root: "src/dev",
  build: {
    outDir: "build",
    rollupOptions: {
      input: "index.html",
    },
  },
  plugins: [react()],
}

export default defineConfig(({ mode }) => {
  if (mode === "lib") {
    return libBuildConfig
  } else if (mode === "demo") {
    return demoBuildConfig
  } else {
    return {
      plugins: [react()],
    }
  }
})
