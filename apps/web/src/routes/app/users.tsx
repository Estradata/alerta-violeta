import { DashboardShell } from '@/components/dashboard-shell'
import { Table, TableColumnHeader } from '@/components/data-table'
import { selectColumn } from '@/components/data-table/utils/select-column'
import { useUsers } from '@/features/users/api/get-users'
import { cn } from '@/lib/utils'
import type { User } from '@packages/users/types'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import {
  AlertCircleIcon,
  BellIcon,
  CheckCircle,
  ContactIcon,
} from 'lucide-react'
import { USER_STATUS_LABELS, userStatuses } from '@packages/users/consts'
import { useDisclosure } from '@/hooks/use-disclosure'
import { useUpdateUserStatus } from '@/features/users/api/update-user-status'
import { ConfirmationDialog } from '@/components/confirmation-dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EmptyPlaceholder } from '@/components/empty-placeholder'

export const Route = createFileRoute('/app/users')({
  component: RouteComponent,
})

function RouteComponent() {
  const result = useUsers()
  const users = result.data?.data || []
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const columns: ColumnDef<(typeof users)[number]>[] = [
    selectColumn(),
    {
      id: 'name',
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
                {contact.email}
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
      accessorKey: 'status',
      header: ({ column }) => (
        <TableColumnHeader column={column} title='Estatus' />
      ),
      cell: ({ row }) => {
        const user = row.original
        return <UserStatusBadge id={user.id} status={user.status} />
      },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <TableColumnHeader column={column} title='Fecha de Registro' />
      ),
      cell: ({ row }) => {
        return formatDate(new Date(row.original.createdAt))
      },
    },
    {
      accessorKey: 'lastLogin',
      header: ({ column }) => (
        <TableColumnHeader column={column} title='Último inicio de sesión' />
      ),
      cell: ({ row }) => {
        return formatDate(new Date(row.original.lastLogin))
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
      title='Usuarios'
      subtitle='Administra los usuarios de la aplicación'
    >
      <Tabs defaultValue='users' className='w-full h-full'>
        <TabsList>
          <TabsTrigger value='users'>Usuarios</TabsTrigger>
          <TabsTrigger value='alerts'>Historial de Alertas</TabsTrigger>
          <TabsTrigger value='contacts'>Contactos</TabsTrigger>
        </TabsList>

        <TabsContent value='users'>
          <Table
            filters={[
              {
                column: 'status',
                options: userStatuses,
                title: 'Estatus',
              },
            ]}
            searchColumn='name'
            columns={columns}
            data={users}
            rowsPerPageLabel='Usuarios por página'
          ></Table>
        </TabsContent>

        <TabsContent value='alerts'>
          <EmptyPlaceholder className='h-full'>
            <EmptyPlaceholder.Icon Icon={BellIcon} />
            <EmptyPlaceholder.Title>Próximamente...</EmptyPlaceholder.Title>
          </EmptyPlaceholder>
        </TabsContent>

        <TabsContent value='contacts' className='h-full'>
          <EmptyPlaceholder className='h-full'>
            <EmptyPlaceholder.Icon Icon={ContactIcon} />
            <EmptyPlaceholder.Title>Próximamente...</EmptyPlaceholder.Title>
          </EmptyPlaceholder>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

export function UserStatusBadge({
  id,
  status,
}: {
  id: string
  status: User['status']
}) {
  const dialog = useDisclosure()
  const updateMutation = useUpdateUserStatus({
    onSuccess() {
      dialog.onClose()
    },
  })
  const newStatus = status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE'

  function onClick() {
    dialog.onOpen()
  }

  function onConfirm() {
    updateMutation.mutate({
      id,
      status: newStatus,
    })
  }

  return (
    <>
      <span
        role='button'
        className={cn(
          'px-2 py-1 inline-flex items-center text-xs leading-5 font-medium rounded-full',
          'cursor-pointer',
          status === 'ACTIVE'
            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
            : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
        )}
        onClick={onClick}
      >
        {status === 'ACTIVE' ? (
          <CheckCircle className='w-3.5 h-3.5 mr-1' />
        ) : (
          <AlertCircleIcon className='w-3.5 h-3.5 mr-1' />
        )}

        {USER_STATUS_LABELS[status]}
      </span>

      <ConfirmationDialog
        title='Cambiar estatus'
        variant='default'
        text={`¿Está seguro de que desea cambiar el estatus a "${USER_STATUS_LABELS[newStatus]}"?`}
        {...dialog}
        onConfirm={onConfirm}
      />
    </>
  )
}
