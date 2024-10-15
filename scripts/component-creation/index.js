import { main } from "./component-creation.js"

const componentName = process.argv[2]
if (!componentName) {
  console.error("ERROR: Please provide a component name")
  process.exit(1)
}

main(componentName).catch(console.error)
