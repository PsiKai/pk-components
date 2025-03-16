import { forwardRef, useCallback, useMemo, useState } from "react"
import { TFileInputProps } from "./FileInput.model"
import { Button } from "../Button"
import { Dropzone } from "../Dropzone"
import { CloseIcon, FileSvg } from "../SVG"
import "./FileInput.css"

export const FileInput = forwardRef<HTMLInputElement, TFileInputProps>((props, ref) => {
  const {
    id,
    onChange,
    dropzone,
    label,
    accept,
    required,
    fileDisplay,
    className = "",
    ...rest
  } = props

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

  const handleValidDrop = useCallback(
    (e: React.DragEvent) => {
      const inputRef = ref as React.MutableRefObject<HTMLInputElement>
      if (inputRef?.current) {
        inputRef.current.files = e.dataTransfer.files
        const changeEvent = new Event("change", { bubbles: true })
        inputRef.current.dispatchEvent(changeEvent)
      }
    },
    [ref],
  )

  const handleInvalidDrop = useCallback((e: React.DragEvent) => {
    console.log(e.dataTransfer.files)
  }, [])

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
      {dropzone ? (
        <Dropzone
          handleValidDrop={handleValidDrop}
          handleInvalidDrop={handleInvalidDrop}
          className="pk-file-input-dropzone"
          accept={accept}
        >
          <span>Drag and Drop files here</span>
          <span className="pk-dropzone-or">-OR-</span>
          <input
            ref={ref}
            type="file"
            id={id}
            className={`pk-file-input ${className}`}
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
        </Dropzone>
      ) : (
        <>
          <input
            ref={ref}
            type="file"
            id={id}
            className={`pk-file-input ${className}`}
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
        </>
      )}

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
            <div className="pk-file-preview" key={fileName}>
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
