import React from "react"
  import { render, screen } from "@testing-library/react"
  import "@testing-library/jest-dom"

  import { Sidenav } from "./Sidenav"

  describe("Sidenav", () => {
    beforeEach(() => {
      render(<Sidenav />)
    })

    it("should render the component", () => {
      const component = screen.getByText("Sidenav")
      expect(component).toBeInTheDocument()
    })
  })
