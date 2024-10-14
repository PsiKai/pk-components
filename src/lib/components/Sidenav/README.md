### Sidenav Component

#### Description

A fixed, collasible section that sticks to the left or right side of the screen or a parent component. Open and close state is to be managed by a parent component. Provides light dismiss and scroll blocking features.

#### Props

| Prop Name          | Type                                                             | Required | Default                    | Description                                                                               |
| ------------------ | ---------------------------------------------------------------- | -------- | -------------------------- | ----------------------------------------------------------------------------------------- |
| `[htmlAttributes]` | `React.AllHTMLAttributes<HTMLElement>`                           | No       | `undefined`                | Any valid HTML attribute for the element type                                             |
| `aria-*`           | `[key: aria-${string}]: string \| number \| boolean \| null`     | No       | `undefined`                | Optional Accessibility attributes                                                         |
| `data-*`           | `[key: data-${string}]: string \| number \| boolean \| null`     | No       | `undefined`                | Optional dataset attributes                                                               |
| `className`        | `string`                                                         | No       | `undefined`                | Additional class names to apply to the spinner.                                           |
| `open`             | `boolean`                                                        | No       | `false`                    | Whether the sidenav is open or closed                                                     |
| `handleDismiss`    | `(e: KeyboardEvent \| React.MouseEvent<HTMLDivElement>) => void` | No       | `() => {}`                 | Function to call when the sidenav is dismissed. Required for light dismiss.               |
| `parent`           | `HTMLElement \| null`                                            | No       | `document.documentElement` | Parent element of the sidenav. Prevents scrolling of the parent when the sidenav is open. |
| `from`             | `"left" \| "right"`                                              | No       | `left`                     | Direction from which the sidenav should appear.                                           |

#### Example

```tsx
import { Sidenav } from "pk-components"

function YourComponent() {
  const [open, setOpen] = React.useState(false)

  const toggle = useCallback(() => setOpen(prev => !prev), [])
  const close = useCallback(() => setOpen(false), [])

  return (
    <header>
      <button onClick={toggle}>Toggle Sidenav</button>
      <Sidenav open={open} handleDismiss={close}>
        Your content here
      </Sidenav>
    </header>
  )
}
```

[Live Demo](https://psikai.github.io/pk-components#Sidenav)
