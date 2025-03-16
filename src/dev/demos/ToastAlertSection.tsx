import React from "react"
import { ToastAlertProvider, useToastAlerts } from "../../lib/components/ToastAlert"
import { composePropsTableData } from "../utils/PropsTable.utils"
import { PropsTable } from "../utils/PropsTable"
import { Button } from "../../lib/components/Button"
import { TAlertIntent } from "../../lib/components/ToastAlert/ToastAlert.model"

const ToastAlertProps = composePropsTableData([])

const alertIntents: TAlertIntent[] = ["success", "warning", "danger", "primary", "secondary"]

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
          onClick={() => newToast(`Toast alert: ${intent}!`, { intent, duration: 7000 })}
        >
          {`${intent} toast`}
        </Button>
      ))}
    </div>
  )
}
