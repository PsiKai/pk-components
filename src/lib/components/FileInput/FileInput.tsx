import { forwardRef, useCallback, useMemo, useState } from "react"
import { TFileInputProps } from "./FileInput.model"
import "./FileInput.css"
import { Button } from "../Button"

export const FileInput = forwardRef<HTMLInputElement, TFileInputProps>((props, ref) => {
  const { id, onChange, label, accept, required, fileDisplay, ...rest } = props

  const [fileNames, setFileNames] = useState<string[]>([])
  const [filePreview, setFilePreview] = useState<Map<string, string>>(new Map())

  const internalOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (fileDisplay === "list") {
        const newFilesNames = e.target.files
          ? Array.from(e.target.files).map(file => file.name)
          : []
        setFileNames(newFilesNames)
      }
      if (fileDisplay === "preview") {
        const filePreviewMap = new Map()
        if (e.target.files) {
          Array.from(e.target.files).forEach(file => {
            const src = URL.createObjectURL(file)
            filePreviewMap.set(file.name, src)
          })
        }

        setFilePreview(filePreviewMap)
      }
      onChange(e)
    },
    [onChange, fileDisplay],
  )

  const labelClassNames = useMemo(() => {
    return `pk-file-input-description ${required ? "label-required" : ""}`
  }, [required])

  const removeFile = useCallback(
    (fileName: string) => {
      if (fileDisplay === "preview") {
        setFilePreview(prev => {
          prev.delete(fileName)
          return new Map(prev)
        })
      }
      if (fileDisplay === "list") {
        setFileNames(prev => prev.filter(name => name !== fileName))
      }
    },
    [fileDisplay],
  )

  return (
    <div className="pk-file-input-wrapper">
      <span id={`${id}-description`} className={labelClassNames}>
        {label}
      </span>
      {accept ? (
        <span
          id={`${id}-accepts`}
          className="pk-file-input-accept"
        >{`accepts${rest.multiple ? " multiple" : ""}: ${accept}`}</span>
      ) : null}
      <input
        ref={ref}
        type="file"
        id={id}
        className="pk-file-input"
        onChange={internalOnChange}
        accept={accept}
        aria-describedby={`${id}-description ${id}-accepts ${id}-file-list`}
        required={required}
        {...rest}
      />
      <label htmlFor={id} className="pk-file-input-label">
        <FileSvg />
        <span>Browse your files</span>
      </label>

      {fileDisplay === "list" ? (
        <ul id={`${id}-file-list`} className="pk-file-list">
          {fileNames.map(fileName => (
            <li key={fileName} className="pk-file-list-item">
              <Button
                variant="secondary"
                fit="link"
                onClick={() => removeFile(fileName)}
                className="pk-file-list-remove"
                aria-label={`Remove ${fileName}`}
              >
                <CloseIcon />
              </Button>
              <span>{fileName}</span>
            </li>
          ))}
        </ul>
      ) : fileDisplay === "preview" ? (
        <div id={`${id}-file-list`} className="pk-file-preview-wrapper">
          {[...filePreview.entries()].map(([fileName, preview]) => (
            <div className="pk-file-preview">
              <Button
                variant="secondary"
                fit="small"
                onClick={() => removeFile(fileName)}
                className="pk-file-preview-remove"
                aria-label={`Remove ${fileName}`}
              >
                <CloseIcon />
              </Button>
              <img key={fileName} src={preview} alt={fileName} className="pk-file-preview-image" />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
})

function FileSvg() {
  return (
    <svg className="folder-upload-icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
      <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m0 12H4V8h16zM8 13.01l1.41 1.41L11 12.84V17h2v-4.16l1.59 1.59L16 13.01 12.01 9z"></path>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg className="close-icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
    </svg>
  )
}
