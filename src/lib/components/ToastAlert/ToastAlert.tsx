import { FocusEventHandler, MouseEventHandler, useCallback, useMemo } from "react"
import { TToastAlertProps } from "./ToastAlert.model"
import { useToastManager } from "./useToastManager"
import { ICON_MAP, toastStyle } from "./ToastAlert.utils"
import { CloseIcon } from "../SVG"
import { Button } from "../Button"
import "./ToastAlert.css"

export function ToastAlerts(props: TToastAlertProps) {
  const { toastAlerts, dismissToast, removeToastTimeout, resumeToastTimeout, origin } =
    useToastManager()

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = useCallback(
    e => removeToastTimeout(e.currentTarget.dataset.toastid),
    [removeToastTimeout],
  )

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = useCallback(
    e => resumeToastTimeout(e.currentTarget.dataset.toastid),
    [resumeToastTimeout],
  )

  const handleFocusWithin: FocusEventHandler<HTMLDivElement> = useCallback(
    e => removeToastTimeout(e.currentTarget.dataset.toastid),
    [removeToastTimeout],
  )

  const handleBlur: FocusEventHandler<HTMLDivElement> = useCallback(
    e => resumeToastTimeout(e.currentTarget.dataset.toastid),
    [resumeToastTimeout],
  )

  const className = useMemo(
    () => `pk-toast-alert${props.className ? ` ${props.className}` : ""}`,
    [props.className],
  )

  return (
    <div className={`pk-toast-container ${origin}`}>
      {toastAlerts.map(toast => (
        <div
          key={toast.id}
          data-toastid={toast.id}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocusWithin}
          onBlur={handleBlur}
          style={toastStyle(toast.intent, origin)}
        >
          <div className={className} role="toast">
            <i className="pk-toast-icon">{ICON_MAP(toast.intent)}</i>
            {toast.content}
            <Button
              variant="secondary"
              fit="small"
              onClick={() => dismissToast(toast.id)}
              className="pk-toast-dismiss"
              aria-label="Remove Toast"
            >
              <CloseIcon />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
