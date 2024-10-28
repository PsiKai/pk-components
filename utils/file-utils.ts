import fs from "fs"
import path from "path"

export function findFile(fileName: string, dir: string): string | null {
  let files: string[]
  try {
    files = fs.readdirSync(dir)
  } catch (error) {
    console.error(`Error reading directory: ${dir}`)
    console.error(error)
    return null
  }

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      const found = findFile(fileName, filePath)
      if (found) {
        return found
      }
    } else if (file === fileName) {
      return filePath
    }
  }

  return null
}
