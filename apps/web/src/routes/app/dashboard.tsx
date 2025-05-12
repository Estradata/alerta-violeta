import { useAuth } from '@/auth'
import { DashboardShell } from '@/components/dashboard-shell'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const user = useAuth().user!

  return (
    <DashboardShell
      title='Bienvenido'
      subtitle={`${user.name}`}
    ></DashboardShell>
  )
}
