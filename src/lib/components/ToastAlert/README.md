### ToastAlertProvider

#### Description

The `ToastAlertProvider` is not a component, _per se_, but instead it is an alert system that utilizes React context to display toast alerts. It is a context provider that wraps the section of JSX that you want to display the toast alerts in. Typically you'd wrap your entire app for a single page application. Anywhere inside the <code>ToastAlertProvider</code> component, you can use the hook `useToastAlert`, which returns a object with methods for creating and managing toast alerts.

There isn't a specific component for the toast alerts themselves, but rather, the toast methods accept any `ReactNode` as a function argument, so the customization is up to you. The only core styling is the associated icon, and close button.

By default, a toast will dismiss itself after 5 seconds. You can override this by passing a new value in milliseconds to the `duration` option. Toasts will also pause their dismiss timer if they are hovered or focused within.

#### Props

The provider component takes a minimal set of props for some basic customization. The system is designed for you to inject your own JSX elements for the toast content, so the customization of the layout is on the consumer. Please see the code example for more details.

| Prop Name  | Type                                   | Required | Default     | Description                                 |
| ---------- | -------------------------------------- | -------- | ----------- | ------------------------------------------- |
| `children` | `React.ReactNode`                      | `true`   | `undefined` | The section of JSX that the Provider wraps. |
| `origin`   | `"tr" \| "tl" \| "br" \| "bl" \| "tr"` | `false`  | `"tr"`      | The origin location of the toast alerts.    |

#### Example

```tsx
import { ToastAlertProvider, useToastAlerts } from "pk-components"

export function App() {
  return (
    <ToastAlertProvider origin="br">
      <MainPage />
    </ToastAlertProvider>
  )
}

function MainPage() {
  const { toast } = useToastAlerts()

  const handleClick = () => {
    toast.success(<ToastContent />, { duration: 5000 })
  }

  return (
    <div>
      <Button onClick={handleClick}>Create a success toast</Button>
    </div>
  )
}

function ToastContent() {
  return (
    <div>
      <b>Toast success</b>
      <span>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ligula nec odio ultricies
        ultricies. Nulla facilisi.
      </span>
    </div>
  )
}
```

[Live Demo](https://psikai.github.io/pk-components#ToastAlert)
