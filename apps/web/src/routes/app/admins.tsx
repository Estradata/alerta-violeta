import { DashboardShell } from '@/components/dashboard-shell'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/admins')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <DashboardShell
      title='Administradores'
      subtitle='Gestiona los administradores del panel web'
    ></DashboardShell>
  )
}
