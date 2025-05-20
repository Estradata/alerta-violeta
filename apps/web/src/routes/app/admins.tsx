import { useAuth } from '@/auth'
import { DashboardShell } from '@/components/dashboard-shell'
import {
  Table,
  TableColumnHeader,
  TableRowActions,
} from '@/components/data-table'
import { Checkbox } from '@/components/ui/checkbox'
import { useAdmins } from '@/features/admins/api/get-admins'
import { CreateAdmin } from '@/features/admins/components/create-admin'
import { DeleteAdmins } from '@/features/admins/components/delete-admins'
import { UpdateAdmin } from '@/features/admins/components/update-admin'
import { useUiStore } from '@/features/admins/store/ui'
import { createFileRoute, redirect } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { EditIcon, TrashIcon } from 'lucide-react'
import { hasPermission } from '@packages/admin-permissions/has-permission'
import { getDefaultRedirect } from '@/features/auth/utils/get-default-redirect'

export const Route = createFileRoute('/app/admins')({
  component: RouteComponent,
  beforeLoad({ context }) {
    if (!hasPermission(context.auth.user?.permissions, 'ADMINS')) {
      throw redirect({ to: getDefaultRedirect(context.auth.user) })
    }
  },
})

function RouteComponent() {
  const user = useAuth().user!
  const result = useAdmins()
  const admins = result.data?.data || []
  const openUpdateDialog = useUiStore((s) => s.openUpdateDialog)
  const openDeleteDialog = useUiStore((s) => s.openDeleteDialog)
  // Every admin except the current user
  const filteredAdmins = admins.filter((a) => a.id !== user.id)

  const columns: ColumnDef<(typeof admins)[number]>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          disabled={!filteredAdmins.length}
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Seleccionar todo'
          className='translate-y-[2px] cursor-pointer'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected() && row.original.id !== user.id}
          disabled={row.original.id === user.id}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Seleccionar fila'
          className='translate-y-[2px] cursor-pointer'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
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
    <DashboardShell
      title='Administradores'
      subtitle='Gestiona los administradores del panel web'
    >
      <Table
        columns={columns}
        enableMultiDelete={Boolean(filteredAdmins.length)}
        data={admins}
        onMultiDelete={() => {
          if (filteredAdmins.length) {
            openDeleteDialog(filteredAdmins)
          }
        }}
        rowsPerPageLabel='Administradores por página'
      >
        <CreateAdmin />
        <UpdateAdmin />
        <DeleteAdmins />
      </Table>
    </DashboardShell>
  )
}
