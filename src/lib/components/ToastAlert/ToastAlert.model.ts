import { ReactNode } from "react"
import { AllHtmlAttributes } from "../../core-types"

export type TToastAlertProps = AllHtmlAttributes & {
  className?: string
}

export interface IToastAlertSyle extends React.CSSProperties {
  "--alert-intent": `var(--${TAlert["intent"]})`
  "--alert-origin": string
}

export type TAlertIntent = "success" | "warning" | "danger" | "primary" | "secondary"

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

export type TToastOrigin = "tr" | "tl" | "br" | "bl"

export type TToastAlertProviderProps = {
  children: ReactNode
  origin?: TToastOrigin
}

export type TToastNames = "info" | "success" | "warning" | "error" | "message"
export type TToastMethods = Record<
  TToastNames,
  (content: TAlert["content"], options: TNewToastOptions) => string
>
