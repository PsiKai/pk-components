import path, { dirname } from "path"
import fs from "fs"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function main(componentName) {
  const santizedComponentName = componentName
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(/[-_\s]/g)
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join("")

  const destinationPath = path.join(__dirname, "../src", "components", santizedComponentName)

  if (fs.existsSync(destinationPath)) {
    console.error("ERROR\nCOMPONENT ALREADY EXISTS:", santizedComponentName)
    process.exit(1)
  }

  console.log("CREATING COMPONENT:", santizedComponentName)
  console.log("DESTINATION PATH:", destinationPath)

  // Create the directory
  await fs.promises.mkdir(destinationPath, { recursive: true })

  // Create the index.ts file
  await fs.promises.writeFile(
    getFullFilePath(destinationPath, "index.ts"),
    generateIndexFile(santizedComponentName),
  )

  // Create the component file
  await fs.promises.writeFile(
    getFullFilePath(destinationPath, `${santizedComponentName}.tsx`),
    generateComponentFile(santizedComponentName),
  )

  // Create the model file
  await fs.promises.writeFile(
    getFullFilePath(destinationPath, `${santizedComponentName}.model.ts`),
    generateModelFile(santizedComponentName),
  )

  // Create the css file
  await fs.promises.writeFile(getFullFilePath(destinationPath, `${santizedComponentName}.css`), "")

  // Create the component spec file
  await fs.promises.writeFile(
    getFullFilePath(destinationPath, `${santizedComponentName}.spec.tsx`),
    generateSpecFile(santizedComponentName),
  )

  console.log("COMPONENT CREATED SUCCESSFULLY")
}

function getFullFilePath(fullPath, fileName) {
  return path.join(fullPath, fileName)
}

/**
 * FILE TEMPLATE STRING GENERATORS
 */

function generateIndexFile(componentName) {
  return `export { ${componentName} } from "./${componentName}"
`
}

function generateComponentFile(componentName) {
  return `import { T${componentName}Props } from "./${componentName}.model"
import "./${componentName}.css"

export function ${componentName}(props: T${componentName}Props) {
  return <div>${componentName}</div>
}
`
}

function generateModelFile(componentName) {
  return `export type T${componentName}Props = {
  className?: string
  children?: React.ReactNode
}
`
}

function generateSpecFile(componentName) {
  return `import React from "react"
  import { render, screen } from "@testing-library/react"
  import "@testing-library/jest-dom"

  import { ${componentName} } from "./${componentName}"

  describe("${componentName}", () => {
    render(<${componentName} />)
    const component = screen.getByText("${componentName}")

    it("should render the component", () => {
      expect(component).toBeInTheDocument()
    })
  })
`
}

/**
 * END OF FILE TEMPLATE STRING GENERATORS
 */

const componentName = process.argv[2]
if (!componentName) {
  console.error("ERROR: Please provide a component name")
  process.exit(1)
}

main(componentName).catch(console.error)
