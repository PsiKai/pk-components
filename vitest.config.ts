import { defineConfig, mergeConfig, configDefaults } from "vitest/config"
import viteConfig from "./vite.config"

export default defineConfig(configEnv => {
  return mergeConfig(
    viteConfig(configEnv),
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
        exclude: [...configDefaults.exclude, "e2e"],
      },
    }),
  )
})
