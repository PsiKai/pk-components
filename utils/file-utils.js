import fs from "fs"
import path from "path"

export function findFile(fileName, dir) {
  let files
  try {
    files = fs.readdirSync(dir)
  } catch (error) {
    return null
  }

  for (let file of files) {
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
