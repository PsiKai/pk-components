import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { AppDev } from "./AppDev"

const root = createRoot(document.getElementById("root")!)

root.render(
  <StrictMode>
    <AppDev />
  </StrictMode>,
)
