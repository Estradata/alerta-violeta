import { createFileRoute } from '@tanstack/react-router'
import { Ripple } from '@/components/pulse-alert'

export const Route = createFileRoute('/app/users')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/app/users"!
      {/* <MapAlertPulse showPulse /> */}
      <div className='flex w-full pt-10 flex-col items-center gap-8'>
        <Ripple />
        <Ripple />
        <Ripple />
        <Ripple />
        <Ripple />
      </div>
    </div>
  )
}
