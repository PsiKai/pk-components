import { TLoadingSpinnerProps } from "../LoadingSpinner.model"

type TSpinnerMap = { [K in TLoadingSpinnerProps["fit"] as string]: number }

/**
 * Map of spinner sizes to their dimensions.
 * Numbers are in pixels and represent the width and height of the spinner.
 */
export const sizeMap: TSpinnerMap = {
  small: 16,
  medium: 20,
  large: 28,
  block: 28,
  link: 20,
}

/**
 * Map of spinner sizes to the size of the dots.
 * Numbers are in pixels and represent the width and height of the dots.
 */
export const spinnerDotSizeMap: TSpinnerMap = {
  small: 4,
  medium: 4,
  large: 5,
  block: 5,
  link: 4,
}

/**
 * Map of spinner sizes to the number of dots.
 */
export const spinnerDotCountMap: TSpinnerMap = {
  small: 6,
  medium: 8,
  large: 10,
  block: 10,
  link: 6,
}
