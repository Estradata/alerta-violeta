import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { GOOGLE_MAPS_API_KEY } from '@/config'
import { useSafePoints } from '@/features/safe-points/api/get-safe-points'
import { CreateSafePoint } from '@/features/safe-points/components/create-safe-point'
import { SafePointMapMarker } from '@/features/safe-points/components/safe-point-marker'
import { SafePointsList } from '@/features/safe-points/components/safe-points-list'
import { useDisclosure } from '@/hooks/use-disclosure'
import { createFileRoute } from '@tanstack/react-router'
import {
  APIProvider,
  Map,
  Marker,
  useMap,
  type MapMouseEvent,
} from '@vis.gl/react-google-maps'
import { MenuIcon, Search } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/app/safe-points')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <Content />
    </APIProvider>
  )
}

function Content() {
  const defaultCenter = { lat: 20.66682, lng: -103.39182 }
  const defaultZoom = 10
  const result = useSafePoints()
  const safePoints = result.data?.data || []
  const sheet = useDisclosure()

  const [selectedPoint, setSelectedPoint] = useState<string | null>(null)
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  function handleMapClick(event: MapMouseEvent) {
    if (event.detail.latLng) {
      const lat = event.detail.latLng.lat
      const lng = event.detail.latLng.lng
      setMarkerPosition({ lat, lng })
    }
  }

  function clearMarker() {
    setMarkerPosition(null)
  }

  const map = useMap()

  return (
    <div className='flex flex-col h-full'>
      {/* Barra superior con búsqueda y botón de menú */}
      <div className='absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-sidebar'>
        <div className='flex items-center w-full max-w-md'>
          <div className='relative w-full'>
            <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Buscar lugares...'
              className='pl-8 pr-4 shadow-none'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <CreateSafePoint
            disabled={!markerPosition}
            data={{
              lat: markerPosition?.lat || 0,
              lng: markerPosition?.lng || 0,
            }}
            clearMarker={clearMarker}
          />

          <Sheet open={sheet.open} onOpenChange={sheet.onOpenChange}>
            <SheetTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                onClick={() => sheet.onOpen()}
              >
                <MenuIcon className='h-4 w-4' />
                <span className='sr-only'>Menú</span>
              </Button>
            </SheetTrigger>

            <SheetContent side='right' className='w-[300px] sm:w-[400px] p-4'>
              <SheetTitle className='text-lg font-semibold mb-4'>
                Puntos marcados ({safePoints.length})
              </SheetTitle>

              <SafePointsList
                safePoints={safePoints}
                onClick={(p) => {
                  sheet.onClose()

                  console.log({ map })
                  map?.setCenter({ lat: p.lat, lng: p.lng })
                  map?.setZoom(13)
                }}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Map
        mapId='SAFE_POINTS_MAP'
        className='flex-1 w-full'
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        disableDefaultUI={true}
        onClick={handleMapClick}
      >
        {markerPosition && <Marker position={markerPosition} />}

        {safePoints.map((point, i) => {
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
    </div>
  )
}
