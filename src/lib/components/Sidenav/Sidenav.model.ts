import { AllHtmlAttributes } from "../../core-types"

export type TSidenavProps = AllHtmlAttributes & {
  className?: string
  children?: React.ReactNode
  open: boolean
  handleDismiss?: (e: KeyboardEvent | React.MouseEvent<HTMLDivElement>) => void
  parent?: HTMLElement | null
  from?: "left" | "right"
}
