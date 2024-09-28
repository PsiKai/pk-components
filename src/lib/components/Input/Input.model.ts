import { AllHtmlAttributes } from "../../core-types"

export type TInputProps = AllHtmlAttributes<HTMLInputElement> & {
  hint?: string
  label?: string
  id: string
} & TFeedbackProps

export type TFeedbackProps = {
  feedback?: string
  clean?: boolean | string
  error?: boolean | string
}
