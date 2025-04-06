import {
  parseInsertDemoExport,
  parseInsertDemoIndex,
  parseInsertLibIndex,
} from "./component-creation.utils"

const testComponentName = "JTestComponent"

const fakeDemoExportData = `export { ButtonSection } from "./ButtonSection"
export { FileInputSection } from "./FileInputSection"
export { HamburgerButtonSection } from "./HamburgerButtonSection"
export { InputSection } from "./InputSection"
export { LoadingSpinnerSection } from "./LoadingSpinnerSection"
export { SidenavSection } from "./SidenavSection"`

const fakeDemoWithExport = `export { ButtonSection } from "./ButtonSection"
export { FileInputSection } from "./FileInputSection"
export { HamburgerButtonSection } from "./HamburgerButtonSection"
export { InputSection } from "./InputSection"
export { ${testComponentName}Section } from "./${testComponentName}Section"
export { LoadingSpinnerSection } from "./LoadingSpinnerSection"
export { SidenavSection } from "./SidenavSection"`

const fakeDemoIndexData = `import {
  ButtonSection,
  FileInputSection,
  HamburgerButtonSection,
  InputSection,
  LoadingSpinnerSection,
  SidenavSection,
} from "./demos"

export const components = {
  Button: ButtonSection,
  FileInput: FileInputSection,
  Hamburger: HamburgerButtonSection,
  Input: InputSection,
  LoadingSpinner: LoadingSpinnerSection,
  Sidenav: SidenavSection,
}
`

const fakeDemoWithComponent = `import {
  ButtonSection,
  FileInputSection,
  HamburgerButtonSection,
  InputSection,
  ${testComponentName}Section,
  LoadingSpinnerSection,
  SidenavSection,
} from "./demos"

export const components = {
  Button: ButtonSection,
  FileInput: FileInputSection,
  Hamburger: HamburgerButtonSection,
  Input: InputSection,
  ${testComponentName}: ${testComponentName}Section,
  LoadingSpinner: LoadingSpinnerSection,
  Sidenav: SidenavSection,
}
`

const fakeLibIndexData = `export { Button } from "./components/Button"
export { LoadingSpinner } from "./components/LoadingSpinner"
export { Input } from "./components/Input"
export { FileInput } from "./components/FileInput"
export { Dropzone } from "./components/Dropzone"
export { Hamburger } from "./components/Hamburger"
export { Sidenav } from "./components/Sidenav"
`

const fakeLibWithComponent = `export { Button } from "./components/Button"
export { Dropzone } from "./components/Dropzone"
export { FileInput } from "./components/FileInput"
export { Hamburger } from "./components/Hamburger"
export { Input } from "./components/Input"
export { ${testComponentName} } from "./components/${testComponentName}"
export { LoadingSpinner } from "./components/LoadingSpinner"
export { Sidenav } from "./components/Sidenav"
`

describe("component-creation.utils", () => {
  describe("parseInsertDemoExport", () => {
    it("should insert the component name into the demo export file", () => {
      const result = parseInsertDemoExport(fakeDemoExportData, testComponentName)
      expect(result).toBe(fakeDemoWithExport)
    })
  })

  describe("parseInsertDemoIndex", () => {
    it("should insert the component name into the demo index file", () => {
      const result = parseInsertDemoIndex(fakeDemoIndexData, testComponentName)
      expect(result).toBe(fakeDemoWithComponent)
    })
  })

  describe("parseInsertLibIndex", () => {
    it("should insert the component name into the lib index file", () => {
      const result = parseInsertLibIndex(fakeLibIndexData, testComponentName)
      expect(result).toBe(fakeLibWithComponent)
    })
  })
})
