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

  describe("when required", () => {
    beforeEach(() => {
      render(
        <Input id="test" label="test label" feedback="test feedback" hint="test hint" required />,
      )
    })

    it("should render a required label", () => {
      const labelComponent = screen.getByText("test label")
      expect(labelComponent).toHaveClass("label-required")
    })
  })

  describe("with error state as string", () => {
    beforeEach(() => {
      render(
        <Input
          id="test"
          label="test label"
          feedback="test feedback"
          hint="test hint"
          error="test error"
          clean="test clean"
        />,
      )
    })

    it("should render an error message", () => {
      const errorComponent = screen.getByText("test error")
      expect(errorComponent).toBeInTheDocument()
      expect(errorComponent).toHaveClass("pk-input-feedback-error")
    })

    it("should not display the feedback text", () => {
      const feedbackComponent = screen.queryByText("test feedback")
      expect(feedbackComponent).not.toBeInTheDocument()
    })

    it("should not display the clean text", () => {
      const cleanComponent = screen.queryByText("test clean")
      expect(cleanComponent).not.toBeInTheDocument()
    })

    it("should have feedback state of error", () => {
      const inputComponent = screen.getByRole("textbox")
      expect(inputComponent).toHaveClass("pk-input-error")
    })

    it("should have aria-invalid attribute", () => {
      const inputComponent = screen.getByRole("textbox")
      expect(inputComponent).toHaveAttribute("aria-invalid", "true")
    })
  })

  describe("with error state as boolean", () => {
    beforeEach(() => {
      render(
        <Input
          id="test"
          label="test label"
          feedback="test feedback"
          hint="test hint"
          error={true}
          clean="test clean"
        />,
      )
    })

    it("should render a default error message", () => {
      const errorComponent = screen.getByText("✗ Invalid")
      expect(errorComponent).toBeInTheDocument()
    })

    it("should have feedback state of error", () => {
      const inputComponent = screen.getByRole("textbox")
      expect(inputComponent).toHaveClass("pk-input-error")
    })

    it("should not display the feedback text", () => {
      const feedbackComponent = screen.queryByText("test feedback")
      expect(feedbackComponent).not.toBeInTheDocument()
    })

    it("should not display the clean text", () => {
      const cleanComponent = screen.queryByText("test clean")
      expect(cleanComponent).not.toBeInTheDocument()
    })

    it("should have aria-invalid attribute", () => {
      const inputComponent = screen.getByRole("textbox")
      expect(inputComponent).toHaveAttribute("aria-invalid", "true")
    })
  })

  describe("with clean state", () => {
    beforeEach(() => {
      render(
        <Input
          id="test"
          label="test label"
          feedback="test feedback"
          hint="test hint"
          clean="test clean"
        />,
      )
    })

    it("should render a clean message", () => {
      const cleanComponent = screen.getByText("test clean")
      expect(cleanComponent).toBeInTheDocument()
      expect(cleanComponent).toHaveClass("pk-input-feedback-clean")
    })

    it("should not display the error text", () => {
      const errorComponent = screen.queryByText("test error")
      expect(errorComponent).not.toBeInTheDocument()
    })

    it("should not display the feedback text", () => {
      const feedbackComponent = screen.queryByText("test feedback")
      expect(feedbackComponent).not.toBeInTheDocument()
    })

    it("should have feedback state of clean", () => {
      const inputComponent = screen.getByRole("textbox")
      expect(inputComponent).toHaveClass("pk-input-clean")
    })
  })

  describe("with clean state as boolean", () => {
    beforeEach(() => {
      render(
        <Input
          id="test"
          label="test label"
          feedback="test feedback"
          hint="test hint"
          clean={true}
        />,
      )
    })

    it("should render a default clean message", () => {
      const cleanComponent = screen.getByText("✓ Done")
      expect(cleanComponent).toBeInTheDocument()
    })

    it("should have feedback state of clean", () => {
      const inputComponent = screen.getByRole("textbox")
      expect(inputComponent).toHaveClass("pk-input-clean")
    })

    it("should not display the error text", () => {
      const errorComponent = screen.queryByText("test error")
      const defaultErrorComponent = screen.queryByText("✗ Invalid")
      expect(errorComponent).not.toBeInTheDocument()
      expect(defaultErrorComponent).not.toBeInTheDocument()
    })

    it("should not display the feedback text", () => {
      const feedbackComponent = screen.queryByText("test feedback")
      expect(feedbackComponent).not.toBeInTheDocument()
    })
  })

  describe("with no feedback state", () => {
    beforeEach(() => {
      render(<Input id="test" label="test label" hint="test hint" />)
    })

    it("should not display the error text", () => {
      const errorComponent = screen.queryByText("test error")
      expect(errorComponent).not.toBeInTheDocument()
    })

    it("should not display the feedback text", () => {
      const feedbackComponent = screen.queryByText("test feedback")
      expect(feedbackComponent).not.toBeInTheDocument()
    })

    it("should not display the clean text", () => {
      const cleanComponent = screen.queryByText("test clean")
      expect(cleanComponent).not.toBeInTheDocument()
    })
  })
})
