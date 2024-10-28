import {
  generateIndexFile,
  generateComponentFile,
  generateModelFile,
  generateSpecFile,
  generateReadmeFile,
  generateDemoFile,
} from "./component-creation-templates"

describe("component-creation template methods", () => {
  const componentName = "TestComponent"

  describe("generateIndexFile", () => {
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

  describe("generateDemoFile", () => {
    it("should return string content for demo file", () => {
      expect(generateDemoFile(componentName)).toMatchSnapshot()
    })
  })
})
