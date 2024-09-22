import { defineConfig, mergeConfig } from "vitest/config"
import viteConfig from "./vite.config"

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./tests/setup.ts",
      coverage: {
        provider: "istanbul",
        include: ["src/**/*", "utils/**/*"],
        exclude: ["src/dev/**/*"],
      },
    },
  }),
)
