import { DashboardShell } from '@/components/dashboard-shell'
import { Table, TableColumnHeader } from '@/components/data-table'
import { useAlerts } from '@/features/alerts/api/get-alerts'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'

export const Route = createFileRoute('/app/alerts')({
  component: RouteComponent,
})

function RouteComponent() {
  const result = useAlerts()
  const alerts = result.data?.data || []

  if (result.isLoading) return <p>Loading...</p>

  const columns: ColumnDef<(typeof alerts)[number]>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => <TableColumnHeader column={column} title='ID' />,
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <TableColumnHeader column={column} title='Fecha de Creación' />
      ),
    },
  ]

  return (
    <DashboardShell
      title='Alertas'
      subtitle='Consulta el historial de alertas registradas'
    >
      <Table
        columns={columns}
        data={alerts}
        rowsPerPageLabel='Alertas por página'
      ></Table>
    </DashboardShell>
  )
}
