import path, { dirname } from "path"
import fs from "fs"
import { fileURLToPath } from "url"
import { pascalize } from "../../utils/string-utils"
import {
  generateComponentFile,
  generateDemoFile,
  generateIndexFile,
  generateModelFile,
  generateReadmeFile,
  generateSpecFile,
} from "./component-creation-templates"
import { parseInsertDemoIndex, parseInsertLibIndex } from "./component-creation.utils"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function main(componentName: string) {
  const santizedComponentName = pascalize(componentName)

  const destinationPath = path.join(
    __dirname,
    "../../src",
    "lib",
    "components",
    santizedComponentName,
  )

  if (fs.existsSync(destinationPath)) {
    throw new Error(`COMPONENT ALREADY EXISTS: ${santizedComponentName}`)
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

  const demoPath = path.join(__dirname, "../../src", "dev")

  // Create demo file
  await fs.promises.writeFile(
    path.join(demoPath, `demos/${santizedComponentName}Section.tsx`),
    generateDemoFile(santizedComponentName),
  )

  // Update the library index.tsx file
  const indexFile = path.join(__dirname, "../../src", "lib", "index.tsx")
  const indexFileData = await fs.promises.readFile(indexFile, { encoding: "utf-8" })
  const newIndexFileData = parseInsertLibIndex(indexFileData, santizedComponentName)
  await fs.promises.writeFile(indexFile, newIndexFileData)

  // Update the demo component-index.tsx file
  const componentIndexFile = path.join(demoPath, "component-index.tsx")
  const fileData = await fs.promises.readFile(componentIndexFile, { encoding: "utf-8" })
  const newData = parseInsertDemoIndex(fileData, santizedComponentName)
  await fs.promises.writeFile(componentIndexFile, newData)

  console.log("COMPONENT CREATED SUCCESSFULLY")
}
