import { useMemo } from "react"
import { useToastManager } from "./useToastManager"
import { TToastMethods } from "./ToastAlert.model"

export function useToastAlerts() {
  const { newToast, dismissToast, clearAllToasts } = useToastManager()

  const toast: TToastMethods = useMemo(() => {
    return {
      info: (content, options) => newToast(content, { ...options, intent: "primary" }),
      success: (content, options) => newToast(content, { ...options, intent: "success" }),
      warning: (content, options) => newToast(content, { ...options, intent: "warning" }),
      error: (content, options) => newToast(content, { ...options, intent: "danger" }),
      message: (content, options) => newToast(content, { ...options, intent: "secondary" }),
    }
  }, [newToast])

  return { toast, dismissToast, clearAllToasts, newToast }
}
