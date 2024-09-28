import React, { useCallback } from "react"
import type { TButtonProps } from "../../lib/components/Button"
import { Button } from "../../lib/components/Button"

const buttonVariants = [
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
] as TButtonProps["variant"][]

const buttonSizes = ["link", "small", "medium", "large", "block"] as TButtonProps["fit"][]

function usePending() {
  const [pending, setPending] = React.useState("")

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    setPending(e.currentTarget.textContent!)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setPending("")
  }

  return { pending, handleClick }
}

export const ButtonSection = () => {
  return (
    <>
      <h2>
        <code>Button</code>
      </h2>
      <h3>Size</h3>
      <ButtonSizes />
      <h3>Variant</h3>
      <ButtonVariants />
      <h3>Outline</h3>
      <ButtonOutline />
      <h3>State</h3>
      <ButtonState />
    </>
  )
}

const ButtonSizes = () => {
  const { pending, handleClick } = usePending()

  return (
    <section>
      {buttonSizes.map(fit => {
        const props = fit === "link" ? { href: "#" } : { onClick: handleClick }
        return (
          <Button key={fit} fit={fit} {...props} pending={pending === fit + "-fit"}>
            {fit + "-fit"}
          </Button>
        )
      })}
    </section>
  )
}

const ButtonVariants = () => {
  const { pending, handleClick } = usePending()

  return (
    <section>
      {buttonVariants.map(variant => (
        <Button
          key={variant}
          variant={variant}
          onClick={handleClick}
          pending={pending === variant + "-variant"}
        >
          {variant + "-variant"}
        </Button>
      ))}
    </section>
  )
}

const ButtonOutline = () => {
  const { pending, handleClick } = usePending()

  return (
    <section>
      {buttonVariants.map(variant => (
        <Button
          key={variant}
          variant={variant}
          fill="outline"
          onClick={handleClick}
          pending={pending === variant + "-outline"}
        >
          {variant + "-outline"}
        </Button>
      ))}
    </section>
  )
}

const ButtonState = () => {
  const buttonMap = useCallback(
    (variant: (typeof buttonVariants)[number], disabled: boolean, pending: boolean) => {
      const fill = Math.random() > 0.7 ? "outline" : "solid"
      const fit = buttonSizes[Math.floor(Math.random() * buttonSizes.length)]
      return (
        <Button
          key={variant}
          variant={variant}
          fill={fill}
          fit={fit}
          pending={pending}
          disabled={disabled}
        >
          {`${variant}-${fill}-${fit}`}
        </Button>
      )
    },
    [],
  )

  return (
    <>
      <h4>Disabled</h4>
      <section>{buttonVariants.map(variant => buttonMap(variant, true, false))}</section>
      <h4>Pending</h4>
      <section>{buttonVariants.map(variant => buttonMap(variant, false, true))}</section>
    </>
  )
}
