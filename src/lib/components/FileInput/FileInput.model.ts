import { AllHtmlAttributes } from "../../core-types"

export type TFileInputProps = AllHtmlAttributes & {
  id: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  fileDisplay?: "list" | "preview"
  dropzone?: boolean
  ref?: React.RefObject<HTMLInputElement>
}
