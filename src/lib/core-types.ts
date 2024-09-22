import React from "react"

export type AllHtmlAttributes<T = HTMLElement> = React.AllHTMLAttributes<T> & {
  [key: `aria-${string}`]: string | number | boolean | null
  [key: `data-${string}`]: string | number | boolean | null
}
