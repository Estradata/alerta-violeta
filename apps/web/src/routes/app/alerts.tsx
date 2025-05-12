import { DashboardShell } from '@/components/dashboard-shell'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/alerts')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <DashboardShell
      title='Alertas'
      subtitle='Consulta el historial de alertas registradas'
    ></DashboardShell>
  )
}
