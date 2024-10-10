export class MockDataTransferItem extends File {
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

export class MockDataTransfer {
  items: MockDataTransferItemList
  dropEffect: "copy" | "none" | "move" | "link" | undefined
  effectAllowed: "copy" | "none" | "move" | "link" | undefined
  constructor() {
    this.items = new MockDataTransferItemList()
  }
}

export class MockDragEvent extends Event {
  clientX: number
  clientY: number
  constructor(type: string, eventInitDict: DragEventInit) {
    super(type, eventInitDict)
    const { clientX = 1, clientY = 1 } = eventInitDict
    this.clientX = clientX
    this.clientY = clientY
  }
}

export function getMockDataEvent(valid: boolean = true, type: string = "dragover") {
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

export const mockBoundingBox = {
  top: 0,
  bottom: 100,
  left: 0,
  right: 100,
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  toJSON: () => "",
}
