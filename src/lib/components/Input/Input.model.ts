import { AllHtmlAttributes } from "../../core-types"

export type TInputProps = AllHtmlAttributes<HTMLInputElement> & {
  id: string
  label?: React.ReactNode
  hint?: React.ReactNode
  feedback?: React.ReactNode
  clean?: boolean | React.ReactNode
  error?: boolean | React.ReactNode
}
