import React from "react"
import { ToastAlert } from "../../lib/components/ToastAlert"
import { composePropsTableData } from "../utils/PropsTable.utils"
import { PropsTable } from "../utils/PropsTable"

const ToastAlertProps = composePropsTableData([])

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
          <h3>Example</h3>
          <ToastAlert />
        </div>
      </section>
    </div>
  )
}
