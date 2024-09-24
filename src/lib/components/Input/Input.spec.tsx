import React from "react"
  import { render, screen } from "@testing-library/react"
  import "@testing-library/jest-dom"

  import { Input } from "./Input"

  describe("Input", () => {
    beforeEach(() => {
      render(<Input />)
    })

    it("should render the component", () => {
      const component = screen.getByText("Input")
      expect(component).toBeInTheDocument()
    })
  })
