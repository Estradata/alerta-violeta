import {
  Table,
  TableColumnHeader,
  TableRowActions,
} from '@/components/data-table'
import { selectColumn } from '@/components/data-table/utils/select-column'
import { useSafePoints } from '@/features/safe-points/api/get-safe-points'
import { CreateSafePoint } from '@/features/safe-points/components/create-safe-point'
import { DeleteSafePoints } from '@/features/safe-points/components/delete-safe-points'
import { useUiStore } from '@/features/safe-points/store/ui'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { EditIcon, TrashIcon } from 'lucide-react'

export const Route = createFileRoute('/app/safe-points')({
  component: RouteComponent,
})

function RouteComponent() {
  const result = useSafePoints()
  const safePoints = result.data?.data || []
  const openUpdateDialog = useUiStore((s) => s.openUpdateDialog)
  const openDeleteDialog = useUiStore((s) => s.openDeleteDialog)

  if (result.isLoading) return <p>Loading...</p>

  const columns: ColumnDef<(typeof safePoints)[number]>[] = [
    selectColumn(),
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <TableColumnHeader column={column} title='Nombre' />
      ),
    },
    {
      id: 'actions',
      header: ({ column }) => (
        <TableColumnHeader column={column} title='Opciones' />
      ),
      cell: ({ row }) => {
        return (
          <TableRowActions
            actions={[
              {
                asChild: true,
                render: (
                  <button
                    className='flex justify-start gap-2 items-center cursor-pointer w-full'
                    onClick={() => openUpdateDialog(row.original)}
                  >
                    <EditIcon />
                    <span>Actualizar</span>
                  </button>
                ),
              },
              {
                asChild: true,
                render: (
                  <button
                    className='flex justify-start gap-2 items-center cursor-pointer w-full'
                    onClick={() => openDeleteDialog([row.original])}
                  >
                    <TrashIcon />

                    <span>Eliminar</span>
                  </button>
                ),
              },
            ]}
          />
        )
      },
    },
  ]

  return (
    <div>
      Hello "/app/safe-points"!
      <Table
        columns={columns}
        data={safePoints}
        onMultiDelete={openDeleteDialog}
        rowsPerPageLabel='Puntos por página'
      >
        <CreateSafePoint />
        <DeleteSafePoints />
      </Table>
    </div>
  )
}
