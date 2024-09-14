import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import { Button } from "./Button"

describe("Button", () => {
  render(<Button>Click me</Button>)
  const button = screen.getByRole("button", { name: "Click me" })

  it("should render the component", () => {
    expect(button).toBeInTheDocument()
  })
})
