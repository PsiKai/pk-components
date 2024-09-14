import React from "react"

type ButtonProps = {
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function Button(props: ButtonProps) {
  return <button onClick={props.onClick}>{props.children}</button>
}

export default Button
