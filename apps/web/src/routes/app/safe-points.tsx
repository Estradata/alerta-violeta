import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { GOOGLE_MAPS_API_KEY } from '@/config'
import { AlertMapMarker } from '@/features/monitoring/components/alert-map-marker'
import { createFileRoute } from '@tanstack/react-router'
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps'
import { ShieldIcon } from 'lucide-react'
import { useState } from 'react'

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
    {
      id: '1',
      position: { lat: 20.6845, lng: -103.3495 },
      name: 'Parque Mirador de los Arcos',
    },
    {
      id: '2',
      position: { lat: 20.6879, lng: -103.432 },
      name: 'Plaza Encino Real',
    },
    {
      id: '3',
      position: { lat: 20.6383, lng: -103.3967 },
      name: 'Centro Cultural Santa Clara',
    },
    {
      id: '4',
      position: { lat: 20.725, lng: -103.2902 },
      name: 'Jardines de los Agaves',
    },
    {
      id: '5',
      position: { lat: 20.6789, lng: -103.3731 },
      name: 'Mercado Nueva Esperanza',
    },
  ]

  const [selectedPoint, setSelectedPoint] = useState<string | null>(null)

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

        {points.map((point, i) => {
          return (
            <SafePointMapMarker
              point={point}
              key={i}
              selected={selectedPoint === point.id}
              selectPoint={setSelectedPoint}
            />
          )
        })}
      </Map>
    </APIProvider>
  )
}

function SafePointMapMarker({
  point,
  selected,
  selectPoint,
}: {
  point: {
    id: string
    name: string
    position: { lat: number; lng: number }
  }
  selected?: boolean
  selectPoint: (id: string | null) => void
}) {
  return (
    <Popover
      open={selected}
      onOpenChange={(open) => {
        if (!open) selectPoint(null)
      }}
    >
      <PopoverTrigger asChild>
        <AdvancedMarker
          position={point.position}
          onClick={() => {
            selectPoint(point.id)
          }}
        >
          <div>
            <ShieldIcon className='h-10 w-auto stroke-purple-900 fill-purple-400 stroke-[1.2]' />
          </div>
        </AdvancedMarker>
      </PopoverTrigger>

      <PopoverContent className='w-56'>
        <div>
          <h1 className='text-sm font-medium'>{point.name}</h1>
        </div>
      </PopoverContent>
    </Popover>
  )
}
