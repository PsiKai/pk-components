import { test, expect } from "@playwright/test"

test("Renders main header", async ({ page }) => {
  await page.goto("/")

  await expect(page.getByRole("heading", { name: "PK Component Library" })).toBeVisible()
})

test("Renders component sections", async ({ page }) => {
  await page.goto("/")

  for (const component of ["Button", "LoadingSpinner", "Input"]) {
    await expect(page.getByRole("heading", { name: component, exact: true })).toBeVisible()
  }
})
