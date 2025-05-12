
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table as TableUI,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TablePagination } from './data-table-pagination'
import {
  type SearchColumn,
  type TableFilter,
  TableToolbar,
} from './data-table-toolbar'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchColumn?: SearchColumn<TData>
  filters?: TableFilter<TData>[]
  disabled?: boolean
  rowsPerPageLabel?: string
  onMultiDelete?: (selectedRows: TData[]) => void
  children?: React.ReactNode
}

export function Table<TData, TValue>({
  rowsPerPageLabel = 'Rows per page',
  disabled = false,
  columns,
  data,
  searchColumn,
  filters = [],
  onMultiDelete,
  children,
}: TableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const selectedItemsCount = table.getFilteredSelectedRowModel().rows.length

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap justify-between'>
        <div className='flex gap-2'>
          <TableToolbar
            disabled={disabled}
            searchColumn={searchColumn}
            table={table}
            filters={filters}
          />

          {onMultiDelete && selectedItemsCount > 0 && (
            <Button
              size='sm'
              className='h-8'
              variant='outline'
              onClick={() => {
                const rows = table
                  .getFilteredSelectedRowModel()
                  .rows.map((row) => row.original)

                onMultiDelete(rows)
              }}
            >
              <TrashIcon className='h-4 w-4 mr-2' />
              Eliminar
            </Button>
          )}
        </div>

        {children}
      </div>

      <div className='rounded-xl border dark:bg-card overflow-hidden'>
        <TableUI>
          <TableHeader className='bg-gray-50 dark:bg-zinc-900/50'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className='uppercase text-xs'
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center text-muted-foreground'
                >
                  Sin resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableUI>
      </div>

      <TablePagination table={table} rowsPerPageLabel={rowsPerPageLabel} />
    </div>
  )
}
