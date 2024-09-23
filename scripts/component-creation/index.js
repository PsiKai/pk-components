import path, { dirname } from "path"
import fs from "fs"
import { fileURLToPath } from "url"
import { pascalize } from "../../utils/string-utils.js"
import {
  generateComponentFile,
  generateIndexFile,
  generateModelFile,
  generateReadmeFile,
  generateSpecFile,
} from "./component-creation-templates.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function main(componentName) {
  const santizedComponentName = pascalize(componentName)

  const destinationPath = path.join(
    __dirname,
    "../../src",
    "lib",
    "components",
    santizedComponentName,
  )

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

const componentName = process.argv[2]
if (!componentName) {
  console.error("ERROR: Please provide a component name")
  process.exit(1)
}

main(componentName).catch(console.error)
