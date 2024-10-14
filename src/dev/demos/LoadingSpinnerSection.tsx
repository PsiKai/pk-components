import React, { ReactNode, useMemo } from "react"
import { LoadingSpinner, TLoadingSpinnerProps } from "../../lib/components/LoadingSpinner"
import { PropsTable } from "../utils/PropsTable"
import { composePropsTableData } from "../utils/PropsTable.utils"
import { Input } from "../../lib/components/Input"

const loadingSpinnerProps = composePropsTableData([
  ["fit", '"xs" | "sm" | "md" | "lg" | "xl"', '"md"', "Size of the spinner."],
  [
    "backdrop",
    "boolean",
    "true",
    "Show a backdrop behind the spinner. Backdrop takes up all available space.",
  ],
])

const spinnerSizes = ["xs", "sm", "md", "lg", "xl"] as TLoadingSpinnerProps["fit"][]

export function LoadingSpinnerSection() {
  return (
    <section>
      <div className="sub-section">
        <h3 className="sub-section-header">Props</h3>
        <PropsTable rows={loadingSpinnerProps} />
      </div>
      <div className="sub-section">
        <h3>Basic Spinner</h3>
        <div className="spinner-container">
          <p>The spinner and the backdrop overlay the content...</p>
          <LoadingSpinner />
        </div>
      </div>
      <hr />
      <div className="sub-section">
        <h3>Fit Variants</h3>
        <div className="section-group">
          {spinnerSizes.map(fit => (
            <div key={fit} className="spinner-container">
              <span>{fit}</span>
              <LoadingSpinner fit={fit} />
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className="sub-section">
        <h3>No Backdrop</h3>
        <div className="spinner-container">
          <div className="section-group">
            <span>
              The spinner is inline with the content <LoadingSpinner backdrop={false} fit="sm" />
            </span>
          </div>
        </div>
      </div>
      <hr />
      <div className="sub-section">
        <h3>Embedded in components</h3>
        <SpinnerInInput />
      </div>
    </section>
  )
}

function SpinnerInInput() {
  const feedbackTypes = useMemo(
    () => ({
      invalid: { error: "Username is taken!" },
      valid: { clean: "Username is available!" },
      default: { feedback: "Must be unique!" },
      pending: { feedback: <LoadingSpinner fit="xs" backdrop={false} /> },
    }),
    [],
  )

  const [inputValue, setInputValue] = React.useState("")
  const [feedbackState, setFeedbackState] = React.useState<Record<string, ReactNode>>(
    feedbackTypes.default,
  )
  const activeTimer = React.useRef<NodeJS.Timeout | null>(null)
  const activeThrottle = React.useRef<NodeJS.Timeout | null>(null)

  const fakeSearch = React.useCallback(async () => {
    setFeedbackState(feedbackTypes.pending)
    await new Promise(resolve => {
      if (activeTimer.current) clearTimeout(activeTimer.current)
      activeTimer.current = setTimeout(resolve, 1000)
    })
    setFeedbackState(Math.random() > 0.5 ? feedbackTypes.valid : feedbackTypes.invalid)
  }, [feedbackTypes])

  const onChange = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
      if (!e.target.value) {
        if (activeTimer.current) clearTimeout(activeTimer.current)
        if (activeThrottle.current) clearTimeout(activeThrottle.current)
        setFeedbackState(feedbackTypes.default)
        return
      }

      if (activeThrottle.current) clearTimeout(activeThrottle.current)
      activeThrottle.current = setTimeout(fakeSearch, 500)
      setFeedbackState(feedbackTypes.default)
    },
    [feedbackTypes, fakeSearch],
  )

  return (
    <Input
      id="loading-spinner-input"
      label="Choose your Username"
      onChange={onChange}
      value={inputValue}
      {...feedbackState}
    />
  )
}
