### `LoadingSpinner` Component

#### Description

A minimal spinning element meant to denote progress or pending application state.

`LoadingSpinner` fills up the largest space within the window or its nearest relatively positioned parent element.

#### Props

| Prop Name          | Type                                                              | Required | Default     | Description                                     |
| ------------------ | ----------------------------------------------------------------- | -------- | ----------- | ----------------------------------------------- |
| `[htmlAttributes]` | `React.AllHTMLAttributes<HTMLButtonElement \| HTMLAnchorElement>` | No       | `undefined` | Any valid HTML attribute for the element type   |
| `aria-*`           | `[key: aria-${string}]: string \| number \| boolean \| null`      | No       | `undefined` | Optional Accessibility attributes               |
| `data-*`           | `[key: data-${string}]: string \| number \| boolean \| null`      | No       | `undefined` | Optional dataset attributes                     |
| `className`        | `string`                                                          | No       | `undefined` | Additional class names to apply to the spinner. |
| `fit`              | `"xs" \| "sm" \| "md" \| "lg" \| "xl"`                            | No       | `md`        | The size of the spinner.                        |

#### Example

```tsx
import { LoadingSpinner } from "pk-components"
import { useState } from 'react'

function YourComponent() {
  const [pending] = useState(true)

  return (
    {pending ? <LoadingSpinner /> : <App />}
  )
}
```

[Live Demo](https://psikai.github.io/pk-components#LoadingSpinner)
