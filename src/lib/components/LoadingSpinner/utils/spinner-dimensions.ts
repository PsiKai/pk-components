import { TLoadingSpinnerProps } from "../LoadingSpinner.model"

type TSpinnerMap = { [K in NonNullable<TLoadingSpinnerProps["fit"]>]: number }

/**
 * Map of spinner sizes to their dimensions.
 * Numbers are in pixels and represent the width and height of the spinner.
 */
export const sizeMap: TSpinnerMap = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 28,
  xl: 36,
}

/**
 * Map of spinner sizes to the size of the dots.
 * Numbers are in pixels and represent the width and height of the dots.
 */
export const spinnerDotSizeMap: TSpinnerMap = {
  xs: 3,
  sm: 4,
  md: 4,
  lg: 5,
  xl: 8,
}

/**
 * Map of spinner sizes to the number of dots.
 */
export const spinnerDotCountMap: TSpinnerMap = {
  xs: 6,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 14,
}
