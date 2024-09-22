import React from "react"
import { AllHtmlAttributes } from "../../core-types"

export type TButtonProps = AllHtmlAttributes<HTMLButtonElement | HTMLAnchorElement> & {
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary" | "success" | "warning" | "danger"
  fit?: "small" | "medium" | "large" | "block" | "link"
  fill?: "solid" | "outline"
  pending?: boolean
  href?: string
}
