import React, { useCallback } from "react"
import { composePropsTableData } from "../utils/PropsTable.utils"
import { PropsTable } from "../utils/PropsTable"
import { Hamburger } from "../../lib/components/Hamburger"

const buttonProps = composePropsTableData([
  [
    "onClick",
    "React.MouseEventHandler<HTMLButtonElement>",
    "undefined",
    "Function to call when the button is clicked.",
  ],
  ["open", "boolean", "false", "Whether the hamburger is open or closed."],
])

export function HamburgerButtonSection() {
  const [open, setOpen] = React.useState(false)

  const onClick = useCallback(() => {
    setOpen(prev => !prev)
  }, [])

  return (
    <div className="section-wrapper">
      <h2 id="HamburgerButton" className="section-header">
        <code>HamburgerButton</code>
      </h2>
      <section>
        <div className="sub-section">
          <h3 className="sub-section-header">Props</h3>
          <PropsTable rows={buttonProps} />
        </div>

        <div className="sub-section">
          <h3>Example</h3>
          <Hamburger onClick={onClick} open={open} />
        </div>
      </section>
    </div>
  )
}
