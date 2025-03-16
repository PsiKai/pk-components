import { IToastAlertSyle, TAlertIntent, TToastOrigin } from "./ToastAlert.model"

export const ICON_MAP = (intent: TAlertIntent) => {
  switch (intent) {
    case "success":
      return "check-circle"
    case "warning":
      return "exclamation-triangle"
    case "danger":
      return "ban"
    case "primary":
      return "info-circle"
    case "secondary":
      return "info-circle"
    default:
      return "bell"
  }
}

export const toastStyle = (intent: TAlertIntent, origin: TToastOrigin): IToastAlertSyle => {
  return {
    "--alert-intent": `var(--${intent || "primary"})`,
    "--alert-origin": originCalculation(origin),
  }
}

export const originCalculation = (origin: TToastOrigin) => {
  switch (origin) {
    case "tl":
    case "bl":
      return "-200% 0"
    case "tr":
    case "br":
    default:
      return "200% 0"
  }
}
