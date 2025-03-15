import { IToastAlertSyle, TAlertIntent } from "./ToastAlert.model"

export const ICON_MAP = (intent: TAlertIntent) => {
  switch (intent) {
    case "success":
      return "check-circle"
    case "warning":
      return "exclamation-triangle"
    case "danger":
      return "ban"
    case "info":
      return "info-circle"
    default:
      return "bell"
  }
}

export const toastStyle = (intent: TAlertIntent): IToastAlertSyle => {
  return {
    "--alert-intent": `var(--${intent || "primary"})`,
  }
}
