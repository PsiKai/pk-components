import { TToastAlertProps } from "./ToastAlert.model"
import "./ToastAlert.css"

export function ToastAlerts(props: TToastAlertProps) {
  return <div>{props.children}</div>
}
