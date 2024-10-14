### Hamburger Component

#### Description

A standard hamburger menu button icon. Toggles between the standard hamburger shape icon, and an X close shape icon based on the `open` attribute. Pass in an `onClick` to define the side-effect of the click. Typically used to toggle a sidebar menu.

#### Props

| Prop Name | Type                                         | Required | Default     | Description                                  |
| --------- | -------------------------------------------- | -------- | ----------- | -------------------------------------------- |
| `onClick` | `React.MouseEventHandler<HTMLButtonElement>` | Yes      | `undefined` | Function to call when the button is clicked. |
| `open`    | `boolean`                                    | Yes      | `undefined` | Whether the hamburger is open or closed.     |

#### Example

```tsx
import { useState, useCallback } from "react"
import { Hamburger } from "pk-components"

function YourComponent() {
  const [openSidebar, setOpenSidebar] = useState(false)

  const onClick = useCallback(() => setOpen(prev => !prev), [])

  return (
    <header>
      <a href="/">Your Website Home</a>
      <Hamburger open={openSidebar} onClick={onClick} />
    </header>
  )
}
```

[Live Demo](https://psikai.github.io/pk-components#Hamburger)
