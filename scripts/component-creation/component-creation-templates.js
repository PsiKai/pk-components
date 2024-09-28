export function generateIndexFile(componentName) {
  return `export { ${componentName} } from "./${componentName}"
export type { T${componentName}Props } from "./${componentName}.model"
`
}

export function generateComponentFile(componentName) {
  return `import { T${componentName}Props } from "./${componentName}.model"
import "./${componentName}.css"

export function ${componentName}(props: T${componentName}Props) {
  return <div>${componentName}</div>
}
`
}

export function generateModelFile(componentName) {
  return `import { AllHtmlAttributes } from "../../core-types"

export type T${componentName}Props = AllHtmlAttributes & {
  className?: string
  children?: React.ReactNode
}
`
}

export function generateSpecFile(componentName) {
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

export function generateReadmeFile(componentName) {
  return `### ${componentName} Component

#### Description

A brief description of the component. Basic functionality and behavior.

#### Props

| Prop Name            | Type                                                                | Required | Default       | Description                                     |
| -------------------- | ------------------------------------------------------------------- | -------- | ------------- | ----------------------------------------------- |
| \`[htmlAttributes]\` | \`React.AllHTMLAttributes<HTMLElement>\`                            | No       | \`undefined\` | Any valid HTML attribute for the element type   |
| \`aria-\*\`          | \`[key: aria-$\{string\}]: string \\| number \\| boolean \\| null\` | No       | \`undefined\` | Optional Accessibility attributes               |
| \`data-\*\`          | \`[key: data-$\{string\}]: string \\| number \\| boolean \\| null\` | No       | \`undefined\` | Optional dataset attributes                     |
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
