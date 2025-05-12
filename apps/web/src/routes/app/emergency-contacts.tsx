import { DashboardShell } from '@/components/dashboard-shell'
import {
  Table,
  TableColumnHeader,
  TableRowActions,
} from '@/components/data-table'
import { selectColumn } from '@/components/data-table/utils/select-column'
import { useEmergencyContacts } from '@/features/emergency-contacts/api/get-emergency-contacts'
import { CreateEmergencyContact } from '@/features/emergency-contacts/components/create-emergency-contact'
import { DeleteEmergencyContacts } from '@/features/emergency-contacts/components/delete-emergency-contacts'
import { UpdateEmergencyContact } from '@/features/emergency-contacts/components/update-emergency-contact'
import { useUiStore } from '@/features/emergency-contacts/store/ui'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { EditIcon, TrashIcon } from 'lucide-react'

export const Route = createFileRoute('/app/emergency-contacts')({
  component: RouteComponent,
})

function RouteComponent() {
  const result = useEmergencyContacts()
  const emergencyContacts = result.data?.data || []
  const openUpdateDialog = useUiStore((s) => s.openUpdateDialog)
  const openDeleteDialog = useUiStore((s) => s.openDeleteDialog)

  if (result.isLoading) return <p>Loading...</p>

  const columns: ColumnDef<(typeof emergencyContacts)[number]>[] = [
    selectColumn(),
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <TableColumnHeader column={column} title='Nombre' />
      ),
      cell: ({ row }) => {
        const contact = row.original

        return (
          <div className='flex items-center'>
            <div>
              <div className='text-sm font-medium text-gray-900 dark:text-white'>
                {contact.name}
              </div>
              <div className='text-xs text-gray-500 dark:text-gray-400 max-w-xs truncate'>
                {contact.description}
              </div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'phone',
      header: ({ column }) => (
        <TableColumnHeader column={column} title='Teléfono' />
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
    <DashboardShell
      title='Directorio de Seguridad'
      subtitle='Administra los contactos de emergencia'
    >
      <Table
        columns={columns}
        data={emergencyContacts}
        onMultiDelete={openDeleteDialog}
        rowsPerPageLabel='Contactos por página'
      >
        <CreateEmergencyContact />
        <UpdateEmergencyContact />
        <DeleteEmergencyContacts />
      </Table>
    </DashboardShell>
  )
}
