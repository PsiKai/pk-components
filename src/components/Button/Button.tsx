import { ButtonProps } from "./Button.model"
import "./Button.css"

export function Button(props: ButtonProps) {
  return <button onClick={props.onClick}>{props.children}</button>
}
