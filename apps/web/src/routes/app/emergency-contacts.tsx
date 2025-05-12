import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/emergency-contacts')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/emergency-contacts"!</div>
}
