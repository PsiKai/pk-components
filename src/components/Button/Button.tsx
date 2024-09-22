import { useMemo } from "react"
import { TButtonProps } from "./Button.model"
import { LoadingSpinner } from "../LoadingSpinner"
import "./Button.css"
import { spinnerSizeMap } from "./utils/spinner-map"

export function Button(props: TButtonProps) {
  const {
    children,
    className,
    disabled = false,
    type = "button",
    variant = "primary",
    fit = "large",
    fill = "solid",
    pending = false,
    href,
    ...rest
  } = props

  const classString = useMemo(() => {
    const addedClasses = (className?.split(" ") ?? []).join(" ")
    return `pk-button pk-button-${variant} pk-button-${fit} ${pending ? "pk-button-progress" : ""} pk-button-${fill} ${addedClasses}`
  }, [className, variant, fit, fill, pending])

  return href ? (
    <a className={classString} href={href} {...rest}>
      {children}
    </a>
  ) : (
    <button className={classString} disabled={disabled || pending} type={type} {...rest}>
      {children}
      {pending && <LoadingSpinner fit={spinnerSizeMap[fit]} />}
    </button>
  )
}
