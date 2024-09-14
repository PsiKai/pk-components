import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Button } from "../components/Button"
import "./index.css"

// eslint-disable-next-line react-refresh/only-export-components
const AppDev = () => {
  const handleClick = (e: React.MouseEvent) => {
    console.log("Button clicked", e)
  }

  return (
    <>
      <h1>Hello, world!</h1>
      <Button onClick={handleClick}>Click me</Button>
    </>
  )
}

const root = createRoot(document.getElementById("root")!)

root.render(
  <StrictMode>
    <AppDev />
  </StrictMode>,
)
