import { useAuth } from '@/auth'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const auth = useAuth()

  return (
    <div>
      Hello "/app/dashboard"!
      <Button onClick={() => auth.logout()}>logout</Button>
    </div>
  )
}
