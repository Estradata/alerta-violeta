
import { type Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  TableFacetedFilter,
  type FacetedFilterOption,
} from './data-table-faceted-filter'
import { XIcon } from 'lucide-react'

export type SearchColumn<TData> = keyof TData | (string & {})

type TableToolbarProps<TData> = {
  table: Table<TData>
  searchColumn?: SearchColumn<TData>
  filters: TableFilter<TData>[]
  disabled?: boolean
}

export type TableFilter<TData> = {
  column: keyof TData
  title?: string
  options: FacetedFilterOption[]
}

export function TableToolbar<TData>({
  searchColumn,
  table,
  disabled = false,
  filters,
}: TableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        {searchColumn && (
          <Input
            placeholder='Buscar'
            disabled={disabled}
            value={
              (table
                .getColumn(searchColumn as string)
                ?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table
                .getColumn(searchColumn as string)
                ?.setFilterValue(event.target.value)
            }
            className='h-8 w-[150px] lg:w-[250px]'
          />
        )}

        {filters.map((filter) => {
          return (
            <TableFacetedFilter
              disabled={disabled}
              key={filter.column as string}
              column={table.getColumn(filter.column as string)}
              title={filter.title}
              options={filter.options}
            />
          )
        })}

        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Limpiar
            <XIcon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
    </div>
  )
}
