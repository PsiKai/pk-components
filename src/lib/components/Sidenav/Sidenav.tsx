import { useCallback, useEffect, useMemo } from "react"
import { TSidenavProps } from "./Sidenav.model"
import "./Sidenav.css"

export function Sidenav(props: TSidenavProps) {
  const {
    children,
    className = "",
    open,
    handleDismiss = () => { },
    parent = document.documentElement,
    from = "left",
    ...rest
  } = props

  const classNames = useMemo(
    () => `pk-sidenav pk-sidenav-from-${from} ${open ? "pk-sidenav-open" : ""} ${className}`,
    [open, from, className],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleDismiss(e)
      }
    },
    [handleDismiss],
  )

  useEffect(() => {
    if (!parent) return

    if (open) {
      parent.style.overflow = "hidden"
      parent.style.scrollbarGutter = "stable"
    } else {
      parent.style.overflow = ""
    }
  }, [open, parent])

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown)
    } else {
      document.removeEventListener("keydown", handleKeyDown)
    }

    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, handleKeyDown])

  return (
    <>
      <nav className={classNames} data-testid="pk-sidenav" aria-hidden={!open} {...rest}>
        {children}
      </nav>
      <div
        onClick={handleDismiss}
        className={`pk-sidenav-backdrop ${open ? "pk-sidenav-backdrop-appear" : ""}`}
        aria-hidden
        data-testid="pk-sidenav-backdrop"
      />
    </>
  )
}
