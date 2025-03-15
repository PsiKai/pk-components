import { createContext, useReducer, ReactNode } from "react"
import { TAlertAction, TAlertContext, TAlertReducerState } from "./ToastAlert.model"
import { ToastAlerts } from "./ToastAlert"

const initialAlertContext: TAlertContext = {
  toastAlerts: [],
  dispatch: () => { },
}

export const AlertContext = createContext(initialAlertContext)

export function ToastAlertProvider({ children }: { children: ReactNode }) {
  const [toastAlerts, dispatch] = useReducer(AlertsReducer, [])

  return (
    <AlertContext.Provider value={{ toastAlerts, dispatch }}>
      {children}
      <ToastAlerts />
    </AlertContext.Provider>
  )
}

function AlertsReducer(state: TAlertReducerState, action: TAlertAction) {
  switch (action.type) {
    case "NEW_ALERT":
      return [...state, action.payload]
    case "REMOVE_ALERT":
      return state.filter(alert => alert.id !== action.payload.id)
    case "UPDATE_ALERT": {
      return state.map(alert =>
        alert.id === action.payload.id ? { ...alert, ...action.payload } : alert,
      )
    }
    case "CLEAR_ALERTS":
      return []
    default:
      return state
  }
}
