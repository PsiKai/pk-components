import { AllHtmlAttributes } from "../../core-types"

export type TFileInputProps = AllHtmlAttributes & {
  id: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  fileDisplay?: "list" | "preview"
  // className?: string
  // children?: React.ReactNode
  // onChange: React.ChangeEventHandler<HTMLInputElement>
  // name: string
  // accept: string
  // multiple?: boolean
  // required?: boolean
  // disabled?: boolean
}
