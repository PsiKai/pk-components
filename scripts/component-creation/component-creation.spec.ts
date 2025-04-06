import { execSync } from "child_process"
import fs from "fs"
import path, { dirname } from "path"
import { vi } from "vitest"
import { fileURLToPath } from "url"

import * as componentTemplates from "./component-creation-templates"
import * as componentUtils from "./component-creation.utils"

import * as mainIndex from "./component-creation"
import { main } from "./component-creation"
import { findFile } from "../../utils/file-utils"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe("component-creation", () => {
  const writeFileMock = vi.spyOn(fs.promises, "writeFile").mockResolvedValue()
  const mkdirMock = vi.spyOn(fs.promises, "mkdir").mockResolvedValue(undefined)

  const logSpy = vi.spyOn(console, "log").mockImplementation(vi.fn())

  vi.spyOn(componentTemplates, "generateIndexFile").mockImplementation(name => `index ${name}`)
  vi.spyOn(componentTemplates, "generateComponentFile").mockImplementation(
    name => `component ${name}`,
  )
  vi.spyOn(componentTemplates, "generateModelFile").mockImplementation(name => `model ${name}`)
  vi.spyOn(componentTemplates, "generateSpecFile").mockImplementation(name => `spec ${name}`)
  vi.spyOn(componentTemplates, "generateReadmeFile").mockImplementation(name => `readme ${name}`)
  vi.spyOn(componentTemplates, "generateDemoFile").mockImplementation(name => `demo ${name}`)

  vi.spyOn(componentUtils, "parseInsertDemoIndex").mockImplementation(
    (_fileData, name) => `component-index ${name}`,
  )
  vi.spyOn(componentUtils, "parseInsertLibIndex").mockImplementation(
    (_fileData, name) => `export ${name}`,
  )

  const componentName = "TestComponent"
  const actualComponent = "Button"
  const actualComponentPath = findFile(`${actualComponent}.tsx`, "src")
  if (!actualComponentPath) {
    throw new Error(`File not found: ${actualComponent}.tsx`)
  }

  const testfilePath = path.dirname(actualComponentPath).replace(actualComponent, componentName)
  const fullPath = path.join(__dirname, "../../", testfilePath)
  const demoPath = path.join(__dirname, "../../src/dev")

  describe("with file system", () => {
    beforeEach(async () => {
      await main(componentName)
    })

    afterEach(() => {
      expect(logSpy).toHaveBeenCalledWith("CREATING COMPONENT:", componentName)
      expect(logSpy).toHaveBeenCalledWith("DESTINATION PATH:", fullPath)
      expect(logSpy).toHaveBeenCalledWith("COMPONENT CREATED SUCCESSFULLY")
    })

    it("should create the directory in the components folder", () => {
      expect(mkdirMock).toHaveBeenCalledWith(fullPath, { recursive: true })
    })

    it("should create the index.ts file", () => {
      expect(writeFileMock).toHaveBeenCalledWith(`${fullPath}/index.ts`, `index ${componentName}`)
    })

    it("should create the component file", () => {
      expect(writeFileMock).toHaveBeenCalledWith(
        `${fullPath}/${componentName}.tsx`,
        `component ${componentName}`,
      )
    })

    it("should create the model file", () => {
      expect(writeFileMock).toHaveBeenCalledWith(
        `${fullPath}/${componentName}.model.ts`,
        `model ${componentName}`,
      )
    })

    it("should create the css file", () => {
      expect(writeFileMock).toHaveBeenCalledWith(`${fullPath}/${componentName}.css`, "")
    })

    it("should create the component spec file", () => {
      expect(writeFileMock).toHaveBeenCalledWith(
        `${fullPath}/${componentName}.spec.tsx`,
        `spec ${componentName}`,
      )
    })

    it("should create the readme file", () => {
      expect(writeFileMock).toHaveBeenCalledWith(`${fullPath}/README.md`, `readme ${componentName}`)
    })

    it("should create the demo file", () => {
      expect(writeFileMock).toHaveBeenCalledWith(
        `${demoPath}/demos/${componentName}Section.tsx`,
        `demo ${componentName}`,
      )
    })

    it("should insert the component name into the demo index file", () => {
      expect(writeFileMock).toHaveBeenCalledWith(
        `${demoPath}/component-index.tsx`,
        `component-index ${componentName}`,
      )
    })

    it("should insert the component name into the lib index file", () => {
      const indexPath = path.join(__dirname, "../../src/lib/index.ts")
      expect(writeFileMock).toHaveBeenCalledWith(indexPath, `export ${componentName}`)
    })
  })

  describe("with existing component of same name", () => {
    it("should throw an error", () => {
      vi.spyOn(fs, "existsSync").mockReturnValue(true)
      expect(async () => await main(componentName)).rejects.toThrow(
        `COMPONENT ALREADY EXISTS: ${componentName}`,
      )
    })
  })

  describe("with no component name", () => {
    it("should throw an error", () => {
      expect(() => execSync("npm run component")).toThrow("ERROR: Please provide a component name")
    })
  })

  describe("from index.ts", () => {
    const originalArgv = process.argv

    afterEach(() => {
      process.argv = originalArgv
    })

    it("should call main with the component name from process.argv", async () => {
      process.argv = ["", "", componentName]
      const mainSpy = vi.spyOn(mainIndex, "main").mockImplementation(async () => {})
      await import("./index.ts")
      expect(mainSpy).toHaveBeenCalledWith(componentName)
    })

    it("should throw an error if no component name is provided", async () => {
      process.argv = ["", ""]
      try {
        await import("./index.ts")
      } catch (error) {
        expect(error).toEqual(new Error("ERROR: Please provide a component name"))
      }
    })
  })
})
