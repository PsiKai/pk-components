import { execSync } from "child_process"
import fs from "fs"
import path from "path"

describe("component-creation", () => {
  const componentName = "TestComponent"
  const filePath = path.join(__dirname, `../src/components/${componentName}`)

  beforeEach(() => {
    execSync(`node scripts/component-creation.js ${componentName}`)
  })

  afterEach(() => {
    if (fs.existsSync(filePath)) {
      fs.rmdirSync(filePath, { recursive: true })
    }
  })

  it("should create the directory and files", async () => {
    expect(fs.existsSync(filePath)).toBe(true)
    expect(fs.existsSync(`${filePath}/index.ts`)).toBe(true)
    expect(fs.existsSync(`${filePath}/${componentName}.tsx`)).toBe(true)
    expect(fs.existsSync(`${filePath}/${componentName}.model.ts`)).toBe(true)
    expect(fs.existsSync(`${filePath}/${componentName}.css`)).toBe(true)
    expect(fs.existsSync(`${filePath}/${componentName}.spec.tsx`)).toBe(true)
    expect(fs.existsSync(`${filePath}/README.md`)).toBe(true)
  })
})
