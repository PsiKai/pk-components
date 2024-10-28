import React, { useRef } from "react"
import { FileInput } from "../../lib/components/FileInput"
import { composePropsTableData } from "../utils/PropsTable.utils"
import { PropsTable } from "../utils/PropsTable"

export function FileInputSection() {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    for (const file of e.target.files || []) {
      console.log(file.name)
    }
  }

  const fileInputProps = composePropsTableData([
    [
      "[HTML\u00A0Attributes]",
      "React.AllHTMLAttributes<\n  HTMLInputElement\n>",
      "undefined",
      "Pass-through HTML attributes for input element.",
    ],
    ["id", "string", "undefined", "Required unique identifier for the input."],
    [
      "label",
      "string",
      "undefined",
      "A description of the input. Not the strict accessible label.",
    ],
    ["fileDisplay", '"list" | "preview"', "undefined", "Display type of the inputted files."],
    [
      "ref",
      "React.RefObject<HTMLInputElement>",
      "undefined",
      "Forwarded ref for the input element.",
    ],
    [
      "dropzone",
      "boolean",
      "false",
      "Enable the dropzone feature. A ref is required with the dropzone.",
    ],
  ])

  const fileInput = useRef<HTMLInputElement>(null)

  return (
    <div className="section-wrapper">
      <h2 id="FileInput" className="section-header">
        <code>FileInput</code>
      </h2>
      <section>
        <div className="sub-section">
          <h3 className="sub-section-header">Props</h3>
          <PropsTable rows={fileInputProps} />
        </div>
        <div className="sub-section">
          <h3>With label, hint, and file list</h3>
          <FileInput
            id="file-input-list"
            onChange={onChange}
            label="Upload your résumé"
            fileDisplay="list"
            accept=".jpg,.jpeg,.png,.pdf"
          />
        </div>
        <hr />
        <div className="sub-section">
          <h3>With label, hint, and file preview</h3>
          <FileInput
            id="file-input-preview"
            onChange={onChange}
            fileDisplay="preview"
            label="Upload your photos"
            accept="image/*"
            multiple
            required
          />
        </div>
        <hr />
        <div className="sub-section">
          <h3 id="Dropzone">With dropzone area</h3>
          <FileInput
            id="file-input-preview-dropzone"
            onChange={onChange}
            fileDisplay="preview"
            label="Share your vacation photos"
            accept="image/*"
            multiple
            dropzone
            ref={fileInput}
          />
        </div>
      </section>
    </div>
  )
}
