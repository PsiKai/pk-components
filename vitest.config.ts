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
          include: ["src/**/*", "utils/**/*", "scripts/**/*"],
          exclude: ["src/dev/**/*", "**/*.spec.*", "**/*.test.*", "**/*.mock.*", "src/**/SVG/**/*"],
          thresholds: {
            "**/**": {
              branches: 100,
              functions: 100,
              lines: 100,
              statements: 100,
            },
          },
        },
        exclude: [...configDefaults.exclude, "e2e"],
      },
    }),
  )
})
