import { AllHtmlAttributes } from "../../core-types"

export type TInputProps = AllHtmlAttributes<HTMLInputElement> & {
  id: string
  label?: string
  hint?: string
  feedback?: string
  clean?: boolean | string
  error?: boolean | string
}
