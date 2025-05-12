import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/alerts')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/alerts"!</div>
}
