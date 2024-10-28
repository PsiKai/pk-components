export function parseInsertDemoIndex(fileData: string, componentName: string) {
  const lines = fileData.split("\n")

  // Insert the import statement
  const {
    lines: importLines,
    startIndex: importLinesStartIndex,
    endIndex: importLinesEndIndex,
  } = getLinesBetween(lines, "import {", "} from")
  const sortedChunk = insertAndSort(importLines, `  ${componentName}Section,`)
  const sortedImportLines = insertChunk(
    lines,
    sortedChunk,
    importLinesStartIndex,
    importLinesEndIndex,
  )

  // Insert component map
  const {
    lines: componentMapLines,
    startIndex: componentMapStartIndex,
    endIndex: componentMapEndIndex,
  } = getLinesBetween(sortedImportLines, "export const components = {", "}")
  const sortedComponentMapChunk = insertAndSort(
    componentMapLines,
    `  ${componentName}: ${componentName}Section,`,
  )
  const sortedComponentMapLines = insertChunk(
    sortedImportLines,
    sortedComponentMapChunk,
    componentMapStartIndex,
    componentMapEndIndex,
  )

  return sortedComponentMapLines.join("\n")
}

export function parseInsertLibIndex(fileData: string, componentName: string) {
  const lines = fileData.split("\n")

  const { lines: exportLines, startIndex, endIndex } = getLinesBetween(lines, "export", false)
  const linesWithInsert = insertAndSort(
    exportLines,
    `export { ${componentName} } from "./components/${componentName}"`,
  )
  const newLines = insertChunk(lines, linesWithInsert, startIndex, endIndex)

  return newLines.join("\n")
}

function getLinesBetween(lines: string[], start: string, end: string | false) {
  const startIndex = lines.findIndex(line => line.includes(start))
  const endIndex = lines.findIndex((line, i) => i > startIndex && line.includes(end as string))
  return { lines: lines.slice(startIndex + 1, endIndex), startIndex, endIndex }
}

function insertAndSort(
  lines: string[],
  insertLine: string,
  { excludePrefix = "", separator = /$/ } = {},
) {
  const newLines = [...lines, insertLine]
  return newLines.sort((a, b) => {
    const aSliced = a.slice(excludePrefix.length, a.search(separator))
    const bSliced = b.slice(excludePrefix.length, b.search(separator))
    return aSliced.localeCompare(bSliced)
  })
}

function insertChunk(lines: string[], chunk: string[], start: number, end: number) {
  return [...lines.slice(0, start + 1), ...chunk, ...lines.slice(end)]
}
