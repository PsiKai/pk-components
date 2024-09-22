import { execSync } from "child_process"
import fs from "fs"
import path from "path"
import {
  generateIndexFile,
  generateComponentFile,
  generateModelFile,
  generateSpecFile,
  generateReadmeFile,
} from "./component-creation-templates"

describe("component-creation", () => {
  const componentName = "TestComponent"
  const filePath = path.join(__dirname, `../../src/components/${componentName}`)

  beforeEach(() => {
    execSync(`npm run component ${componentName}`)
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

  describe("with existing component of same name", () => {
    it("should throw an error", async () => {
      expect(() => execSync(`npm run component ${componentName}`)).toThrow(
        `ERROR\nCOMPONENT ALREADY EXISTS: ${componentName}`,
      )
    })
  })

  describe("with no component name", () => {
    it("should throw an error", async () => {
      expect(() => execSync("npm run component")).toThrow("ERROR: Please provide a component name")
    })
  })
})

describe("component-creation template methods", () => {
  const componentName = "TestComponent"

  describe("generateComponentFile", () => {
    it("should return string content for index file", () => {
      expect(generateIndexFile(componentName)).toMatchSnapshot()
    })
  })

  describe("generateComponentFile", () => {
    it("should return string content for component file", () => {
      expect(generateComponentFile(componentName)).toMatchSnapshot()
    })
  })

  describe("generateModelFile", () => {
    it("should return string content for model file", () => {
      expect(generateModelFile(componentName)).toMatchSnapshot()
    })
  })

  describe("generateSpecFile", () => {
    it("should return string content for spec file", () => {
      expect(generateSpecFile(componentName)).toMatchSnapshot()
    })
  })

  describe("generateReadmeFile", () => {
    it("should return string content for readme file", () => {
      expect(generateReadmeFile(componentName)).toMatchSnapshot()
    })
  })
})
