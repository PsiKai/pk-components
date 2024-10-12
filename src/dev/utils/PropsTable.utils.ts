type TRow = [string, string, string, string]

export function composePropsTableData(rows: TRow[]) {
  return rows.map(row => ({
    name: row[0],
    type: row[1],
    default: row[2],
    description: row[3],
  }))
}
