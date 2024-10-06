### Dropzone Component

#### Description

A brief description of the component. Basic functionality and behavior.

#### Props

| Prop Name            | Type                                                                | Required | Default       | Description                                     |
| -------------------- | ------------------------------------------------------------------- | -------- | ------------- | ----------------------------------------------- |
| `[htmlAttributes]` | `React.AllHTMLAttributes<HTMLElement>`                            | No       | `undefined` | Any valid HTML attribute for the element type   |
| `aria-*`          | `[key: aria-${string}]: string \| number \| boolean \| null` | No       | `undefined` | Optional Accessibility attributes               |
| `data-*`          | `[key: data-${string}]: string \| number \| boolean \| null` | No       | `undefined` | Optional dataset attributes                     |
| `className`        | `string`                                                          | No       | `undefined` | Additional class names to apply to the spinner. |

#### Example

```tsx
import { Dropzone } from "pk-components"

function YourComponent() {
  return <Dropzone>Your content here</Dropzone>
}
```

[Live Demo](https://psikai.github.io/pk-components#Dropzone)
