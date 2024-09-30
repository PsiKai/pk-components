import React from "react"
  import { render, screen } from "@testing-library/react"
  import "@testing-library/jest-dom"

  import { FileInput } from "./FileInput"

  describe("FileInput", () => {
    beforeEach(() => {
      render(<FileInput />)
    })

    it("should render the component", () => {
      const component = screen.getByText("FileInput")
      expect(component).toBeInTheDocument()
    })
  })
