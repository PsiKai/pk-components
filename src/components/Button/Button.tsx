import { useMemo } from "react"
import { TButtonProps } from "./Button.model"
import { LoadingSpinner } from "../LoadingSpinner"

import "./Button.css"

export function Button(props: TButtonProps) {
  const {
    children,
    onClick,
    className,
    disabled = false,
    type = "button",
    variant = "primary",
    size = "large",
    fill = "solid",
    pending = false,
    href,
  } = props

  const classString = useMemo(() => {
    const addedClasses = (className?.split(" ") ?? []).join(" ")
    return `pk-button pk-button-${variant} pk-button-${size} ${pending ? "pk-button-progress" : ""} pk-button-${fill} ${addedClasses}`
  }, [className, variant, size, fill, pending])

  return href ? (
    <a className={classString} href={href}>
      {children}
    </a>
  ) : (
    <>
      <button className={classString} onClick={onClick} disabled={disabled || pending} type={type}>
        {children}
        {pending && <LoadingSpinner size={size} />}
      </button>
    </>
  )
}
