import React from "react"
  import { render, screen } from "@testing-library/react"
  import "@testing-library/jest-dom"

  import { LoadingSpinner } from "./LoadingSpinner"

  describe("LoadingSpinner", () => {
    render(<LoadingSpinner />)
    const component = screen.getByText("LoadingSpinner")

    it("should render the component", () => {
      expect(component).toBeInTheDocument()
    })
  })
