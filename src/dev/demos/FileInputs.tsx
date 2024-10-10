import React, { useRef } from "react"
import { FileInput } from "../../lib/components/FileInput"

export function FileInputSection() {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    for (const file of e.target.files || []) {
      console.log(file.name)
    }
  }

  const fileInput = useRef<HTMLInputElement>(null)

  return (
    <>
      <div className="sub-section">
        <h3>With label, hint, and file list</h3>
        <FileInput
          id="file-input-list"
          onChange={onChange}
          multiple
          label="Upload your résumé"
          fileDisplay="list"
          accept=".jpg,.jpeg,.png,.pdf"
        />
      </div>
      <div className="sub-section">
        <h3>With label hint and file preview</h3>
        <FileInput
          id="file-input-preview"
          onChange={onChange}
          fileDisplay="preview"
          label="Upload your photos"
          accept="image/*"
          multiple
          required
          dropzone
        />
      </div>
      <div className="sub-section">
        <h3 id="Dropzone">With label dropzone</h3>
        <FileInput
          id="file-input-preview-dropzone"
          onChange={onChange}
          fileDisplay="preview"
          label="Upload your photos"
          accept="image/*"
          multiple
          required
          dropzone
          ref={fileInput}
        />
      </div>
    </>
  )
}
