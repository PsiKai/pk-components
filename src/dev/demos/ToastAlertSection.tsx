import React from "react"
import { ToastAlertProvider, useToastAlerts } from "../../lib/components/ToastAlert"
import { composePropsTableData } from "../utils/PropsTable.utils"
import { PropsTable } from "../utils/PropsTable"
import { Button } from "../../lib/components/Button"
import { TAlertIntent, TToastNames } from "../../lib/components/ToastAlert/ToastAlert.model"

const ToastAlertProviderProps = composePropsTableData([
  ["children", "React.ReactNode", "undefined", "The section of JSX that the Provider wraps."],
  ["origin", '"tr" | "tl" | "br" | "bl"', '"tr"', "The origin location of the toast alerts."],
])

const customToastHookValues = composePropsTableData([
  ["toast", "TToastMethods", "An object containing individual methods for each toast type."],
  ["dismissToast", "(toastId: string) => void", "Dismisses a toast alert based on the ID."],
  ["clearAllToasts", "() => void", "Clears all toast alerts."],
  [
    "newToast",
    "(content: React.ReactNode, options: TToastOptions) => void",
    "Alternative method for creating a new toast alert.",
  ],
])

const toastTypeDefinitions = composePropsTableData([
  [
    "TToastNames",
    '"info" | "message" | "success" | "warning" | "error"',
    "The named toast methods.",
  ],
  [
    "TToastOptions",
    "{ intent: TAlertIntent, duration: number }",
    "The options object for the newToast method. Duration is the number of milliseconds before the toast dismisses itself.",
  ],
  [
    "TToastMethods",
    "Record<TToastNames,\n (content: ReactNode,\n  options: TNewToastOptions) => string\n>",
    "The toast object methods. Each key is a named toast method that returns a toast ID.",
  ],
  [
    "TAlertIntent",
    '"primary" | "secondary" | "success" | "warning" | "danger"',
    "The intent of the toast alert. Note, these are different than the named toast methods.",
  ],
])

const alertIntents: TAlertIntent[] = ["primary", "secondary", "success", "warning", "danger"]
const intentNameMap: Record<TAlertIntent, TToastNames> = {
  primary: "info",
  secondary: "message",
  success: "success",
  warning: "warning",
  danger: "error",
}

export const ToastAlertSection = () => {
  return (
    <div className="section-wrapper">
      <h2 id="ToastAlert" className="section-header">
        <code>ToastAlertProvider</code>
      </h2>
      <section>
        <div className="sub-section">
          <h3>Usage</h3>
          <div>
            <p>
              The <code>ToastAlertProvider</code> is not a component, <em>per se</em>, but instead
              it is an alert system that utilizes React context to display toast alerts. It is a
              context provider that wraps the section of JSX that you want to display the toast
              alerts in. Typically you'd wrap your entire app for a single page application.
              Anywhere inside the <code>ToastAlertProvider</code> component, you can use the hook{" "}
              <code>useToastAlert</code>, which returns a object with methods for creating and
              managing toast alerts.
            </p>
            <p>
              There isn't a specific component for the toast alerts themselves, but rather, the
              toast methods accept any <code>ReactNode</code> as a function argument, so the
              customization is up to you. The only core styling is the associated icon, and close
              button.
            </p>
            <p>
              By default, a toast will dismiss itself after 5 seconds. You can override this by
              passing a new value in milliseconds to the <code>duration</code> option. Toasts will
              also pause their dismiss timer if they are hovered or focused within.
            </p>
          </div>
          <h3 className="sub-section-header">
            <code>ToastAlertProvider</code>&nbsp;Props
          </h3>
          <PropsTable rows={ToastAlertProviderProps} />
          <h3 className="sub-section-header">
            <code>useToastAlert</code>&nbsp;Hook Return Values
          </h3>
          <PropsTable rows={customToastHookValues} />
          <h3 className="sub-section-header">Types Reference</h3>
          <PropsTable rows={toastTypeDefinitions} />
        </div>
        <div className="sub-section">
          <h3 className="sub-section-header">Example code</h3>
          <ExampleCode />
        </div>
        <div className="sub-section">
          <h3>Toast examples</h3>
          <h4>Top right (default)</h4>
          <ToastAlertProvider origin="tr">
            <ToastTriggers />
          </ToastAlertProvider>
          <h4>Top left</h4>
          <ToastAlertProvider origin="tl">
            <ToastTriggers />
          </ToastAlertProvider>
          <h4>Bottom left</h4>
          <ToastAlertProvider origin="bl">
            <ToastTriggers />
          </ToastAlertProvider>
          <h4>Bottom right</h4>
          <ToastAlertProvider origin="br">
            <ToastTriggers />
          </ToastAlertProvider>
        </div>
      </section>
    </div>
  )
}

function ToastTriggers() {
  const { newToast } = useToastAlerts()

  return (
    <div className="section-group">
      {alertIntents.map(intent => (
        <Button
          key={intent}
          fit="small"
          variant={intent}
          onClick={() =>
            newToast(<ToastContent toastName={intentNameMap[intent]} />, { intent, duration: 7000 })
          }
        >
          {`${intentNameMap[intent]} toast`}
        </Button>
      ))}
    </div>
  )
}

function ToastContent({ toastName }: { toastName: TToastNames }) {
  return (
    <div>
      <b>Toast {toastName}</b>
      <br />
      <span>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ligula nec odio ultricies
        ultricies. Nulla facilisi.
      </span>
    </div>
  )
}

function ExampleCode() {
  return (
    <code className="block">
      {`import { ToastAlertProvider, useToastAlerts } from "pk-components";

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
      <Button onClick={handleClick}>
        Create a success toast
      </Button>
    </div>
  )
}

function ToastContent() {
  return (
    <div>
      <b>Toast success</b>
      <span>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed ac ligula nec odio ultricies ultricies. Nulla facilisi.
      </span>
    </div>
  )
}`}
    </code>
  )
}
