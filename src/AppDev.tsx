import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import Button from "./components/Button"

const root = createRoot(document.getElementById("root")!)

root.render(
  <StrictMode>
    <div>Hello, world!</div>
    <Button />
  </StrictMode>,
)
