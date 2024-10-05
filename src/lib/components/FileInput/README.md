### FileInput Component

#### Description

A styled file input. Hides the native browser display and substitutes a button-like label which triggers the input on click. Optionally displays an additional label text, and displays the `accept` attribute as hint text. The `fileDisplay` prop optionally shows a file name or image preview of the selected file or files. The component forwards a Ref object to the input for clearing the inputs value after form submission.

#### Props

| Prop Name          | Type                                         | Required | Default     | Description                                                        |
| ------------------ | -------------------------------------------- | -------- | ----------- | ------------------------------------------------------------------ |
| `[htmlAttributes]` | `React.AllHTMLAttributes<HTMLElement>`       | No       | `undefined` | Any valid HTML attribute for the element type                      |
| `className`        | `string`                                     | No       | `undefined` | Additional class names to apply to the element.                    |
| `id`               | `string`                                     | Yes      | `undefined` | The unique ID for applying to the accessible label                 |
| `onChange`         | `React.ChangeEventHandler<HTMLInputElement>` | Yes      | `undefined` | The handler for the input's change events                          |
| `fileDisplay`      | `"list" \| "preview"`                        | No       | `undefined` | Optionally present the selected files as a list or image previews. |
| `ref`              | `React.ForwardedRef<HTMLInputElement>`       | No       | `undefined` | A ref object attached to the input                                 |

#### Example

```tsx
import { FileInput } from "pk-components"

function YourComponent() {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
  }

  return <FileInput id="file-input" onChange={onChange} />
}
```

[Live Demo](https://psikai.github.io/pk-components#FileInput)
