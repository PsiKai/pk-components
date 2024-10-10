import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import { Dropzone } from "./Dropzone"
import { vi } from "vitest"

class MockDataTransferItem extends File {
  getAsFile() {
    return this
  }
}

class MockDataTransferItemList {
  items: MockDataTransferItem[]
  constructor() {
    this.items = []
  }

  add(item: MockDataTransferItem) {
    this.items.push(item)
  }

  clear() {
    this.items = []
  }

  get length() {
    return this.items.length
  }

  [Symbol.iterator]() {
    return this.items[Symbol.iterator]()
  }
}

class MockDataTransfer {
  items: MockDataTransferItemList
  dropEffect: "copy" | "none" | "move" | "link"
  effectAllowed: "copy" | "none" | "move" | "link"
  constructor() {
    this.items = new MockDataTransferItemList()
  }
}

class MockDragEvent extends Event {
  clientX: number
  clientY: number
  constructor(type: string, eventInitDict: DragEventInit) {
    super(type, eventInitDict)
    const { clientX = 1, clientY = 1 } = eventInitDict
    this.clientX = clientX
    this.clientY = clientY
  }
}

function getDataEvent(valid: boolean = true, type: string = "dragover") {
  const dataTransfer = new MockDataTransfer()
  const file = new MockDataTransferItem([""], "test.jpg", {
    type: valid ? "image/jpeg" : "text/plain",
  })
  dataTransfer.items.add(file)

  const event = new MockDragEvent(type, { bubbles: true, cancelable: true })
  new MockDragEvent(type, { bubbles: true, cancelable: true })
  const dragEvent = Object.defineProperty(event, "dataTransfer", {
    value: dataTransfer,
  }) as DragEvent
  return { dragEvent, dataTransfer }
}

describe("Dropzone", () => {
  const onValidDrop = vi.fn()
  const onInvalidDrop = vi.fn()
  let accept: string[] | undefined
  let className: string | undefined

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
        const { dataTransfer } = getDataEvent()

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
      accept = ["image/*"]
      className = "test-dropzone"
      render(
        <Dropzone
          handleValidDrop={onValidDrop}
          handleInvalidDrop={onInvalidDrop}
          className={className}
          accept={accept}
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
        const { dataTransfer } = getDataEvent()

        fireEvent.drop(dropzone, { dataTransfer })
        expect(onValidDrop).toHaveBeenCalled()
      })
    })

    describe("with onInvalidDrop prop", () => {
      it("should be fired when an invalid file is dropped", () => {
        const dropzone = screen.getByTestId("pk-dropzone")
        const { dataTransfer } = getDataEvent(false)

        fireEvent.drop(dropzone, { dataTransfer })
        expect(onInvalidDrop).toHaveBeenCalled()
      })
    })

    describe("when a file is dragged over the dropzone", () => {
      describe("with a valid file", () => {
        it("should set the is-dragged-over class", () => {
          const dropzone = screen.getByTestId("pk-dropzone")
          const { dataTransfer } = getDataEvent()

          fireEvent.dragEnter(dropzone, { dataTransfer })
          expect(dropzone).toHaveClass("is-dragged-over")
        })

        it("should set dropEffect to copy", () => {
          const dropzone = screen.getByTestId("pk-dropzone")
          const { dataTransfer, dragEvent } = getDataEvent()
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
            vi.spyOn(dropzone, "getBoundingClientRect").mockReturnValue({
              top: 0,
              bottom: 100,
              left: 0,
              right: 100,
              x: 0,
              y: 0,
              width: 100,
              height: 100,
              toJSON: () => "",
            })
            const child = screen.getByText("Dropzone")
            const { dataTransfer, dragEvent } = getDataEvent(true, "dragleave")

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
          const { dataTransfer } = getDataEvent(false)

          fireEvent.dragEnter(dropzone, { dataTransfer })
          expect(dropzone).not.toHaveClass("is-dragged-over")
        })

        it("should set dropEffect to none of invalid drag", () => {
          const dropzone = screen.getByTestId("pk-dropzone")
          const { dragEvent, dataTransfer } = getDataEvent(false)
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
          const { dataTransfer } = getDataEvent()

          fireEvent.dragEnter(dropzone, { dataTransfer })
          expect(dropzone).toHaveClass("is-dragged-over")

          fireEvent.dragLeave(dropzone)
          expect(dropzone).not.toHaveClass("is-dragged-over")
        })
      })

      describe("with dragend event", () => {
        it("should remove the is-dragged-over-class", () => {
          const dropzone = screen.getByTestId("pk-dropzone")
          const { dataTransfer } = getDataEvent()

          fireEvent.dragEnter(dropzone, { dataTransfer })
          expect(dropzone).toHaveClass("is-dragged-over")

          fireEvent.dragEnd(dropzone)
          expect(dropzone).not.toHaveClass("is-dragged-over")
        })
      })
    })
  })
})
