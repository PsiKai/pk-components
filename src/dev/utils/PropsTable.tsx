import React from "react"
import "./PropsTable.css"

const propsTableHeadings = ["Name", "Type", "Default", "Description"]

type TPropsTableRow = { name: string; type: string; default: string; description: string }

export function PropsTable({ rows }: { rows: TPropsTableRow[] }) {
  return (
    <table>
      <thead>
        <tr>
          {propsTableHeadings.map((heading, index) => (
            <th key={index}>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {Object.entries(row).map(([attr, cell], jindex) =>
              attr === "description" ? (
                <td key={jindex} className="prop-description">
                  {cell}
                </td>
              ) : (
                <td key={jindex}>
                  <code>{cell}</code>
                </td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
