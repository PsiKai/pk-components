import { ReactNode } from "react"
import { AllHtmlAttributes } from "../../core-types"

export type TToastAlertProps = AllHtmlAttributes & {
  className?: string
}

export interface IToastAlertSyle extends React.CSSProperties {
  "--alert-intent": `var(--${TAlert["intent"]})`
  "--alert-origin": string
}

export const allIntents = ["success", "warning", "danger", "primary", "secondary"] as const
export type TAlertIntent = (typeof allIntents)[number]

export type TAlert = {
  id: string
  intent: TAlertIntent
  content: ReactNode
  timeout: NodeJS.Timeout
}

export type TAlertReducerState = TAlert[]

export type TAlertContext = {
  toastAlerts: TAlertReducerState
  dispatch: React.Dispatch<TAlertAction>
  origin: TToastOrigin
}

export type TAlertAction =
  | { type: "NEW_ALERT"; payload: TAlert }
  | { type: "REMOVE_ALERT"; payload: Pick<TAlert, "id"> }
  | { type: "UPDATE_ALERT"; payload: Pick<TAlert, "id" | "timeout"> }
  | { type: "CLEAR_ALERTS" }

export type TNewToastOptions = {
  intent?: TAlert["intent"]
  duration?: number
}

export const allToastOrigins = ["tr", "tl", "br", "bl"] as const
export type TToastOrigin = (typeof allToastOrigins)[number]

export type TToastAlertProviderProps = {
  children: ReactNode
  origin?: TToastOrigin
}

export const allToastNames = ["info", "success", "warning", "error", "message"] as const
export type TToastNames = (typeof allToastNames)[number]
export const allToastNamesMap: Record<TToastNames, TAlertIntent> = {
  info: "primary",
  success: "success",
  warning: "warning",
  error: "danger",
  message: "secondary",
}
export type TToastMethods = Record<
  TToastNames,
  (content: TAlert["content"], options?: TNewToastOptions) => string
>
