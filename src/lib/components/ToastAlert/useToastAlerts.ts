import { useMemo } from "react"
import { useToastManager } from "./useToastManager"
import { allToastNames, allToastNamesMap, TToastMethods } from "./ToastAlert.model"

export function useToastAlerts() {
  const { newToast, dismissToast, clearAllToasts } = useToastManager()

  const toast: TToastMethods = useMemo(() => {
    return allToastNames.reduce((methods, name) => {
      methods[name] = (content, options = {}) =>
        newToast(content, { ...options, intent: allToastNamesMap[name] })
      return methods
    }, {} as TToastMethods)
  }, [newToast])

  return { toast, dismissToast, clearAllToasts, newToast }
}
