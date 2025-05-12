import { DashboardShell } from '@/components/dashboard-shell'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/users')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <DashboardShell
      title='Usuarios'
      subtitle='Administra los usuarios de la aplicación'
    ></DashboardShell>
  )
}
