export function parseInsertDemoIndex(fileData, componentName) {
  const lines = fileData.split("\n")

  // Insert the import statement
  const startIndex = lines.findIndex(line => line.includes("import {"))
  const endIndex = lines.findIndex(line => line.includes("} from"))
  const componentSections = lines.slice(startIndex, endIndex)
  componentSections.push(`  ${componentName},`)
  const sortedComponentSections = componentSections.toSorted()

  lines.splice(startIndex, componentSections.length, ...sortedComponentSections)

  // Insert component map
  const componentMapIndex = lines.findIndex(line => line.includes("export const components = {"))
  const componentMapEndIndex = lines.findIndex(line => line.includes("}"))
  const componentMapSections = lines.slice(componentMapIndex, componentMapEndIndex)
  componentMapSections.push(`  ${componentName}: ${componentName}Section,`)
  const sortedComponentMapSections = componentMapSections.toSorted()

  lines.splice(componentMapIndex, componentMapSections.length, ...sortedComponentMapSections)

  return lines.join("\n")
}

export function parseInsertLibIndex(fileData, componentName) {
  const lines = fileData.split("\n")

  lines.push(`export { ${componentName} } from "./components/${componentName}"`)
  const sortedLines = lines.toSorted((a, b) => {
    const aSliced = a.slice("export { ".length, a.indexOf(" }"))
    const bSliced = b.slice("export { ".length, b.indexOf(" }"))
    return aSliced.localeCompare(bSliced)
  })

  return sortedLines.join("\n")
}
