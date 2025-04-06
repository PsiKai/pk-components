import React from "react"
import "./PropsTable.css"

export type TPropsTableRow = { Name: string; Type: string; Default?: string; Description: string }

export function PropsTable({ rows }: { rows: TPropsTableRow[] }) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {Object.keys(rows[0]).map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {Object.entries(row).map(([attr, cell], jindex) =>
                attr === "Description" ? (
                  <td key={jindex} className="prop-description">
                    <span>{cell}</span>
                  </td>
                ) : (
                  <td key={jindex}>
                    <code className="snippet">{cell}</code>
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
