import { DashboardShell } from '@/components/dashboard-shell'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/emergency-contacts')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <DashboardShell
      title='Directorio de Seguridad'
      subtitle='Administra los contactos de emergencia'
    ></DashboardShell>
  )
}
