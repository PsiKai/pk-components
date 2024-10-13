import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import { LoadingSpinner } from "./LoadingSpinner"
import { sizeMap, spinnerDotCountMap, spinnerDotSizeMap } from "./utils/spinner-dimensions"

describe("LoadingSpinner", () => {
  describe("with default props", () => {
    beforeEach(() => {
      render(<LoadingSpinner />)
    })

    it("should render the component", () => {
      const loadingSpinner = screen.getByRole("progressbar")
      expect(loadingSpinner).toBeInTheDocument()
    })

    it("should apply the backdrop class", () => {
      const loadingSpinner = screen.getByRole("progressbar")
      expect(loadingSpinner).toHaveClass("pk-loading-spinner-backdrop")
    })

    it("should default to medium size", () => {
      const dots = screen.getAllByTestId("pk-loading-spinner-dot")
      expect(dots).toHaveLength(spinnerDotCountMap.md)
    })
  })

  describe("with no backdrop", () => {
    beforeEach(() => {
      render(<LoadingSpinner backdrop={false} />)
    })

    it("should not apply the backdrop class", () => {
      const loadingSpinner = screen.getByRole("progressbar")
      expect(loadingSpinner).not.toHaveClass("pk-loading-spinner-backdrop")
    })
  })

  for (const size of ["xs", "sm", "md", "lg", "xl"] as const) {
    describe(`with size ${size}`, () => {
      beforeEach(() => {
        render(<LoadingSpinner fit={size} />)
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
