import { TLoadingSpinnerProps } from "../LoadingSpinner.model"

export const sizeMap: { [K in TLoadingSpinnerProps["size"] as string]: number } = {
  small: 16,
  medium: 20,
  large: 28,
  block: 28,
  link: 20,
}

export const spinnerDotSizeMap: { [K in TLoadingSpinnerProps["size"] as string]: number } = {
  small: 4,
  medium: 4,
  large: 5,
  block: 5,
  link: 4,
}

export const spinnerDotCountMap: { [K in TLoadingSpinnerProps["size"] as string]: number } = {
  small: 6,
  medium: 8,
  large: 10,
  block: 10,
  link: 6,
}
