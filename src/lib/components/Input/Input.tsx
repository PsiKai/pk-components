import { useMemo } from "react"
import { TFeedbackProps, TInputProps } from "./Input.model"
import "./Input.css"

export function Input(props: TInputProps) {
  const { className, label, id, hint, feedback, clean, error, ...rest } = props

  const feedbackState = useMemo(
    () => (error ? "pk-input-error" : clean ? "pk-input-clean" : ""),
    [error, clean],
  )

  return (
    <div className="pk-input-wrapper">
      <label className="pk-input-label" htmlFor={id}>
        {label}
      </label>
      <span className="pk-input-hint">{hint}</span>
      <input type="text" className={`pk-input ${feedbackState} ${className}`} {...rest} />
      <Feedback error={error} clean={clean} feedback={feedback} />
    </div>
  )
}

function Feedback({ error, clean, feedback }: TFeedbackProps) {
  return error ? (
    <span className="pk-input-feedback-error">
      {typeof error === "string" ? error : "✗ Invalid"}
    </span>
  ) : clean ? (
    <span className="pk-input-feedback-clean">{typeof clean === "string" ? clean : "✓ Done"}</span>
  ) : feedback ? (
    <span className="pk-input-feedback">{feedback}</span>
  ) : null
}
