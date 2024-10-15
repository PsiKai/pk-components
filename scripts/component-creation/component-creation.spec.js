import { execSync } from "child_process"
import fs from "fs"
import path, { dirname } from "path"
import { vi } from "vitest"
import { fileURLToPath } from "url"
import * as componentTemplates from "./component-creation-templates"
import { main } from "./component-creation"
import { findFile } from "../../utils/file-utils"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe("component-creation", () => {
  const writeFileMock = vi.spyOn(fs.promises, "writeFile").mockResolvedValue()
  const mkdirMock = vi.spyOn(fs.promises, "mkdir").mockResolvedValue()
  const logSpy = vi.spyOn(console, "log").mockImplementation(vi.fn())

  vi.spyOn(componentTemplates, "generateIndexFile").mockImplementation(name => `index ${name}`)
  vi.spyOn(componentTemplates, "generateComponentFile").mockImplementation(
    name => `component ${name}`,
  )
  vi.spyOn(componentTemplates, "generateModelFile").mockImplementation(name => `model ${name}`)
  vi.spyOn(componentTemplates, "generateSpecFile").mockImplementation(name => `spec ${name}`)
  vi.spyOn(componentTemplates, "generateReadmeFile").mockImplementation(name => `readme ${name}`)
  vi.spyOn(componentTemplates, "generateDemoFile").mockImplementation(name => `demo ${name}`)

  const componentName = "TestComponent"
  const actualComponent = "Button"
  const expectedHomeDirectory = "src"

  let filePath = findFile(`${actualComponent}.tsx`, expectedHomeDirectory)
  if (!filePath) {
    throw new Error(`File not found: ${actualComponent}.tsx`)
  }

  filePath = path.dirname(filePath).replace(actualComponent, componentName)
  const fullPath = path.join(__dirname, "../../", filePath)

  const demoPath = path.join(__dirname, "../../src/dev/demos")

  describe("with file system", async () => {
    beforeEach(() => {
      main(componentName)
    })

    afterEach(() => {
      expect(logSpy).toHaveBeenCalledWith("CREATING COMPONENT:", componentName)
      expect(logSpy).toHaveBeenCalledWith("DESTINATION PATH:", fullPath)
      expect(logSpy).toHaveBeenCalledWith("COMPONENT CREATED SUCCESSFULLY")
    })

    it("should create the directory in the components folder", async () => {
      expect(mkdirMock).toHaveBeenCalledWith(fullPath, { recursive: true })
    })

    it("should create the index.ts file", async () => {
      expect(writeFileMock).toHaveBeenCalledWith(`${fullPath}/index.ts`, `index ${componentName}`)
    })

    it("should create the component file", async () => {
      expect(writeFileMock).toHaveBeenCalledWith(
        `${fullPath}/${componentName}.tsx`,
        `component ${componentName}`,
      )
    })

    it("should create the model file", async () => {
      expect(writeFileMock).toHaveBeenCalledWith(
        `${fullPath}/${componentName}.model.ts`,
        `model ${componentName}`,
      )
    })

    it("should create the css file", async () => {
      expect(writeFileMock).toHaveBeenCalledWith(`${fullPath}/${componentName}.css`, "")
    })

    it("should create the component spec file", async () => {
      expect(writeFileMock).toHaveBeenCalledWith(
        `${fullPath}/${componentName}.spec.tsx`,
        `spec ${componentName}`,
      )
    })

    it("should create the readme file", async () => {
      expect(writeFileMock).toHaveBeenCalledWith(`${fullPath}/README.md`, `readme ${componentName}`)
    })

    it("should create the demo file", async () => {
      expect(writeFileMock).toHaveBeenCalledWith(
        `${demoPath}/${componentName}Section.tsx`,
        `demo ${componentName}`,
      )
    })
  })

  describe("with existing component of same name", () => {
    const existsSyncMock = vi.spyOn(fs, "existsSync").mockReturnValue(true)
    const processMock = vi.spyOn(process, "exit").mockImplementation(vi.fn())
    const consoleMock = vi.spyOn(console, "error").mockImplementation(vi.fn())

    beforeEach(() => {
      main(componentName)
    })

    it("should throw an error", async () => {
      expect(existsSyncMock).toHaveBeenCalledWith(fullPath)
      expect(processMock).toHaveBeenCalledWith(1)
      expect(consoleMock).toHaveBeenCalledWith("ERROR\nCOMPONENT ALREADY EXISTS:", componentName)
    })
  })

  describe("with no component name", () => {
    it("should throw an error", async () => {
      expect(() => execSync("npm run component")).toThrow("ERROR: Please provide a component name")
    })
  })
})
