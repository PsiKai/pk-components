import React from "react"
import { render, renderHook, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { vi } from "vitest"

import { Sidenav } from "./Sidenav"

describe("Sidenav", () => {
  let open: boolean
  const closeNav = vi.fn().mockImplementation(() => {
    open = false
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe("when the sidenav is closed", () => {
    beforeEach(() => {
      open = false
      render(<Sidenav open={open} handleDismiss={closeNav} />)
    })

    it("should render the component", () => {
      const sidenav = screen.getByTestId("pk-sidenav")
      expect(sidenav).toBeInTheDocument()
    })

    it("should not display the sidenav", () => {
      const sidenav = screen.getByTestId("pk-sidenav")
      waitFor(() => expect(sidenav).not.toBeVisible())
    })

    it("should not display the backdrop", () => {
      const backdrop = screen.getByTestId("pk-sidenav-backdrop")
      waitFor(() => expect(backdrop).not.toBeVisible())
    })

    describe("when open prop changes", () => {
      beforeEach(() => {
        open = true
      })

      it("should display the sidenav", () => {
        const sidenav = screen.getByTestId("pk-sidenav")
        expect(sidenav).toBeVisible()
      })

      it("should display the backdrop", () => {
        const backdrop = screen.getByTestId("pk-sidenav-backdrop")
        expect(backdrop).toBeVisible()
      })
    })
  })

  describe("when the sidenav is open", () => {
    beforeEach(() => {
      open = true
      render(<Sidenav open={open} handleDismiss={closeNav} />)
    })

    it("should render the component", () => {
      const sidenav = screen.getByTestId("pk-sidenav")
      expect(sidenav).toBeInTheDocument()
    })

    it("should render the backdrop", () => {
      const backdrop = screen.getByTestId("pk-sidenav-backdrop")
      expect(backdrop).toBeVisible()
    })

    it("should close the sidenav when the backdrop is clicked", () => {
      const backdrop = screen.getByTestId("pk-sidenav-backdrop")
      const sidenav = screen.getByTestId("pk-sidenav")
      backdrop.click()
      expect(closeNav).toHaveBeenCalled()
      waitFor(() => expect(open).toBe(false))
      waitFor(() => expect(backdrop).not.toBeVisible())
      waitFor(() => expect(sidenav).not.toBeVisible())
    })

    it("should close the sidenav when the escape key is pressed", () => {
      const sidenav = screen.getByTestId("pk-sidenav")
      const backdrop = screen.getByTestId("pk-sidenav-backdrop")
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
      expect(closeNav).toHaveBeenCalled()
      waitFor(() => expect(open).toBe(false))
      waitFor(() => expect(backdrop).not.toBeVisible())
      waitFor(() => expect(sidenav).not.toBeVisible())
    })

    it("should not close the sidenav if other key is pressed", () => {
      const sidenav = screen.getByTestId("pk-sidenav")
      const backdrop = screen.getByTestId("pk-sidenav-backdrop")
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }))
      expect(closeNav).not.toHaveBeenCalled()
      waitFor(() => expect(open).toBe(true))
      waitFor(() => expect(backdrop).toBeVisible())
      waitFor(() => expect(sidenav).toBeVisible())
    })
  })

  describe("with parent prop", () => {
    describe("when parent is inner html element", () => {
      let parentRef: React.RefObject<HTMLDivElement>
      beforeEach(() => {
        parentRef = renderHook(() => React.useRef(null)).result.current
        open = true
        render(
          <div ref={parentRef}>
            <Sidenav open={open} handleDismiss={closeNav} parent={parentRef.current} />
          </div>,
        )
      })

      it("should set overflow hidden on the parent element", () => {
        const sidenav = screen.getByTestId("pk-sidenav")
        waitFor(() => expect(parentRef.current?.style.overflow).toBe("hidden"))
        waitFor(() => expect(sidenav).toBeVisible())
      })
    })

    describe("when parent is null ref", () => {
      beforeEach(() => {
        const parentEl = renderHook(() => React.useRef(null)).result.current.current
        open = true
        render(<Sidenav open={open} handleDismiss={closeNav} parent={parentEl} />)
      })

      it("should fallback to the document body", () => {
        const sidenav = screen.getByTestId("pk-sidenav")
        waitFor(() => expect(document.body.style.overflow).toBe("hidden"))
        waitFor(() => expect(sidenav).toBeVisible())
      })
    })
  })

  describe("with no handleDismiss prop", () => {
    beforeEach(() => {
      open = true
      render(<Sidenav open={open} />)
    })

    it("should not light dismiss on backdrop click", () => {
      const sidenav = screen.getByTestId("pk-sidenav")
      const backdrop = screen.getByTestId("pk-sidenav-backdrop")
      backdrop.click()
      waitFor(() => expect(open).toBe(true))
      waitFor(() => expect(backdrop).toBeVisible())
      waitFor(() => expect(sidenav).toBeVisible())
    })

    it("should not close the sidenav when the escape key is pressed", () => {
      const sidenav = screen.getByTestId("pk-sidenav")
      const backdrop = screen.getByTestId("pk-sidenav-backdrop")
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
      waitFor(() => expect(open).toBe(true))
      waitFor(() => expect(backdrop).toBeVisible())
      waitFor(() => expect(sidenav).toBeVisible())
    })
  })

  describe("with from prop", () => {
    describe("when from prop is right", () => {
      beforeEach(() => {
        open = true
        render(<Sidenav open={open} handleDismiss={closeNav} from="right" />)
      })

      it("should render the sidenav from the right", () => {
        const sidenav = screen.getByTestId("pk-sidenav")
        expect(sidenav).toHaveClass("pk-sidenav-from-right")
      })
    })

    describe("when from prop is left", () => {
      beforeEach(() => {
        open = true
        render(<Sidenav open={open} handleDismiss={closeNav} from="left" />)
      })

      it("should render the sidenav from the left", () => {
        const sidenav = screen.getByTestId("pk-sidenav")
        expect(sidenav).toHaveClass("pk-sidenav")
      })
    })

    describe("when no from prop is provided", () => {
      beforeEach(() => {
        open = true
        render(<Sidenav open={open} handleDismiss={closeNav} />)
      })

      it("should render the sidenav from the left", () => {
        const sidenav = screen.getByTestId("pk-sidenav")
        expect(sidenav).toHaveClass("pk-sidenav")
      })
    })
  })

  describe("with className prop", () => {
    beforeEach(() => {
      open = true
      render(<Sidenav open={open} handleDismiss={closeNav} className="custom-class" />)
    })

    it("should render the custom class", () => {
      const sidenav = screen.getByTestId("pk-sidenav")
      expect(sidenav).toHaveClass("custom-class")
    })
  })

  describe("with children prop", () => {
    beforeEach(() => {
      open = true
      render(
        <Sidenav open={open} handleDismiss={closeNav}>
          <div data-testid="child" />
        </Sidenav>,
      )
    })

    it("should render the children", () => {
      const child = screen.getByTestId("child")
      expect(child).toBeInTheDocument()
    })
  })
})
