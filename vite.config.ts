import { defineConfig, UserConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import dts from "vite-plugin-dts"
import cssInjectedByJS from "vite-plugin-css-injected-by-js"

const libBuildConfig: UserConfig = {
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
      entry: ["src/lib/index.tsx", "src/lib/index.ts"],
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

const demoBuildConfig: UserConfig = {
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
  base: "/pk-components/",
}

const defaultConfig: UserConfig = {
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
