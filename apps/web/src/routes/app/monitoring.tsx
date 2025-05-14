import { GOOGLE_MAPS_API_KEY } from '@/config'
import { createFileRoute } from '@tanstack/react-router'
import { APIProvider, Map } from '@vis.gl/react-google-maps'
import { AlertMapMarker } from '@/features/monitoring/components/alert-map-marker'

export const Route = createFileRoute('/app/monitoring')({
  component: RouteComponent,
})

function RouteComponent() {
  const defaultCenter = { lat: 20.66682, lng: -103.39182 }

  const randomPoints = [
    { lat: 20.6845, lng: -103.3497 },
    { lat: 20.6712, lng: -103.4079 },
    { lat: 20.7158, lng: -103.3661 },
    { lat: 20.6501, lng: -103.2953 },
    { lat: 20.7356, lng: -103.4164 },
    { lat: 20.668, lng: -103.3412 },
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
        {randomPoints.map((position, i) => {
          return <AlertMapMarker position={position} key={i} />
        })}
      </Map>
    </APIProvider>
  )
}
