import { TLoadingSpinnerProps } from "./LoadingSpinner.model"
import "./LoadingSpinner.css"
import { useMemo } from "react"
import { sizeMap, spinnerDotCountMap, spinnerDotSizeMap } from "./utils/spinner-dimensions"
import { circlePointPosition } from "./utils/geometry"

export function LoadingSpinner(props: TLoadingSpinnerProps) {
  const { size = "medium" } = props

  const dots = useMemo(() => Array.from({ length: spinnerDotCountMap[size] }, (_, i) => i), [size])
  const height = useMemo(() => sizeMap[size], [size])
  const dotSize = useMemo(() => spinnerDotSizeMap[size], [size])

  return (
    <div className="pk-loading-spinner" role="progressbar">
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
            />
          )
        })}
      </div>
    </div>
  )
}
