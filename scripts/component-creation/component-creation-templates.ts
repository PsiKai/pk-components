export function generateIndexFile(componentName: string) {
  return `export { ${componentName} } from "./${componentName}"
export type { T${componentName}Props } from "./${componentName}.model"
`
}

export function generateComponentFile(componentName: string) {
  return `import { T${componentName}Props } from "./${componentName}.model"
import "./${componentName}.css"

export function ${componentName}(props: T${componentName}Props) {
  return <div>${componentName}</div>
}
`
}

export function generateModelFile(componentName: string) {
  return `import { AllHtmlAttributes } from "../../core-types"

export type T${componentName}Props = AllHtmlAttributes & {
  className?: string
  children?: React.ReactNode
}
`
}

export function generateSpecFile(componentName: string) {
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

export function generateReadmeFile(componentName: string) {
  return `### ${componentName} Component

#### Description

A brief description of the component. Basic functionality and behavior.

#### Props

| Prop Name            | Type                                                                | Required | Default       | Description                                     |
| -------------------- | ------------------------------------------------------------------- | -------- | ------------- | ----------------------------------------------- |
| \`[htmlAttributes]\` | \`React.AllHTMLAttributes<HTMLElement>\`                            | No       | \`undefined\` | Any valid HTML attribute for the element type   |
| \`aria-*\`           | \`[key: aria-$\{string}]: string \\| number \\| boolean \\| null\`  | No       | \`undefined\` | Optional Accessibility attributes               |
| \`data-*\`           | \`[key: data-$\{string}]: string \\| number \\| boolean \\| null\`  | No       | \`undefined\` | Optional dataset attributes                     |
| \`className\`        | \`string\`                                                          | No       | \`undefined\` | Additional class names to apply to the spinner. |

#### Example

\`\`\`tsx
import { ${componentName} } from "pk-components"

function YourComponent() {
  return <${componentName}>Your content here</${componentName}>
}
\`\`\`

[Live Demo](https://psikai.github.io/pk-components#${componentName})
`
}

export function generateDemoFile(componentName: string) {
  return `import React from "react"
import { ${componentName} } from "../../lib/components/${componentName}"
import { composePropsTableData } from "../utils/PropsTable.utils"
import { PropsTable } from "../utils/PropsTable"

const ${componentName}Props = composePropsTableData([])

export const ${componentName}Section = () => {
  return (
    <div className="section-wrapper">
      <h2 id="${componentName}" className="section-header">
        <code>${componentName}</code>
      </h2>
      <section>
        <div className="sub-section">
          <h3 className="sub-section-header">Props</h3>
          <PropsTable rows={${componentName}Props} />
        </div>
        <div className="sub-section">
          <h3>Example</h3>
          <${componentName} />
        </div>
      </section>
    </div>
  )
}
`
}
