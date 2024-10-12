import { AllHtmlAttributes } from "../../core-types"

export type TFileInputProps = AllHtmlAttributes<HTMLInputElement> & {
  id: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  label?: string
  fileDisplay?: "list" | "preview"
  dropzone?: boolean
  ref?: React.RefObject<HTMLInputElement>
}
