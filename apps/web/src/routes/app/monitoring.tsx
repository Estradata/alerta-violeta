import { GOOGLE_MAPS_API_KEY } from '@/config'
import { createFileRoute } from '@tanstack/react-router'
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps'

export const Route = createFileRoute('/app/monitoring')({
  component: RouteComponent,
})

function RouteComponent() {
  const defaultCenter = { lat: 20.66682, lng: -103.39182 }

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <Map defaultCenter={defaultCenter} defaultZoom={10} mapId='DEMO_MAP_ID'>
        <AdvancedMarker position={defaultCenter} />

      </Map>
    </APIProvider>
  )
}
