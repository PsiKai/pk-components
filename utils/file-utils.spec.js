import path from "path"
import fs from "fs"
import { findFile } from "./file-utils"

describe("findFile", () => {
  const mockComponent = "Button"
  const mockPathParts = ["foo", "bar", "lib", "components", mockComponent]
  const mockPath = path.join(...mockPathParts)
  const mockFile = `${mockComponent}.tsx`
  const fullMockPath = path.join(mockPath, mockFile)
  const subDir = path.join(mockPath, "subdir")
  const fileInSubDir = path.join(subDir, "SubButton.tsx")

  beforeAll(() => {
    fs.mkdirSync(mockPath, { recursive: true })
    fs.writeFileSync(fullMockPath, "")
    fs.writeFileSync(path.join(...mockPathParts.slice(0, 2), "Random.tsx"), "")
    fs.mkdirSync(subDir, { recursive: true })
    fs.writeFileSync(fileInSubDir, "")
  })

  afterAll(async () => {
    if (fs.existsSync(mockPathParts[0])) {
      await fs.promises.rm(mockPathParts[0], { recursive: true })
    }
  })

  it("should find the file", () => {
    expect(findFile("Button.tsx", mockPathParts[0])).toBe(fullMockPath)
  })

  it("should return null if the file is not found", () => {
    expect(findFile("NotFound.tsx", mockPathParts[0])).toBe(null)
  })

  it("should return null if the directory is not found", () => {
    expect(findFile("Button.tsx", "not-found")).toBe(null)
  })
})
