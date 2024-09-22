import { TLoadingSpinnerProps } from "../../LoadingSpinner"
import { TButtonProps } from "../Button.model"

type TSpinnerMap = {
  [k in NonNullable<TButtonProps["fit"]>]: NonNullable<TLoadingSpinnerProps["fit"]>
}

export const spinnerSizeMap: TSpinnerMap = {
  link: "sm",
  small: "sm",
  medium: "md",
  large: "lg",
  block: "lg",
}
