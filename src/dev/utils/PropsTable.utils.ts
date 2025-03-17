import { TPropsTableRow } from "./PropsTable"

type Tuple<A extends number, T, R extends Array<T> = []> = R["length"] extends A
  ? R
  : Tuple<A, T, [...R, T]>
type TRow = Tuple<4, string> | Tuple<3, string>

export function composePropsTableData(rows: TRow[]): TPropsTableRow[] {
  const rowsMapped = rows.map(row => ({
    Name: row[0],
    Type: row[1],
    ...(row.length === 3 ? { Description: row[2] } : { Default: row[2], Description: row[3]! }),
  }))
  console.log("rowsMapped", rowsMapped)
  return rowsMapped
}
