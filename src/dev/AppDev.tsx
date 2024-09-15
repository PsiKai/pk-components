import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Button } from "../components/Button"
import "./index.css"
import { TButtonProps } from "../components/Button/Button.model"

// eslint-disable-next-line react-refresh/only-export-components
const AppDev = () => {
  return (
    <>
      <h1>PK Component Library</h1>
      <ButtonSection />
    </>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
const ButtonSection = () => {
  const handleClick = (e: React.MouseEvent) => {
    console.log("Button clicked", e)
  }

  const buttonVariants = [
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
  ] as TButtonProps["variant"][]

  const buttonSizes = ["small", "medium", "large", "link", "block"] as TButtonProps["size"][]

  return (
    <>
      <h2>Button</h2>
      <h3>Size</h3>
      <section>
        {buttonSizes.map(size => {
          const props = size === "link" ? { href: "/" } : { onClick: handleClick }
          return (
            <Button key={size} size={size} {...props}>
              {size}
            </Button>
          )
        })}
      </section>
      <h3>Variant</h3>
      <section>
        {buttonVariants.map(variant => (
          <Button key={variant} variant={variant} onClick={handleClick}>
            {variant}
          </Button>
        ))}
      </section>
      <h3>Outline</h3>
      <section>
        {buttonVariants.map(variant => (
          <Button key={variant} variant={variant} fill="outline" onClick={handleClick}>
            {variant}
          </Button>
        ))}
      </section>
      <h3>State</h3>
      <section>
        <Button variant="primary" fill="outline" onClick={handleClick} disabled>
          Primary
        </Button>
        <Button size="small" variant="secondary" onClick={handleClick} pending>
          Secondary
        </Button>
        <Button variant="success" onClick={handleClick} pending>
          Success
        </Button>
        <Button size="medium" variant="warning" disabled fill="outline" onClick={handleClick}>
          Warning
        </Button>
      </section>
    </>
  )
}

const root = createRoot(document.getElementById("root")!)

root.render(
  <StrictMode>
    <AppDev />
  </StrictMode>,
)
