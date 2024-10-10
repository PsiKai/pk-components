import React from "react"
import { fireEvent, render, renderHook, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { vi } from "vitest"

import { FileInput } from "./FileInput"
import { getMockDataEvent } from "../Dropzone/mocks"

describe("FileInput", () => {
  const onChange = vi.fn()
  const testFileName = "test-file.jpg"

  beforeAll(() => {
    vi.stubGlobal("URL", { createObjectURL: vi.fn().mockReturnValue(new Image().src) })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe("with basic props", () => {
    beforeEach(() => {
      render(
        <FileInput id="test-id" onChange={onChange} label="Test Upload File" accept=".jpg,.png" />,
      )
    })

    it("should render the file input", () => {
      const fileInput = screen.getByLabelText("Browse your files")
      expect(fileInput).toBeInTheDocument()
    })

    it("should render the label", () => {
      const labelText = screen.getByText("Test Upload File")
      expect(labelText).toBeInTheDocument()
    })

    it("should render the accept hint text", () => {
      const acceptHint = screen.getByText("accepts: .jpg,.png")
      expect(acceptHint).toBeInTheDocument()
    })

    it("should be described by the label, hint, and accept", () => {
      const fileInput = screen.getByLabelText("Browse your files")
      expect(fileInput).toHaveAccessibleDescription("Test Upload File accepts: .jpg,.png")
    })
  })

  describe("with multiple files", () => {
    beforeEach(() => {
      render(<FileInput id="test-id" onChange={onChange} accept="image/*" multiple />)
    })

    it("should display multiple in hint text", () => {
      const acceptHint = screen.getByText("accepts multiple: image/*")
      expect(acceptHint).toBeInTheDocument()
    })
  })

  describe("when fileDisplay is list", () => {
    beforeEach(() => {
      render(<FileInput id="test-id" onChange={onChange} fileDisplay="list" />)
      const fileInput = screen.getByLabelText("Browse your files")

      fireEvent.change(fileInput, { target: { files: [{ name: testFileName }] } })
    })

    it("should call the onChange function", () => {
      expect(onChange).toHaveBeenCalled()
    })

    it("should display the file name", () => {
      expect(screen.getByRole("listitem")).toBeInTheDocument()
      expect(screen.getByText(testFileName)).toBeInTheDocument()
    })

    it("should display file remove button", () => {
      const removeButton = screen.getByRole("button", { name: `Remove ${testFileName}` })
      expect(removeButton).toBeInTheDocument()
    })

    it("should remove the file on button click", () => {
      const removeButton = screen.getByRole("button", { name: `Remove ${testFileName}` })
      fireEvent.click(removeButton)

      expect(screen.queryByText(testFileName)).not.toBeInTheDocument()
    })

    it("should render no feedback when no file is selected", () => {
      const fileInput = screen.getByLabelText("Browse your files")
      fireEvent.change(fileInput, { target: { files: null } })

      expect(screen.queryByRole("listitem")).not.toBeInTheDocument()
      expect(screen.queryByRole("button", { name: /^Remove/ })).not.toBeInTheDocument()
    })

    // it("should be described by the file list", () => {
    //   const fileInput = screen.getByLabelText("Browse your files")
    //   expect(fileInput).toHaveAccessibleDescription(testFileName)
    // })
  })

  describe("when fileDisplay is preview", () => {
    const file = new File([""], testFileName, { type: "image/jpg" })

    beforeEach(() => {
      render(<FileInput id="test-id" onChange={onChange} fileDisplay="preview" />)

      const fileInput = screen.getByLabelText("Browse your files")
      fireEvent.change(fileInput, { target: { files: [file] } })
    })

    it("should call the onChange function", () => {
      expect(onChange).toHaveBeenCalled()
    })

    it("should display the file preview", () => {
      const imageElement = screen.getByRole("img", { name: testFileName })

      expect(imageElement).toBeInTheDocument()
      expect(URL.createObjectURL).toHaveBeenCalledWith(file)
    })

    it("should display file remove button", () => {
      const removeButton = screen.getByRole("button", { name: `Remove ${testFileName}` })
      expect(removeButton).toBeInTheDocument()
    })

    it("should remove the file preview on button click", () => {
      const imageElement = screen.getByRole("img", { name: testFileName })
      const removeButton = screen.getByRole("button", { name: `Remove ${testFileName}` })
      fireEvent.click(removeButton)

      expect(imageElement).not.toBeInTheDocument()
    })

    it("should render no feedback when no file is selected", () => {
      const fileInput = screen.getByLabelText("Browse your files")
      fireEvent.change(fileInput, { target: { files: null } })

      expect(screen.queryByRole("img")).not.toBeInTheDocument()
      expect(screen.queryByRole("button", { name: /^Remove/ })).not.toBeInTheDocument()
    })

    // it("should be described by the preview images", () => {
    //   const fileInput = screen.getByLabelText("Browse your files")
    //   expect(fileInput).toHaveAccessibleDescription(testFileName)
    // })
  })

  describe("when required", () => {
    beforeEach(() => {
      render(<FileInput id="test-id" onChange={onChange} label="test label" required />)
    })

    it("should render a required label", () => {
      const labelText = screen.getByText("test label")
      expect(labelText).toHaveClass("label-required")
    })
  })

  describe("with dropzone prop", () => {
    describe("with ref prop", () => {
      beforeEach(() => {
        const inputRef = renderHook(() => React.useRef<HTMLInputElement>(null)).result.current
        render(
          <FileInput id="test-id" onChange={onChange} ref={inputRef} accept="image/*" dropzone />,
        )
      })

      it("should render the dropzone", () => {
        const dropzone = screen.getByTestId("pk-dropzone")
        const labels = screen.getByText("Drag and Drop files here")
        expect(dropzone).toBeInTheDocument()
        expect(labels).toBeInTheDocument()
      })

      describe("when a valid file is dropped", () => {
        it("should call the onChange function", () => {
          const dropzone = screen.getByTestId("pk-dropzone")
          const { dataTransfer } = getMockDataEvent()

          fireEvent.drop(dropzone, { dataTransfer })
          expect(onChange).toHaveBeenCalled()
        })
      })

      describe("when an invalid file is dropped", () => {
        it("should log the event", () => {
          const dropzone = screen.getByTestId("pk-dropzone")
          const { dataTransfer } = getMockDataEvent(false)
          const consoleSpy = vi.spyOn(console, "log")

          fireEvent.drop(dropzone, { dataTransfer })
          expect(consoleSpy).toHaveBeenCalled()
        })
      })
    })

    describe("without ref prop", () => {
      beforeEach(() => {
        render(<FileInput id="test-id" onChange={onChange} accept="image/*" dropzone />)
      })

      it("should not call onChange on valid drop", () => {
        const dropzone = screen.getByTestId("pk-dropzone")
        const { dataTransfer } = getMockDataEvent()

        fireEvent.drop(dropzone, { dataTransfer })
        expect(onChange).not.toHaveBeenCalled()
      })
    })
  })
})
