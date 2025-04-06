import React from "react"
import { render, screen, waitFor, act, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { vi } from "vitest"
import { ToastAlertProvider } from "./ToastAlertProvider"
import { useToastAlerts } from "./useToastAlerts"
import { allIntents, allToastNames, allToastNamesMap, allToastOrigins } from "./ToastAlert.model"

describe("ToastAlertProvider", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      value: vi.fn(() => ({ matches: true })),
    })
  })

  describe("with default props", () => {
    beforeEach(() => {
      render(
        <ToastAlertProvider>
          <FooComponent />
        </ToastAlertProvider>,
      )
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it("should render the toast container", () => {
      const component = screen.getByTestId("pk-toast-container")
      expect(component).toBeInTheDocument()
    })

    it("should render a toast with the correct class name", async () => {
      const button = screen.getByText("success toast")
      act(() => button.click())
      const toast = await screen.findByRole("toast")
      expect(toast).toHaveClass("pk-toast-alert")
    })

    it.each(allToastNames)("should render a %s toast from the toast object", async type => {
      const button = screen.getByText(`${type} toast`)
      act(() => button.click())
      const toast = await screen.findByRole("toast")
      expect(toast).toBeInTheDocument()
    })

    it.each(allIntents)("should render a %s toast from the newToast method", async intent => {
      const button = screen.getByText(`${intent} newToast`)
      act(() => button.click())
      const toast = await screen.findByRole("toast")
      expect(toast).toBeInTheDocument()
    })

    it("should render a toast with a dismiss button", async () => {
      const button = screen.getByText("success toast")
      act(() => button.click())
      const toast = await screen.findByRole("toast")
      const dismiss = screen.getByLabelText("Remove Toast")
      expect(toast).toBeInTheDocument()
      expect(dismiss).toBeInTheDocument()
    })

    it("should remove a toast when the dismiss button is clicked", async () => {
      const button = screen.getByText("success toast")
      act(() => button.click())
      const toast = await screen.findByRole("toast")
      const dismiss = screen.getByLabelText("Remove Toast")
      act(() => dismiss.click())
      await waitFor(() => expect(toast).not.toBeInTheDocument(), { timeout: 5000 })
    })

    it("should clear all toasts", async () => {
      const button = screen.getByText("success toast")
      const button2 = screen.getByText("info toast")
      act(() => {
        button.click()
        button2.click()
      })
      const toasts = await screen.findAllByRole("toast")
      const clear = screen.getByText("Clear All Toasts")
      act(() => clear.click())
      for (const toast of toasts) {
        expect(toast).not.toBeInTheDocument()
      }
    })

    it.each(allToastNames)(
      "%s method should render toast with correct --alert-intent",
      async type => {
        const button = screen.getByText(`${type} toast`)
        act(() => button.click())
        const toast = await screen.findByRole("toast")
        expect(toast).toHaveStyle({ "--alert-intent": `var(--${allToastNamesMap[type]})` })
      },
    )

    describe("with no specified options", () => {
      it("should render a toast with the default intent and duration", async () => {
        const button = screen.getByText("no options")
        act(() => button.click())
        const toast = await screen.findByRole("toast")
        expect(toast).toHaveStyle({ "--alert-intent": "var(--primary)" })
      })

      it.each(allToastNames)("should render a %s toast with the default options", async type => {
        const button = screen.getByText(`${type} no options`)
        act(() => button.click())
        const toast = await screen.findByRole("toast")
        expect(toast).toHaveStyle({ "--alert-intent": `var(--${allToastNamesMap[type]})` })
      })
    })

    describe("with animations", () => {
      const KeyframeEffectStub = vi.fn()
      const AnimationStub = vi.fn()
      AnimationStub.prototype.play = vi.fn()
      AnimationStub.prototype.finished = Promise.resolve()

      beforeAll(() => {
        Object.defineProperty(globalThis, "KeyframeEffect", {
          value: KeyframeEffectStub,
        })

        Object.defineProperty(globalThis, "Animation", {
          writable: true,
          value: AnimationStub,
        })

        Object.defineProperty(window, "matchMedia", {
          value: vi.fn(() => ({ matches: false })),
        })
      })

      afterAll(() => {
        Object.defineProperty(window, "matchMedia", {
          value: vi.fn(() => ({ matches: true })),
        })
      })

      it("should animate the toast on exit", async () => {
        const button = screen.getByText("success toast")
        act(() => button.click())
        const toast = await screen.findByRole("toast")
        expect(toast).toBeInTheDocument()
        const dismiss = screen.getByLabelText("Remove Toast")
        await act(async () => dismiss.click())
        expect(KeyframeEffectStub).toHaveBeenCalledTimes(2)
        expect(AnimationStub).toHaveBeenCalledTimes(2)
        expect(AnimationStub.prototype.play).toHaveBeenCalledTimes(2)
        await waitFor(() => expect(toast).not.toBeInTheDocument())
      })
    })
  })

  describe("with timers", () => {
    beforeEach(() => {
      vi.useFakeTimers({ shouldAdvanceTime: true })
      render(
        <ToastAlertProvider>
          <FooComponent />
        </ToastAlertProvider>,
      )
    })

    afterEach(() => {
      vi.runOnlyPendingTimers()
      vi.useRealTimers()
    })

    it("should remove a toast after the duration", async () => {
      const button = screen.getByText("success toast")
      act(() => button.click())
      const toast = await screen.findByRole("toast")
      expect(toast).toBeInTheDocument()
      act(() => vi.advanceTimersByTime(2_000))
      await waitFor(() => expect(toast).not.toBeInTheDocument())
    })

    it("should pause the dismiss timer when a toast is hovered", async () => {
      const button = screen.getByText("success toast")
      act(() => button.click())
      const toast = await screen.findByRole("toast")
      expect(toast).toBeInTheDocument()
      act(() => fireEvent.mouseEnter(toast))
      await act(async () => vi.runOnlyPendingTimers())
      expect(toast).toBeInTheDocument()
    })

    it("should remove a toast after the duration when hover ends", async () => {
      const button = screen.getByText("success toast")

      act(() => button.click())
      const toast = await screen.findByRole("toast")
      expect(toast).toBeInTheDocument()

      act(() => fireEvent.mouseEnter(toast))
      await act(async () => vi.runOnlyPendingTimers())
      expect(toast).toBeInTheDocument()

      act(() => fireEvent.mouseLeave(toast))
      await act(async () => vi.runOnlyPendingTimers())
      await waitFor(() => expect(toast).not.toBeInTheDocument())
    })

    it("should pause the dismiss timer when a toast is focused", async () => {
      const button = screen.getByText("success toast")
      act(() => button.click())
      const toast = await screen.findByRole("toast")
      expect(toast).toBeInTheDocument()

      act(() => fireEvent.focus(toast))
      await act(async () => vi.runOnlyPendingTimers())
      expect(toast).toBeInTheDocument()
    })

    it("should remove a toast after the duration when focus ends", async () => {
      const button = screen.getByText("success toast")
      act(() => button.click())
      const toast = await screen.findByRole("toast")
      expect(toast).toBeInTheDocument()

      act(() => fireEvent.focus(toast))
      await act(async () => vi.runOnlyPendingTimers())
      expect(toast).toBeInTheDocument()

      act(() => fireEvent.blur(toast))
      await act(async () => vi.runOnlyPendingTimers())
      await waitFor(() => expect(toast).not.toBeInTheDocument())
    })

    it("should only pause the dismiss timer of the hovered toast", async () => {
      const button = screen.getByText("success toast")
      const button2 = screen.getByText("info toast")
      act(() => {
        button.click()
        button2.click()
      })
      const toasts = await screen.findAllByRole("toast")
      expect(toasts.length).toBe(2)

      act(() => {
        fireEvent.mouseEnter(toasts[0])
        fireEvent.mouseLeave(toasts[0])
      })
      await act(async () => vi.runAllTimers())
      expect(toasts[1]).not.toBeInTheDocument()
      expect(toasts[0]).not.toBeInTheDocument()
    })

    it("should gracefully exit dismissToast if the toast is not found", async () => {
      const button = screen.getByText("success toast")
      act(() => button.click())
      const toast = await screen.findByRole("toast")
      expect(toast).toBeInTheDocument()
      toast.remove()
      await act(async () => vi.runOnlyPendingTimers())
    })
  })

  describe("with a custom origin", () => {
    it.each(allToastOrigins)("should render the toast container with the %s origin", origin => {
      render(
        <ToastAlertProvider origin={origin}>
          <FooComponent />
        </ToastAlertProvider>,
      )
      const component = screen.getByTestId("pk-toast-container")
      expect(component).toHaveClass(origin)
    })
  })
})

const FooComponent = () => {
  const { toast, newToast, clearAllToasts } = useToastAlerts()

  return (
    <div>
      {Object.entries(toast).map(([type, method]) => {
        return (
          <button key={type} onClick={() => method(type, { duration: 500 })}>
            {`${type} toast`}
          </button>
        )
      })}
      {Object.entries(toast).map(([type, method]) => {
        return (
          <button key={type} onClick={() => method(type)}>
            {`${type} no options`}
          </button>
        )
      })}
      {allIntents.map(intent => {
        return (
          <button
            key={intent}
            onClick={() => newToast(<div>{intent}</div>, { intent, duration: 500 })}
          >
            {`${intent} newToast`}
          </button>
        )
      })}
      <button onClick={() => newToast(<div>no options</div>)}>no options</button>
      <button onClick={clearAllToasts}>Clear All Toasts</button>
    </div>
  )
}
