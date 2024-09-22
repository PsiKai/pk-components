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
    path.join(destinationPath, "index.ts"),
    generateIndexFile(santizedComponentName),
  )

  // Create the component file
  await fs.promises.writeFile(
    path.join(destinationPath, `${santizedComponentName}.tsx`),
    generateComponentFile(santizedComponentName),
  )

  // Create the model file
  await fs.promises.writeFile(
    path.join(destinationPath, `${santizedComponentName}.model.ts`),
    generateModelFile(santizedComponentName),
  )

  // Create the css file
  await fs.promises.writeFile(path.join(destinationPath, `${santizedComponentName}.css`), "")

  // Create the component spec file
  await fs.promises.writeFile(
    path.join(destinationPath, `${santizedComponentName}.spec.tsx`),
    generateSpecFile(santizedComponentName),
  )

  // Create the readme file
  await fs.promises.writeFile(
    path.join(destinationPath, "README.md"),
    generateReadmeFile(santizedComponentName),
  )

  console.log("COMPONENT CREATED SUCCESSFULLY")
}

/**
 * FILE TEMPLATE STRING GENERATORS
 */

function generateIndexFile(componentName) {
  return `export { ${componentName} } from "./${componentName}"
export type { T${componentName}Props } from "./${componentName}.model"
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
  return `import { AllHtmlAttributes } from "../../core-types"

export type T${componentName}Props = AllHtmlAttributes & {
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
    beforeEach(() => {
      render(<${componentName} />)
    })

    it("should render the component", () => {
      const component = screen.getByText("${componentName}")
      expect(component).toBeInTheDocument()
    })
  })
`
}

function generateReadmeFile(componentName) {
  return `### ${componentName} Component

#### Description

A brief description of the component. Basic functionality and behavior.

#### Props

| Prop Name            | Type                                                                        | Required | Default       | Description                                     |
| -------------------- | --------------------------------------------------------------------------- | -------- | ------------- | ----------------------------------------------- |
| \`[htmlAttributes]\` | \`React.AllHTMLAttributes<HTMLElement>\`                                    | No       | \`undefined\` | Any valid HTML attribute for the element type   |
| \`aria-\*\`          | \`[key: \\\`aria-$\{string\}\\\`]: string \\| number \\| boolean \\| null\` | No       | \`undefined\` | Optional Accessibility attributes               |
| \`data-\*\`          | \`[key: \\\`data-$\{string\}\\\`]: string \\| number \\| boolean \\| null\` | No       | \`undefined\` | Optional dataset attributes                     |
| \`className\`        | \`string\`                                                                  | No       | \`undefined\` | Additional class names to apply to the spinner. |

#### Example

\`\`\`tsx
import { ${componentName} } from "pk-components"

function YourComponent() {
  return <${componentName}>Your content here</${componentName}>
}
\`\`\`
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
