import { type Row } from '@tanstack/react-table'

export function filterFn<TData>(
   row: Row<TData>,
   columnId: string,
   filterValue: unknown[]
) {
   return filterValue.includes(row.getValue(columnId))
}
