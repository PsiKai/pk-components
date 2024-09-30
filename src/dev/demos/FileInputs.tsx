import React from "react"
import { FileInput } from "../../lib/components/FileInput"

export function FileInputSection() {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    for (const file of e.target.files || []) {
      console.log(file.name)
    }
  }

  return (
    <div className="sub-section">
      <h3>With label, hint, and file list</h3>
      <FileInput
        id="file-input"
        onChange={onChange}
        multiple
        label="Upload your résumé"
        accept=".jpg,.jpeg,.png,.pdf"
      />
    </div>
  )
}
