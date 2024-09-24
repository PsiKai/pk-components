import { AllHtmlAttributes } from "../../core-types"

export type TInputProps = AllHtmlAttributes & {
  // className?: string
  // children?: React.ReactNode
  // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  hint?: string
  label?: string
  id: string
} & TFeedbackProps

export type TFeedbackProps = {
  feedback?: string
  clean?: boolean | string
  error?: boolean | string
}
