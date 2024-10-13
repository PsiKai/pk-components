### `Button` Component

#### Description

A reusable button component that accepts content (`children`), a click event handler, and additional CSS classes. Additional props may be passed for further customization of the style and display. Pending states are handles with a progressbar spinner.

#### Props

| Prop Name          | Type                                                              | Required | Default     | Description                                                    |
| ------------------ | ----------------------------------------------------------------- | -------- | ----------- | -------------------------------------------------------------- |
| `[htmlAttributes]` | `React.AllHTMLAttributes<HTMLButtonElement \| HTMLAnchorElement>` | No       | `undefined` | Any valid HTML attribute for the element type                  |
| `aria-*`           | `[key: aria-${string}]: string \| number \| boolean \| null`      | No       | `undefined` | Optional Accessibility attributes                              |
| `data-*`           | `[key: data-${string}]: string \| number \| boolean \| null`      | No       | `undefined` | Optional dataset attributes                                    |
| `children`         | `React.ReactNode`                                                 | No       | `undefined` | Content to display inside the button.                          |
| `className`        | `string`                                                          | No       | `undefined` | Additional CSS class for styling the button.                   |
| `pending`          | `boolean`                                                         | No       | `false`     | Disables the button and presents a loading spinner.            |
| `variant`          | `"primary" \| "secondary" \| "success" \| "warning" \| "danger"`  | No       | `"primary"` | Determines the style of button to display.                     |
| `fit`              | `"small" \| "medium" \| "large" \| "block" \| "link"`             | No       | `"large"`   | Determines the size of the button to display.                  |
| `href`             | `string`                                                          | No       | `undefined` | When present, converts the button to an anchor tag.            |
| `fill`             | `"solid" \| "outline"`                                            | No       | `"solid"`   | Changes the button's background color from filled to outlined. |

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

[Live Demo](https://psikai.github.io/pk-components#Button)
