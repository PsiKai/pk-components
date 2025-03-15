import { ReactNode } from "react"
import { AllHtmlAttributes } from "../../core-types"

export type TToastAlertProps = AllHtmlAttributes & {
  className?: string
  children?: React.ReactNode
}

export type TAlertIntent = "info" | "success" | "warning" | "error"

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
