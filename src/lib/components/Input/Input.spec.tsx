import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Input } from "./Input"
import { vi } from "vitest"

describe("Input", () => {
  describe("with initial state", () => {
    const onChange = vi.fn()

    beforeEach(() => {
      render(
        <Input
          id="test"
          onChange={onChange}
          label="test label"
          feedback="test feedback"
          hint="test hint"
          className="test-class"
          name="test"
        />,
      )
    })

    it("should render an input", () => {
      const inputComponent = screen.getByRole("textbox")
      expect(inputComponent).toBeInTheDocument()
      expect(inputComponent).toHaveClass("pk-input")
      expect(inputComponent).toHaveClass("test-class")
    })

    it("should render an attached label", () => {
      const labelComponent = screen.getByLabelText("test label")
      expect(labelComponent).toBeInTheDocument()
    })

    it("should render feedback text", () => {
      const hintComponent = screen.getByText("test feedback")
      expect(hintComponent).toBeInTheDocument()
      expect(hintComponent).toHaveClass("pk-input-feedback")
    })

    it("should render hint text", () => {
      const hintComponent = screen.getByText("test hint")
      expect(hintComponent).toBeInTheDocument()
      expect(hintComponent).toHaveClass("pk-input-hint")
    })

    it("should call the onChange function", () => {
      const inputComponent = screen.getByRole("textbox")
      fireEvent.change(inputComponent, { target: { value: "t" } })
      expect(onChange).toHaveBeenCalled()
    })
  })

  describe("with error state", () => {
    beforeEach(() => {
      render(
        <Input
          id="test"
          label="test label"
          feedback="test feedback"
          hint="test hint"
          error="test error"
        />,
      )
    })

    it("should render an error message", () => {
      const errorComponent = screen.getByText("test error")
      expect(errorComponent).toBeInTheDocument()
      expect(errorComponent).toHaveClass("pk-input-feedback-error")
    })

    it("should have feedback state of error", () => {
      const inputComponent = screen.getByRole("textbox")
      expect(inputComponent).toHaveClass("pk-input-error")
    })
  })
})
