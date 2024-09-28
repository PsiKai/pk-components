import { useMemo } from "react"
import { TInputProps } from "./Input.model"
import "./Input.css"

export function Input(props: TInputProps) {
  const { className = "", label, id, hint, feedback, clean, error, ...rest } = props

  const isError = useMemo(() => error || typeof error === "string", [error])
  const isClean = useMemo(() => clean || typeof clean === "string", [clean])

  const feedbackState = useMemo(
    () => (isError ? "error" : isClean ? "clean" : "default"),
    [isError, isClean],
  )

  const feedbackText = useMemo(() => {
    if (isError) {
      return typeof error === "string" ? error : "✗ Invalid"
    }
    if (isClean) {
      return typeof clean === "string" ? clean : "✓ Done"
    }
    return feedback || ""
  }, [isError, isClean, error, clean, feedback])

  const inputClassNames = useMemo(() => {
    return `pk-input pk-input-${feedbackState} ${className}`
  }, [feedbackState, className])

  const feedbackClassName = useMemo(() => {
    return `pk-input-feedback-${feedbackState}`
  }, [feedbackState])

  const ariaInvalid = useMemo(() => (isError ? { "aria-invalid": true } : {}), [isError])

  const labelClassNames = useMemo(() => {
    return `pk-input-label ${props.required ? "label-required" : ""}`
  }, [props.required])

  return (
    <div className="pk-input-wrapper">
      <label className={labelClassNames} htmlFor={id}>
        {label}
      </label>
      <span id={`${id}-hint`} className="pk-input-hint">
        {hint}
      </span>
      <input
        id={id}
        aria-describedby={`${id}-hint ${id}-feedback`}
        type="text"
        className={inputClassNames}
        {...ariaInvalid}
        {...rest}
      />
      <span id={`${id}-feedback`} className={feedbackClassName}>
        {feedbackText}
      </span>
    </div>
  )
}
