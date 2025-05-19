import { DashboardShell } from '@/components/dashboard-shell'
import { Table, TableColumnHeader } from '@/components/data-table'
import { selectColumn } from '@/components/data-table/utils/select-column'
import { useAdmins } from '@/features/admins/api/get-admins'
import { CreateAdmin } from '@/features/admins/components/create-admin'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'

export const Route = createFileRoute('/app/admins')({
  component: RouteComponent,
})

function RouteComponent() {
  const result = useAdmins()
  const admins = result.data?.data || []

  const columns: ColumnDef<(typeof admins)[number]>[] = [
    selectColumn(),
    {
      id: 'name',
      header: ({ column }) => (
        <TableColumnHeader column={column} title='Nombre' />
      ),
      cell: ({ row }) => {
        const admin = row.original

        return (
          <div className='flex items-center'>
            <div>
              <div className='text-sm font-medium text-gray-900 dark:text-white'>
                {admin.name}
              </div>
              <div className='text-xs text-gray-500 dark:text-gray-400 max-w-xs truncate'>
                {admin.email}
              </div>
            </div>
          </div>
        )
      },
      filterFn(row, _, filterValue) {
        if (typeof filterValue !== 'string') return false
        const user = row.original
        const value = filterValue.toLowerCase()

        return (
          user.name.toLowerCase().includes(value) ||
          user.email.toLowerCase().includes(value)
        )
      },
    },
    // {
    //   id: 'actions',
    //   header: ({ column }) => (
    //     <TableColumnHeader column={column} title='Opciones' />
    //   ),
    //   cell: ({ row }) => {
    //     return (
    //       <TableRowActions
    //         actions={[
    //           {
    //             asChild: true,
    //             render: (
    //               <button
    //                 className='flex justify-start gap-2 items-center cursor-pointer w-full'
    //                 onClick={() => openUpdateDialog(row.original)}
    //               >
    //                 <EditIcon />
    //                 <span>Actualizar</span>
    //               </button>
    //             ),
    //           },
    //           {
    //             asChild: true,
    //             render: (
    //               <button
    //                 className='flex justify-start gap-2 items-center cursor-pointer w-full'
    //                 onClick={() => openDeleteDialog([row.original])}
    //               >
    //                 <TrashIcon />

    //                 <span>Eliminar</span>
    //               </button>
    //             ),
    //           },
    //         ]}
    //       />
    //     )
    //   },
    // },
  ]

  return (
    <DashboardShell
      title='Administradores'
      subtitle='Gestiona los administradores del panel web'
    >
      <Table
        columns={columns}
        data={admins}
        rowsPerPageLabel='Administradores por página'
      >
        <CreateAdmin />
      </Table>
    </DashboardShell>
  )
}
