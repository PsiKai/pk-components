import { AllHtmlAttributes } from "../../core-types"

export type TButtonProps = AllHtmlAttributes<HTMLButtonElement | HTMLAnchorElement> & {
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary" | "success" | "warning" | "danger"
  fit?: "small" | "medium" | "large" | "block" | "link"
  fill?: "solid" | "outline"
  pending?: boolean
}
