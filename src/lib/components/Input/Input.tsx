import { useMemo } from "react"
import { TFeedbackProps, TInputProps } from "./Input.model"
import "./Input.css"

export function Input(props: TInputProps) {
  const { className = "", label, id, hint, feedback, clean, error, ...rest } = props

  const feedbackState = useMemo(
    () => (error ? "pk-input-error" : clean ? "pk-input-clean" : ""),
    [error, clean],
  )

  return (
    <div className="pk-input-wrapper">
      <label className="pk-input-label" htmlFor={id}>
        {label}
      </label>
      <span id={`${id}-hint`} className="pk-input-hint">
        {hint}
      </span>
      <input
        id={id}
        aria-describedby={`${id}-hint ${id}-feedback`}
        type="text"
        className={`pk-input ${feedbackState} ${className}`}
        {...rest}
      />
      <Feedback error={error} clean={clean} feedback={feedback} id={id} />
    </div>
  )
}

function Feedback({ error, clean, feedback, id }: TFeedbackProps & { id: string }) {
  return error ? (
    <span id={`${id}-feedback`} className="pk-input-feedback-error">
      {typeof error === "string" ? error : "✗ Invalid"}
    </span>
  ) : clean ? (
    <span id={`${id}-feedback`} className="pk-input-feedback-clean">
      {typeof clean === "string" ? clean : "✓ Done"}
    </span>
  ) : feedback ? (
    <span id={`${id}-feedback`} className="pk-input-feedback">
      {feedback}
    </span>
  ) : null
}
