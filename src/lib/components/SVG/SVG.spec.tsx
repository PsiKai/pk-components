import React from "react"
import { render, screen } from "@testing-library/react"
import * as Icons from "./index"
const {
  FileSvg,
  CloseIcon,
  CheckCircleIcon,
  WarningTriangleOutlineIcon,
  ErrorIcon,
  InfoOulinedIcon,
  BellOutlinedIcon,
} = Icons

describe("SVG Icons", () => {
  it("renders FileSvg correctly", () => {
    render(<FileSvg />)
    const fileSvg = screen.getByTestId("file-svg")
    expect(fileSvg).toBeInTheDocument()
  })

  it("renders CloseIcon correctly", () => {
    render(<CloseIcon />)
    const closeIcon = screen.getByTestId("close-icon")
    expect(closeIcon).toBeInTheDocument()
  })

  it("renders CheckCircleIcon correctly", () => {
    render(<CheckCircleIcon />)
    const checkCircleIcon = screen.getByTestId("check-circle-icon")
    expect(checkCircleIcon).toBeInTheDocument()
  })

  it("renders WarningTriangleOutlineIcon correctly", () => {
    render(<WarningTriangleOutlineIcon />)
    const warningTriangleOutlineIcon = screen.getByTestId("warning-triangle-outline-icon")
    expect(warningTriangleOutlineIcon).toBeInTheDocument()
  })

  it("renders ErrorIcon correctly", () => {
    render(<ErrorIcon />)
    const errorIcon = screen.getByTestId("error-icon")
    expect(errorIcon).toBeInTheDocument()
  })

  it("renders InfoOulinedIcon correctly", () => {
    render(<InfoOulinedIcon />)
    const infoOulinedIcon = screen.getByTestId("info-outlined-icon")
    expect(infoOulinedIcon).toBeInTheDocument()
  })

  it("renders BellOutlinedIcon correctly", () => {
    render(<BellOutlinedIcon />)
    const bellOutlinedIcon = screen.getByTestId("bell-outlined-icon")
    expect(bellOutlinedIcon).toBeInTheDocument()
  })
})
