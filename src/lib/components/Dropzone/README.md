### Dropzone Component

#### Description

A generic dropzone component meant to handle drag and drop events with files. Handles the various drag events and validates the dragged content. Pass in callback functions to handle valid or invalid drops. Pass in the `accept` prop to specify which file types to validate.

#### Props

| Prop Name           | Type                     | Required | Default     | Description                                                                                                   |
| ------------------- | ------------------------ | -------- | ----------- | ------------------------------------------------------------------------------------------------------------- |
| `className`         | `string`                 | No       | `undefined` | Additional class names to apply to the spinner.                                                               |
| `handleValidDrop`   | `React.DragEventHandler` | Yes      | `undefined` | Receives the drop event when all validations are met.                                                         |
| `handleInvalidDrop` | `React.DragEventHandler` | Yes      | `undefined` | Receives the drop event when validations are _not_ met.                                                       |
| `accept`            | `string`                 | No       | `"image/*"` | HTML `accept` attribute. [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) |
| `children`          | `React.ReactNode`        | Yes      | `undefined` | Content to display inside the dropzone.                                                                       |

#### Example

```tsx
import { useCallback } from "react"
import { Dropzone } from "pk-components"

function YourComponent() {
  const handleValidDrop = useCallback((e: React.DragEvent) => {
    console.log(e.dataTransfer.files)
  }, [])

  const handleInvalidDrop = useCallback((e: React.DragEvent) => {
    console.log(e.dataTransfer.files)
  }, [])

  return (
    <Dropzone
      handleValidDrop={handleValidDrop}
      handleInvalidDrop={handleInvalidDrop}
      accept=".pdf,.doc"
    >
      Your content here
    </Dropzone>
  )
}
```

[Live Demo](https://psikai.github.io/pk-components#Dropzone)
