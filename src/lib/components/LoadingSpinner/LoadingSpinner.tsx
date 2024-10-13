import { useMemo } from "react"
import { TLoadingSpinnerProps } from "./LoadingSpinner.model"
import { sizeMap, spinnerDotCountMap, spinnerDotSizeMap } from "./utils/spinner-dimensions"
import { circlePointPosition } from "./utils/geometry"
import "./LoadingSpinner.css"

export function LoadingSpinner(props: TLoadingSpinnerProps) {
  const { fit = "md", backdrop = true, ...rest } = props

  const dots = useMemo(() => Array.from({ length: spinnerDotCountMap[fit] }, (_, i) => i), [fit])
  const height = useMemo(() => sizeMap[fit], [fit])
  const dotSize = useMemo(() => spinnerDotSizeMap[fit], [fit])

  const classNames = useMemo(() => {
    return `pk-loading-spinner ${backdrop ? "pk-loading-spinner-backdrop" : ""}`
  }, [backdrop])

  return (
    <div className={classNames} role="progressbar">
      <div className="pk-loading-spinner-inner" style={{ height: `${height}px` }}>
        {dots.map(i => {
          const { x, y } = circlePointPosition(height, dots.length, i)
          return (
            <div
              data-testid="pk-loading-spinner-dot"
              key={i}
              style={{
                transform: `translate(${x - dotSize / 2}px, ${y - dotSize / 2}px)`,
                height: `${dotSize}px`,
              }}
              className="pk-loading-spinner-dot"
              {...rest}
            />
          )
        })}
      </div>
    </div>
  )
}
