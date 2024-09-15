### `Button` Component

#### Description

A reusable button component that accepts content (`children`), a click event handler, and additional CSS classes. Additional props may be passed for further customization of the style and display. Pending states are handles with a progressbar spinner.

#### Props

| Prop Name   | Type                                                             | Required | Default     | Description                                                    |
| ----------- | ---------------------------------------------------------------- | -------- | ----------- | -------------------------------------------------------------- |
| `children`  | `React.ReactNode`                                                | No       | `undefined` | Content to display inside the button.                          |
| `onClick`   | `React.MouseEventHandler<HTMLButtonElement>`                     | No       | `undefined` | Function to handle the button's click event.                   |
| `className` | `string`                                                         | No       | `undefined` | Additional CSS class for styling the button.                   |
| `disabled`  | `boolean`                                                        | No       | `false`     | Disables the button from user interaction.                     |
| `pending`   | `boolean`                                                        | No       | `false`     | Disables the button and presents a loading spinner.            |
| `variant`   | `"primary" \| "secondary" \| "success" \| "warning" \| "danger"` | No       | `"primary"` | Determines the style of button to display.                     |
| `type`      | `"button" \| "submit" \| "reset"`                                | No       | `"button"`  | Assigns the semantic HTML button type.                         |
| `size`      | `"small" \| "medium" \| "large" \| "block" \| "link"`            | No       | `"large"`   | Determines the size of the button to display.                  |
| `href`      | `string`                                                         | No       | `undefined` | When present, converts the button to an anchor tag.            |
| `fill`      | `"solid" \| "outline"`                                           | No       | `"solid"`   | Changes the button's background color from filled to outlined. |

#### Example

```tsx
import { Button } from "pk-components"

function YourComponent() {
  const handleClick = (e: React.MouseEvent) => console.log("Button clicked", e)

  return (
    <Button onClick={handleClick} className="primary-button" type="submit">
      Submit
    </Button>
  )
}
```
