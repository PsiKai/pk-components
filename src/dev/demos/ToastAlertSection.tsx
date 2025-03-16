import React from "react"
import { ToastAlertProvider, useToastAlerts } from "../../lib/components/ToastAlert"
import { composePropsTableData } from "../utils/PropsTable.utils"
import { PropsTable } from "../utils/PropsTable"
import { Button } from "../../lib/components/Button"
import { TAlertIntent, TToastNames } from "../../lib/components/ToastAlert/ToastAlert.model"

const ToastAlertProps = composePropsTableData([])

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
        <code>ToastAlert</code>
      </h2>
      <section>
        <div className="sub-section">
          <h3 className="sub-section-header">Props</h3>
          <PropsTable rows={ToastAlertProps} />
        </div>
        <div className="sub-section">
          <h3>From top left</h3>
          <ToastAlertProvider origin="tl">
            <ToastTriggers />
          </ToastAlertProvider>
          <h3>From top right</h3>
          <ToastAlertProvider origin="tr">
            <ToastTriggers />
          </ToastAlertProvider>
          <h3>From bottom left</h3>
          <ToastAlertProvider origin="bl">
            <ToastTriggers />
          </ToastAlertProvider>
          <h3>From bottom right</h3>
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
          fit="link"
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
