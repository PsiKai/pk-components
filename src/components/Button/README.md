### `Button` Component

#### Description

A reusable button component that accepts content (`children`), a click event handler, and additional CSS classes.

#### Props

| Prop Name   | Type                                         | Required | Default   | Description                                  |
| ----------- | -------------------------------------------- | -------- | --------- | -------------------------------------------- |
| `children`  | `React.ReactNode`                            | No       | undefined | Content to display inside the button.        |
| `onClick`   | `React.MouseEventHandler<HTMLButtonElement>` | No       | undefined | Function to handle the button's click event. |
| `className` | `string`                                     | No       | undefined | Additional CSS class for styling the button. |

#### Example

```tsx
import { Button } from "pk-components"

function YourComponent() {
  const handleClick = (e: React.MouseEvent) => console.log("Button clicked", e)

  return (
    <Button onClick={handleClick} className="primary-button">
      Submit
    </Button>
  )
}
```
