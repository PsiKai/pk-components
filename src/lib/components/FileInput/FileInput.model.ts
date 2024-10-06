import { AllHtmlAttributes } from "../../core-types"

type TAllOptionalFileInputProps = AllHtmlAttributes & {
  id: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  fileDisplay?: "list" | "preview"
  dropzone?: boolean
  ref?: React.RefObject<HTMLInputElement>
}

type TDependentFileInputProps<T> = T extends { dropzone: boolean }
  ? T & {
      ref: React.RefObject<HTMLInputElement>
    }
  : T

export type TFileInputProps = TDependentFileInputProps<TAllOptionalFileInputProps>
