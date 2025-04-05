import { IToastAlertSyle, TAlertIntent, TToastNames, TToastOrigin } from "./ToastAlert.model"
import {
  BellOutlinedIcon,
  CheckCircleIcon,
  ErrorIcon,
  InfoOulinedIcon,
  WarningTriangleOutlineIcon,
} from "../SVG"
import { ReactNode } from "react"

export const ICON_MAP = (intent: TAlertIntent): ReactNode => {
  switch (intent) {
    case "success":
      return CheckCircleIcon()
    case "warning":
      return WarningTriangleOutlineIcon()
    case "danger":
      return ErrorIcon()
    case "primary":
      return InfoOulinedIcon()
    case "secondary":
    default:
      return BellOutlinedIcon()
  }
}

export const toastStyle = (intent: TAlertIntent, origin: TToastOrigin): IToastAlertSyle => {
  return {
    "--alert-intent": `var(--${intent})`,
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

export const methodIntentMap: Record<TToastNames, TAlertIntent> = {
  success: "success",
  error: "danger",
  warning: "warning",
  info: "primary",
  message: "secondary",
}
