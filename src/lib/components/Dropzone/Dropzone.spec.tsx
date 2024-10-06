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

  get length() {
    return this.items.length
  }

  [Symbol.iterator]() {
    return this.items[Symbol.iterator]()
  }
}

class MockDataTransfer {
  items: MockDataTransferItemList
  constructor() {
    this.items = new MockDataTransferItemList()
  }
}

describe("Dropzone", () => {
  const onValidDrop = vi.fn()
  const onInvalidDrop = vi.fn()

  beforeEach(() => {
    render(
      <Dropzone
        handleValidDrop={onValidDrop}
        handleInvalidDrop={onInvalidDrop}
        className="test-dropzone"
        accept={["image/*"]}
      >
        <span>Dropzone</span>
      </Dropzone>,
    )

    vi.stubGlobal("DataTransfer", MockDataTransfer)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should render the children", () => {
    const component = screen.getByText("Dropzone")
    expect(component).toBeInTheDocument()
  })

  it("should have the correct class name", () => {
    const component = screen.getByTestId("pk-dropzone")
    expect(component).toHaveClass("test-dropzone")
  })

  it("should call the onValidDrop function when a valid file is dropped", () => {
    const dropzone = screen.getByTestId("pk-dropzone")
    const dataTransfer = new MockDataTransfer()
    const file = new MockDataTransferItem([""], "test.jpg", { type: "image/jpeg" })
    dataTransfer.items.add(file)

    fireEvent.drop(dropzone, { dataTransfer })
    expect(onValidDrop).toHaveBeenCalled()
  })

  it("should call the onInvalidDrop function when an invalid file is dropped", () => {
    const dropzone = screen.getByTestId("pk-dropzone")
    const dataTransfer = new MockDataTransfer()
    const file = new MockDataTransferItem([""], "test.jpg", { type: "text/plain" })
    dataTransfer.items.add(file)

    fireEvent.drop(dropzone, { dataTransfer })
    expect(onInvalidDrop).toHaveBeenCalled()
  })

  it("should toggle the is-dragged-over class on drag enter and leave", () => {
    const dropzone = screen.getByTestId("pk-dropzone")
    const dataTransfer = new MockDataTransfer()
    const file = new MockDataTransferItem([""], "test.jpg", { type: "image/jpeg" })
    dataTransfer.items.add(file)

    fireEvent.dragEnter(dropzone, { dataTransfer })
    expect(dropzone).toHaveClass("is-dragged-over")

    fireEvent.dragLeave(dropzone)
    expect(dropzone).not.toHaveClass("is-dragged-over")
  })
})
