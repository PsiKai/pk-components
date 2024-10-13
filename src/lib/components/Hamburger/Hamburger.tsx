import { useMemo } from "react"
import { THamburgerProps } from "./Hamburger.model"
import { Button } from "../Button"
import "./Hamburger.css"

export function Hamburger({ open, onClick }: THamburgerProps) {
  // const diagnonalOfRect = useMemo(
  // 	() => 90 - Math.atan(36 / 32) * (180 / Math.PI),
  // 	[]
  // )

  const closedStyle = useMemo(() => ({ transform: "none" }), [])
  const firstBarStyle = useMemo(() => ({ transform: `rotate(41deg) scaleX(1.1)` }), [])
  const secondBarStyle = useMemo(() => ({ transform: "scaleX(0)" }), [])
  const thirdBarStyle = useMemo(() => ({ transform: `rotate(-41deg) scaleX(1.1)` }), [])

  return (
    <Button
      fit="small"
      variant="secondary"
      fill="outline"
      className="pk-hamburger-button"
      onClick={onClick}
      data-testid="pk-hamburger-button"
    >
      <span style={open ? firstBarStyle : closedStyle}></span>
      <span style={open ? secondBarStyle : closedStyle}></span>
      <span style={open ? thirdBarStyle : closedStyle}></span>
    </Button>
  )
}
