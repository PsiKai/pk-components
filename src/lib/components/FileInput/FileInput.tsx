import { forwardRef, useCallback, useState } from "react"
import { TFileInputProps } from "./FileInput.model"
import "./FileInput.css"

export const FileInput = forwardRef<HTMLInputElement, TFileInputProps>((props, ref) => {
  const [fileNames, setFileNames] = useState<string[]>([])
  const { id, onChange, label, accept, ...rest } = props

  const internalOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFilesNames = e.target.files ? Array.from(e.target.files).map(file => file.name) : []
      setFileNames(newFilesNames)
      onChange(e)
    },
    [onChange],
  )

  return (
    <div className="pk-file-input-wrapper">
      <span id={`${id}-description`} className="pk-file-input-description">
        {label}
      </span>
      {accept ? (
        <span id={`${id}-accepts`} className="pk-file-input-accept">{`accepts: ${accept}`}</span>
      ) : null}
      <input
        ref={ref}
        type="file"
        id={id}
        className="pk-file-input"
        onChange={internalOnChange}
        accept={accept}
        aria-describedby={`${id}-description ${id}-accepts ${id}-file-list`}
        {...rest}
      />
      <label htmlFor={id} className="pk-file-input-label">
        <FileSvg />
        <span>Browse your files</span>
      </label>

      <ul id={`${id}-file-list`} className="pk-file-list">
        {fileNames.map(fileName => (
          <li key={fileName}>{fileName}</li>
        ))}
      </ul>
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
