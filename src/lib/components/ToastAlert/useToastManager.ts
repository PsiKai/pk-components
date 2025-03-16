import { useCallback, useContext, useMemo } from "react"
import { AlertContext } from "./ToastAlertProvider"
import { TAlert, TNewToastOptions } from "./ToastAlert.model"
import { originCalculation } from "./ToastAlert.utils"

export function useToastManager() {
  const { dispatch, toastAlerts, origin } = useContext(AlertContext)

  const defaultDuration = useMemo(() => 7000, [])
  const defaultIntent = useMemo(() => "primary" as const, [])
  const originTranslate = useMemo(() => originCalculation(origin), [origin])

  const removeToastTimeout = useCallback(
    (id: TAlert["id"] | undefined) => {
      const alert = toastAlerts.find(alert => alert.id === id)
      clearTimeout(alert?.timeout)
    },
    [toastAlerts],
  )

  const dismissToast = useCallback(
    (id: TAlert["id"]) => {
      const alert = document.querySelector(`[data-toastid="${id}"]`)
      if (!alert) return

      removeToastTimeout(id)
      const slideFrames = new KeyframeEffect(alert, [{ translate: originTranslate }], {
        duration: 200,
        easing: "ease",
        fill: "forwards",
      })

      const { height } = alert.getBoundingClientRect()
      const collapseFrames = new KeyframeEffect(
        alert,
        [{ maxHeight: `${height}px` }, { maxHeight: "0" }],
        { duration: 100, easing: "ease-in", fill: "forwards" },
      )
      const slideAnimation = new Animation(slideFrames, document.timeline)
      const collapseAnimation = new Animation(collapseFrames, document.timeline)
      slideAnimation.play()
      slideAnimation.onfinish = () => {
        collapseAnimation.play()
      }
      collapseAnimation.onfinish = () => {
        dispatch({ type: "REMOVE_ALERT", payload: { id } })
      }
    },
    [dispatch, removeToastTimeout, originTranslate],
  )

  const clearAllToasts = useCallback(() => {
    for (const alert of toastAlerts) {
      removeToastTimeout(alert.id)
    }
    dispatch({ type: "CLEAR_ALERTS" })
  }, [toastAlerts, dispatch, removeToastTimeout])

  const setAlertTimeout = useCallback(
    (id: TAlert["id"], timer?: number) => {
      return setTimeout(() => {
        requestAnimationFrame(() => dismissToast(id))
      }, timer ?? defaultDuration)
    },
    [dismissToast, defaultDuration],
  )

  const newToast = useCallback(
    (content: TAlert["content"], options: TNewToastOptions = {}) => {
      const id = Math.random().toString(36).slice(2)
      const timeout = setAlertTimeout(id, options.duration ?? defaultDuration)
      const intent = options.intent ?? defaultIntent

      dispatch({ type: "NEW_ALERT", payload: { id, content, intent, timeout } })

      return id
    },
    [setAlertTimeout, defaultDuration, defaultIntent, dispatch],
  )

  const resumeToastTimeout = useCallback(
    (id: TAlert["id"] | undefined, timer?: number) => {
      if (!id) return

      const timeout = setAlertTimeout(id, timer ?? 4000)
      dispatch({ type: "UPDATE_ALERT", payload: { id, timeout } })
    },
    [dispatch, setAlertTimeout],
  )

  return {
    newToast,
    dismissToast,
    toastAlerts,
    removeToastTimeout,
    resumeToastTimeout,
    clearAllToasts,
    origin,
  }
}
