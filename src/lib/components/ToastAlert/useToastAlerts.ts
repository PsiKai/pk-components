import { useToastManager } from "./useToastManager"

export function useToastAlerts() {
  const { newToast, dismissToast, clearAllToasts } = useToastManager()

  return { newToast, dismissToast, clearAllToasts }
}
