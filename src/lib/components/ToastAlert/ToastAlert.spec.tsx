import React from "react"
  import { render, screen } from "@testing-library/react"
  import "@testing-library/jest-dom"

  import { ToastAlert } from "./ToastAlert"

  describe("ToastAlert", () => {
    beforeEach(() => {
      render(<ToastAlert />)
    })

    it("should render the component", () => {
      const component = screen.getByText("ToastAlert")
      expect(component).toBeInTheDocument()
    })
  })
