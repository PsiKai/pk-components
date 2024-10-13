import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import { Hamburger } from "./Hamburger"
import { vi } from "vitest"

describe("Hamburger", () => {
  let open = false
  const onClick = vi.fn().mockImplementation(() => {
    open = !open
  })

  beforeEach(() => {
    render(<Hamburger onClick={onClick} open={open} />)
  })

  it("should render the component", () => {
    const component = screen.getByTestId("pk-hamburger-button")
    expect(component).toBeInTheDocument()
  })

  it("should have default styles of the bars", () => {
    const component = screen.getByTestId("pk-hamburger-button")

    for (const bar of component.children) {
      expect(bar).toHaveStyle("transform: none")
    }
  })

  it("should call onClick", () => {
    const component = screen.getByTestId("pk-hamburger-button")
    component.click()
    expect(onClick).toHaveBeenCalled()
  })

  it("should change the style of the bars", () => {
    const component = screen.getByTestId("pk-hamburger-button")
    component.click()
    const [firstBar, secondBar, thirdBar] = component.children

    expect(firstBar).toHaveStyle("transform: rotate(41deg) scaleX(1.1)")
    expect(secondBar).toHaveStyle("transform: scaleX(0)")
    expect(thirdBar).toHaveStyle("transform: rotate(-41deg) scaleX(1.1)")
  })
})
