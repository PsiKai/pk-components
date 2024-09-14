import { ButtonProps } from "./Button.model"
import "./Button.css"

function Button(props: ButtonProps) {
  return <button onClick={props.onClick}>{props.children}</button>
}

export default Button
