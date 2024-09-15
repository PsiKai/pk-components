import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import { LoadingSpinner } from "./LoadingSpinner"
import { sizeMap, spinnerDotCountMap, spinnerDotSizeMap } from "./utils/spinner-dimensions"

describe("LoadingSpinner", () => {
  it("should render the component", () => {
    render(<LoadingSpinner />)
    const loadingSpinner = screen.getByRole("progressbar")
    expect(loadingSpinner).toBeInTheDocument()
  })

  for (const size of ["small", "medium", "large"] as const) {
    describe(`with size ${size}`, () => {
      beforeEach(() => {
        render(<LoadingSpinner size={size} />)
      })

      it("should display the correct number of dots", () => {
        const dots = screen.getAllByTestId("pk-loading-spinner-dot")
        expect(dots).toHaveLength(spinnerDotCountMap[size])
      })

      it("should display the correct size of dots", () => {
        const dots = screen.getAllByTestId("pk-loading-spinner-dot")
        for (const dot of dots) {
          expect(dot).toHaveStyle(`height: ${spinnerDotSizeMap[size]}px`)
        }
      })

      it("should display the correct spinner height", () => {
        const spinner = screen.getByRole("progressbar").firstElementChild
        expect(spinner).toHaveStyle(`height: ${sizeMap[size]}px`)
      })
    })
  }
})
