import { AllHtmlAttributes } from "../../core-types"

export type TFileInputProps = AllHtmlAttributes<HTMLInputElement> & {
  id: string
  label: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  fileDisplay?: "list" | "preview"
  dropzone?: boolean
  ref?: React.RefObject<HTMLInputElement>
}
