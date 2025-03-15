import { MouseEventHandler, useCallback, useMemo } from "react"
import { TToastAlertProps } from "./ToastAlert.model"
import { useToastManager } from "./useToastManager"
import { ICON_MAP, toastStyle } from "./ToastAlert.utils"
import "./ToastAlert.css"

export function ToastAlerts(props: TToastAlertProps) {
  const { toastAlerts, dismissToast, removeToastTimeout, resumeToastTimeout } = useToastManager()

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = useCallback(
    e => removeToastTimeout(e.currentTarget.dataset.alertid),
    [removeToastTimeout],
  )

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = useCallback(
    e => resumeToastTimeout(e.currentTarget.dataset.alertid),
    [resumeToastTimeout],
  )

  const className = useMemo(
    () => `alert-toast colored${props.className ? ` ${props.className}` : ""}`,
    [props.className],
  )

  return (
    <div className="toast-container">
      {toastAlerts.map(toast => (
        <div
          key={toast.id}
          data-toastid={toast.id}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={className} role="toast" style={toastStyle(toast.intent)}>
            <i className={`fa fa-${ICON_MAP(toast.intent)}`} aria-hidden="true"></i>

            <span className="toast-content">{toast.content}</span>
            <button className="toast-dismiss" onClick={() => dismissToast(toast.id)}>
              <i className="fa fa-times-circle"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
