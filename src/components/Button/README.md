### `Button` Component

#### Description

A reusable button component that accepts content (`children`), a click event handler, and additional CSS classes.

#### Props

| Prop Name   | Type                                         | Required | Description                                  |
| ----------- | -------------------------------------------- | -------- | -------------------------------------------- |
| `children`  | `React.ReactNode`                            | No       | Content to display inside the button.        |
| `onClick`   | `React.MouseEventHandler<HTMLButtonElement>` | No       | Function to handle the button's click event. |
| `className` | `string`                                     | No       | Additional CSS class for styling the button. |

#### Example

```tsx
import { Button } from "psikai-component-lib"

;<Button onClick={() => console.log("Button clicked")} className="primary-button">
  Submit
</Button>
```
