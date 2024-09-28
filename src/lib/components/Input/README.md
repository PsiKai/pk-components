### Input Component

#### Description

A text input based component. Complete with accessible label, hint, and feedback text. Styled with color coordinated custom feedback states, and indications for required, disabled, and readonly native states. All html attributes accepted by an input element can be passed through, allowing for granular control over the input behavior and validation.

#### States

- Default
- Clean
- Error

Default state shows the `feedback` text, if any, and shows no additional styles on the element.

A clean state is shown if the `clean` prop has a string or true boolean value. A boolean true value will render the default text, while a string will override this. Pass an empty string to trigger the clean state styles with no feedback text. The default feedback text will not display.

An error state is shown if the `error` props has a string or true boolean values. A boolean true value will render the default text, while a string will override this. Pass an empty string to trigger the error state styles with no feedback text. Neither the default feedback text or the clean feedback text will display.

- Required

A red asterisk is prepended to the label text as the main indicator, but the input itself has an increased left border as further demarcation.

- Read Only
- Disabled

Both given muted styles to indicate a lack of interactivity.

#### Props

| Prop Name          | Type                                    | Required | Default     | Description                                                                                  |
| ------------------ | --------------------------------------- | -------- | ----------- | -------------------------------------------------------------------------------------------- |
| `[htmlAttributes]` | `React.AllHTMLAttributes<InputElement>` | No       | `undefined` | Any valid HTML attribute for an input element.                                               |
| `className`        | `string`                                | No       | `undefined` | Additional class names to apply to the input element.                                        |
| `id`               | `string`                                | Yes      | `undefined` | Id attribute assigned to the input element. Required to create an accessible label.          |
| `label`            | `string`                                | No       | `undefined` | The accessble label to be associatied with the input. Not required but strongly recommended. |
| `hint`             | `string`                                | No       | `undefined` | Smaller hint text to go under the label.                                                     |
| `feedback`         | `string`                                | No       | `undefined` | Custom informative feedback about the input requirements under the element.                  |
| `error`            | `string \| boolean`                     | No       | `undefined` | Custom or default error feedback under the element.                                          |
| `clean`            | `string \| boolean`                     | No       | `undefined` | Custom or default success feedback under the element.                                        |

#### Example

```tsx
import { Input } from "pk-components"

function YourComponent() {
  const [value, setValue] = React.useState("")

  const onChange = (e: React.ChangeEvent) => {
    setValue(e.target.value)
  }

  return (
    <Input
      id="example-input"
      label="Your content here"
      hint="Your customized input"
      feedback="You'll love this input"
      onChange={onChange}
      value={value}
    />
  )
}
```

[Live Demo](https://psikai.github.io/pk-components#Input)
