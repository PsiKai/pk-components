import { main } from "./component-creation"

const componentName = process.argv[2]
/* istanbul ignore next */
if (!componentName) {
  throw new Error("ERROR: Please provide a component name")
}

main(componentName).catch(console.error)
