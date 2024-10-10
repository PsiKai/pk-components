import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { vi } from "vitest"
import "@testing-library/jest-dom"

import { Dropzone } from "./Dropzone"
import { getMockDataEvent, mockBoundingBox, MockDataTransfer } from "./mocks"

describe("Dropzone", () => {
  const onValidDrop = vi.fn()
  const onInvalidDrop = vi.fn()

  beforeEach(() => {
    vi.stubGlobal("DataTransfer", MockDataTransfer)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe("with omitted props", () => {
    beforeEach(() => {
      render(
        <Dropzone handleValidDrop={onValidDrop} handleInvalidDrop={onInvalidDrop}>
          <div>
            <span>Dropzone</span>
            <span>Area</span>
          </div>
        </Dropzone>,
      )
    })

    describe("with no accept prop", () => {
      it("should default to image/*", () => {
        const dropzone = screen.getByTestId("pk-dropzone")
        const { dataTransfer } = getMockDataEvent()

        fireEvent.drop(dropzone, { dataTransfer })
        expect(onValidDrop).toHaveBeenCalled()
      })
    })

    describe("with no className prop", () => {
      it("should default to pk-dropzone", () => {
        const dropzone = screen.getByTestId("pk-dropzone")
        expect(dropzone).toHaveClass("pk-dropzone")
        expect(dropzone).not.toHaveClass("test-dropzone")
      })
    })
  })

  describe("with valid props", () => {
    beforeEach(() => {
      render(
        <Dropzone
          handleValidDrop={onValidDrop}
          handleInvalidDrop={onInvalidDrop}
          className={"test-dropzone"}
          accept={["image/*"]}
        >
          <div>
            <span>Dropzone</span>
            <span>Area</span>
          </div>
        </Dropzone>,
      )
    })

    describe("as a DOM element", () => {
      it("should render the children", () => {
        const child1 = screen.getByText("Dropzone")
        const child2 = screen.getByText("Area")
        expect(child1).toBeInTheDocument()
        expect(child2).toBeInTheDocument()
      })

      it("should have the correct class names", () => {
        const component = screen.getByTestId("pk-dropzone")
        expect(component).toHaveClass("test-dropzone")
        expect(component).toHaveClass("pk-dropzone")
        expect(component).not.toHaveClass("is-dragged-over")
      })
    })

    describe("with onValidDrop prop", () => {
      it("should be fired when a valid file is dropped", () => {
        const dropzone = screen.getByTestId("pk-dropzone")
        const { dataTransfer } = getMockDataEvent()

        fireEvent.drop(dropzone, { dataTransfer })
        expect(onValidDrop).toHaveBeenCalled()
      })
    })

    describe("with onInvalidDrop prop", () => {
      it("should be fired when an invalid file is dropped", () => {
        const dropzone = screen.getByTestId("pk-dropzone")
        const { dataTransfer } = getMockDataEvent(false)

        fireEvent.drop(dropzone, { dataTransfer })
        expect(onInvalidDrop).toHaveBeenCalled()
      })
    })

    describe("when a file is dragged over the dropzone", () => {
      describe("with a valid file", () => {
        it("should set the is-dragged-over class", () => {
          const dropzone = screen.getByTestId("pk-dropzone")
          const { dataTransfer } = getMockDataEvent()

          fireEvent.dragEnter(dropzone, { dataTransfer })
          expect(dropzone).toHaveClass("is-dragged-over")
        })

        it("should set dropEffect to copy", () => {
          const dropzone = screen.getByTestId("pk-dropzone")
          const { dataTransfer, dragEvent } = getMockDataEvent()
          const preventDefault = vi.spyOn(dragEvent, "preventDefault")
          const stopPropagation = vi.spyOn(dragEvent, "stopPropagation")

          fireEvent.dragEnter(dropzone, { dataTransfer })
          fireEvent(dropzone, dragEvent)
          expect(preventDefault).toHaveBeenCalled()
          expect(stopPropagation).toHaveBeenCalled()
          expect(dragEvent.dataTransfer?.dropEffect).toBe("copy")
        })

        describe("when internal dragleave event is fired", () => {
          it("should not remove the is-dragged-over class", () => {
            const dropzone = screen.getByTestId("pk-dropzone")
            const child = screen.getByText("Dropzone")
            const { dataTransfer, dragEvent } = getMockDataEvent(true, "dragleave")
            vi.spyOn(dropzone, "getBoundingClientRect").mockReturnValue(mockBoundingBox)

            fireEvent.dragEnter(dropzone, { dataTransfer })
            expect(dropzone).toHaveClass("is-dragged-over")

            fireEvent(child, dragEvent)
            expect(dropzone).toHaveClass("is-dragged-over")
          })
        })
      })

      describe("with an invalid file", () => {
        it("should not set the is-dragged-over class", () => {
          const dropzone = screen.getByTestId("pk-dropzone")
          const { dataTransfer } = getMockDataEvent(false)

          fireEvent.dragEnter(dropzone, { dataTransfer })
          expect(dropzone).not.toHaveClass("is-dragged-over")
        })

        it("should set dropEffect to none of invalid drag", () => {
          const dropzone = screen.getByTestId("pk-dropzone")
          const { dragEvent, dataTransfer } = getMockDataEvent(false)
          const preventDefault = vi.spyOn(dragEvent, "preventDefault")
          const stopPropagation = vi.spyOn(dragEvent, "stopPropagation")

          fireEvent.dragEnter(dropzone, { dataTransfer })
          fireEvent(dropzone, dragEvent)
          expect(preventDefault).toHaveBeenCalled()
          expect(stopPropagation).toHaveBeenCalled()
          expect(dragEvent.dataTransfer?.dropEffect).toBe("none")
        })
      })
    })

    describe("when a file is dragged over the dropzone and then dragged out", () => {
      describe("with dragleave event", () => {
        it("should remove the is-dragged-over class", () => {
          const dropzone = screen.getByTestId("pk-dropzone")
          const { dataTransfer } = getMockDataEvent()

          fireEvent.dragEnter(dropzone, { dataTransfer })
          expect(dropzone).toHaveClass("is-dragged-over")

          fireEvent.dragLeave(dropzone)
          expect(dropzone).not.toHaveClass("is-dragged-over")
        })
      })

      describe("with dragend event", () => {
        it("should remove the is-dragged-over-class", () => {
          const dropzone = screen.getByTestId("pk-dropzone")
          const { dataTransfer } = getMockDataEvent()

          fireEvent.dragEnter(dropzone, { dataTransfer })
          expect(dropzone).toHaveClass("is-dragged-over")

          fireEvent.dragEnd(dropzone)
          expect(dropzone).not.toHaveClass("is-dragged-over")
        })
      })
    })
  })
})
