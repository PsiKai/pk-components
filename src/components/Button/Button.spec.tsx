import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { vi } from "vitest"

import { Button } from "./Button"

describe("Button", () => {
  render(<Button>Click me</Button>)

  it("should render the component", () => {
    const button = screen.getByRole("button", { name: "Click me" })
    expect(button).toBeInTheDocument()
  })

  for (const variant of ["primary", "secondary", "success", "warning", "danger"] as const) {
    describe(`with variant ${variant}`, () => {
      beforeEach(() => {
        render(<Button variant={variant}>Click me</Button>)
      })

      it("should have the correct variant class", () => {
        const button = screen.getByRole("button", { name: "Click me" })
        expect(button).toHaveClass(`pk-button-${variant}`)
      })
    })
  }

  for (const size of ["small", "medium", "large", "link", "block"] as const) {
    describe(`with size ${size}`, () => {
      beforeEach(() => {
        render(<Button fit={size}>Click me</Button>)
      })

      it("should have the correct size class", () => {
        const button = screen.getByRole("button", { name: "Click me" })
        expect(button).toHaveClass(`pk-button-${size}`)
      })
    })
  }

  describe("with an href prop", () => {
    beforeEach(() => {
      render(<Button href="/">Click me</Button>)
    })

    it("should render an anchor element", () => {
      const button = screen.getByRole("link", { name: "Click me" })
      expect(button).toBeInTheDocument()
    })
  })

  describe("with a custom class", () => {
    beforeEach(() => {
      render(<Button className="custom-class">Click me</Button>)
    })

    it("should have the custom class", () => {
      const button = screen.getByRole("button", { name: "Click me" })
      expect(button).toHaveClass("custom-class")
    })
  })

  describe("with a fill prop", () => {
    beforeEach(() => {
      render(<Button fill="outline">Click me</Button>)
    })

    it("should have the correct fill class", () => {
      const button = screen.getByRole("button", { name: "Click me" })
      expect(button).toHaveClass("pk-button-outline")
    })
  })

  describe("when disabled", () => {
    beforeEach(() => {
      render(<Button disabled>Click me</Button>)
    })

    it("should be disabled", () => {
      const button = screen.getByRole("button", { name: "Click me" })
      expect(button).toBeDisabled()
    })
  })

  describe("when pending", () => {
    beforeEach(() => {
      render(<Button pending>Click me</Button>)
    })

    it("should show a loading spinner", () => {
      const button = screen.getByRole("button", { name: "Click me" })
      const spinner = screen.getByRole("progressbar")
      expect(button).toContainElement(spinner)
      expect(button).toHaveClass("pk-button-progress")
    })
  })

  describe("when clicked", () => {
    it("should call the onClick function", () => {
      const onClick = vi.fn()
      render(<Button onClick={onClick}>Click me</Button>)

      const button = screen.getByRole("button", { name: "Click me" })
      button.click()

      expect(onClick).toHaveBeenCalled()
    })
  })
})
