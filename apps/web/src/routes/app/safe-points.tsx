import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
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
import { useAutocompleteSuggestions } from '@/hooks/use-autocomplete-suggestions'
import { useDisclosure, type UseDisclosureReturn } from '@/hooks/use-disclosure'
import { createFileRoute } from '@tanstack/react-router'
import {
  APIProvider,
  Map,
  Marker,
  useMap,
  type MapMouseEvent,
} from '@vis.gl/react-google-maps'
import { MenuIcon, PlusIcon, Search, XIcon } from 'lucide-react'
import { useCallback, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'

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
  const autocomplete = useDisclosure()
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null)
  const [markerMode, setMarkerMode] = useState<'create' | 'edit' | null>(null)
  const [marker, setMarker] = useState<google.maps.LatLngLiteral | null>(null)

  function handleMapClick(event: MapMouseEvent) {
    if (!markerMode) return

    if (event.detail.latLng) {
      const lat = event.detail.latLng.lat
      const lng = event.detail.latLng.lng
      setMarker({ lat, lng })
    }
  }

  function clearMarker() {
    setMarkerMode(null)
    setMarker(null)
  }

  const map = useMap()

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.Place | null>(null)

  return (
    <div
      className='flex flex-col h-full bg-red-400'
      onClick={(e) => {
        if (!autocomplete.open) return

        const id = (e.target as unknown as { id: string })?.id
        if (id !== 'autocomplete-input') autocomplete.onClose()
      }}
    >
      {/* Barra superior con búsqueda y botón de menú */}
      <div className='absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-sidebar'>
        <AutocompleteControl
          onPlaceSelect={setSelectedPlace}
          {...autocomplete}
        />

        <div className='flex items-center gap-2'>
          {markerMode ? (
            <>
              <Button size='icon' variant='outline' onClick={clearMarker}>
                <XIcon className='h-4 w-4' />
                <span className='sr-only'>Cancelar</span>
              </Button>

              <CreateSafePoint
                disabled={!marker}
                clearMarker={clearMarker}
                data={{
                  lat: marker?.lat || 0,
                  lng: marker?.lng || 0,
                }}
              />
            </>
          ) : (
            <Button
              size='icon'
              onClick={() => {
                setMarkerMode('create')
              }}
            >
              <PlusIcon className='h-4 w-4' />
              <span className='sr-only'>Añadir punto</span>
            </Button>
          )}

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
        {marker && <Marker position={marker} />}

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

function AutocompleteControl({
  onPlaceSelect,
  ...control
}: {
  onPlaceSelect: (place: google.maps.places.Place | null) => void
} & UseDisclosureReturn) {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const { suggestions, resetSession, isLoading } =
    useAutocompleteSuggestions(searchQuery)

  const handleInputChange = useCallback(
    (value: google.maps.places.PlacePrediction | string) => {
      if (typeof value === 'string') {
        setSearchQuery(value)
      }
    },
    []
  )

  const handleSelect = useCallback(
    (prediction: google.maps.places.PlacePrediction | string) => {
      if (typeof prediction === 'string') return

      const place = prediction.toPlace()
      place
        .fetchFields({
          fields: [
            'viewport',
            'location',
            'svgIconMaskURI',
            'iconBackgroundColor',
          ],
        })
        .then(() => {
          resetSession()
          onPlaceSelect(place)
          setSearchQuery('')
        })
    },
    [onPlaceSelect]
  )

  const predictions = useMemo(
    () =>
      suggestions
        .filter((suggestion) => suggestion.placePrediction)
        .map(({ placePrediction }) => placePrediction!),
    [suggestions]
  )

  const items = [
    {
      id: '1',
      name: 'Parque Nacional Torres del Paine',
      location: 'Patagonia, Chile',
      category: 'Parques Nacionales',
    },
    {
      id: '2',
      name: 'Machu Picchu',
      location: 'Cusco, Perú',
      category: 'Sitios Históricos',
    },
    {
      id: '3',
      name: 'Playa del Carmen',
      location: 'Quintana Roo, México',
      category: 'Playas',
    },
    {
      id: '4',
      name: 'Cataratas del Iguazú',
      location: 'Argentina/Brasil',
      category: 'Maravillas Naturales',
    },
    {
      id: '5',
      name: 'Cartagena de Indias',
      location: 'Colombia',
      category: 'Ciudades Coloniales',
    },
    {
      id: '6',
      name: 'Salar de Uyuni',
      location: 'Bolivia',
      category: 'Paisajes Únicos',
    },
  ]

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className='w-full max-w-md relative'>
      <div className='flex items-center w-full max-w-md'>
        <div className='relative w-full'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            id='autocomplete-input'
            ref={inputRef}
            placeholder='Buscar lugares...'
            className='pl-8 pr-4 shadow-none'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => control.onOpen()}
          />
        </div>
      </div>

      {control.open && (
        <div className='absolute top-full left-0 right-0 w-full mt-1 z-50'>
          <Command className='rounded-lg border shadow-md bg-white'>
            <CommandList className='max-h-[300px] overflow-auto'>
              <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              {Object.entries(
                items.reduce(
                  (acc, item) => {
                    if (!acc[item.category]) {
                      acc[item.category] = []
                    }
                    acc[item.category].push(item)
                    return acc
                  },
                  {} as Record<string, typeof items>
                )
              ).map(([category, categoryItems]) => (
                <CommandGroup key={category} heading={category}>
                  {categoryItems.map((item) => (
                    <CommandItem
                      key={item.id}
                      className='flex flex-col items-start py-2 cursor-pointer'
                      onSelect={() => {
                        control.onClose()
                        toast.success('ok')
                      }}
                    >
                      <div className='font-medium'>{item.name}</div>
                      <div className='text-xs text-muted-foreground'>
                        {item.location}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  )
}
