import React from "react"

export type TButtonProps = {
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary" | "success" | "warning" | "danger"
  size?: "small" | "medium" | "large" | "block" | "link"
  fill?: "solid" | "outline"
  pending?: boolean
  href?: string
}
