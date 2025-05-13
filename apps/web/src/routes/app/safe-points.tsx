import { GOOGLE_MAPS_API_KEY } from '@/config'
import { AlertMapMarker } from '@/features/monitoring/components/alert-map-marker'
import { createFileRoute } from '@tanstack/react-router'
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps'
import { ShieldIcon } from 'lucide-react'

export const Route = createFileRoute('/app/safe-points')({
  component: RouteComponent,
})

function RouteComponent() {
  const defaultCenter = { lat: 20.66682, lng: -103.39182 }

  const alerts = [
    { lat: 20.6845, lng: -103.3497 },
    { lat: 20.6712, lng: -103.4079 },
    { lat: 20.7158, lng: -103.3661 },
    { lat: 20.6501, lng: -103.2953 },
    { lat: 20.7356, lng: -103.4164 },
  ]

  const points = [
    { lat: 20.6845, lng: -103.3495 },
    { lat: 20.6879, lng: -103.432 },
    { lat: 20.6383, lng: -103.3967 },
    { lat: 20.725, lng: -103.2902 },
    { lat: 20.6789, lng: -103.3731 },
  ]

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <Map
        defaultCenter={defaultCenter}
        defaultZoom={10}
        mapId='DEMO_MAP_ID'
        disableDefaultUI={true}
      >
        {alerts.map((position, i) => {
          return <AlertMapMarker position={position} key={i} />
        })}

        {points.map((position, i) => {
          return <SafePointMapMarker position={position} key={i} />
        })}
      </Map>
    </APIProvider>
  )
}

function SafePointMapMarker({
  position,
}: {
  position: { lat: number; lng: number }
}) {
  return (
    <AdvancedMarker position={position}>
      <div>
        <ShieldIcon className='h-10 w-auto stroke-purple-900 fill-purple-400 stroke-[1.2]' />
      </div>
    </AdvancedMarker>
  )
}
