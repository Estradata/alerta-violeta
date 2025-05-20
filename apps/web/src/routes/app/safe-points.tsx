import { Auth } from '@/auth'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
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
import { getDefaultRedirect } from '@/features/auth/utils/get-default-redirect'
import { useSafePoints } from '@/features/safe-points/api/get-safe-points'
import { useUpdateSafePoint } from '@/features/safe-points/api/update-safe-point'
import { CreateSafePoint } from '@/features/safe-points/components/create-safe-point'
import { SafePointMapMarker } from '@/features/safe-points/components/safe-point-marker'
import { SafePointsList } from '@/features/safe-points/components/safe-points-list'
import { useAutocompleteSuggestions } from '@/hooks/use-autocomplete-suggestions'
import { useDebounce } from '@/hooks/use-debounce'
import { useDisclosure, type UseDisclosureReturn } from '@/hooks/use-disclosure'
import { hasAuthorization } from '@packages/admin-permissions/has-authorization'
import type { SafePointData } from '@packages/safe-points/schema'
import { createFileRoute, redirect } from '@tanstack/react-router'
import {
  APIProvider,
  Map,
  Marker,
  useMap,
  type MapMouseEvent,
} from '@vis.gl/react-google-maps'
import { MenuIcon, PlusIcon, SaveIcon, Search, XIcon } from 'lucide-react'
import { useCallback, useMemo, useRef, useState } from 'react'

export const Route = createFileRoute('/app/safe-points')({
  component: RouteComponent,
  beforeLoad({ context }) {
    if (!hasAuthorization(context.auth.user?.permissions, 'SAFE_POINTS')) {
      throw redirect({ to: getDefaultRedirect(context.auth.user) })
    }
  },
})

function RouteComponent() {
  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <Content />
    </APIProvider>
  )
}

export type Marker = google.maps.LatLngLiteral & {
  safePointId?: string
  name?: string
  address?: string
  googlePlaceId?: string
}

function Content() {
  const defaultCenter = { lat: 20.66682, lng: -103.39182 }
  const defaultZoom = 10
  const result = useSafePoints()
  const updateMutation = useUpdateSafePoint()
  const safePoints = result.data?.data || []
  const sheet = useDisclosure()
  const autocomplete = useDisclosure()
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null)
  const [markerMode, setMarkerMode] = useState<'create' | 'edit' | null>(null)
  const [marker, setMarker] = useState<Marker | null>(null)
  const map = useMap()

  function resetMarker() {
    setMarkerMode(null)
    setMarker(null)
  }

  function handleMapClick(event: MapMouseEvent) {
    if (!markerMode) return

    if (event.detail.latLng) {
      const lat = event.detail.latLng.lat
      const lng = event.detail.latLng.lng

      setMarker((prev) => ({
        ...prev,
        lat,
        lng,
      }))
    }
  }

  function onAutocompletePlaceSelect(place: Place) {
    if (!map) return

    if (place.lat && place.lng) {
      const location = { lat: place.lat, lng: place.lng }

      /**
       * Create new marker
       */
      setMarkerMode('create')
      setMarker({
        ...location,
        name: place.mainText,
        address: place.address,
        googlePlaceId: place.id,
      })

      /**
       * Center new point
       */
      map.setCenter(location)
      map.setZoom(12)
    }

    autocomplete.onClose()
  }

  function onEditMarkerPosition(marker: Marker) {
    sheet.onClose()
    setMarkerMode('edit')
    setMarker(marker)
    map?.setCenter({ lat: marker.lat, lng: marker.lng })
    map?.setZoom(13)
  }

  function onSaveSafePoint() {
    const data = safePoints.find((p) => p.id === marker?.safePointId)
    if (!data || !marker) return

    updateMutation.mutate({
      ...data,
      type: data.type as SafePointData['type'],
      lat: marker?.lat,
      lng: marker?.lng,
    })

    resetMarker()
  }

  const filteredPoints = markerMode === 'edit' ? [] : safePoints

  return (
    <div
      className='flex flex-col h-full'
      onClick={(e) => {
        if (!autocomplete.open) return

        const id = (e.target as unknown as { id: string })?.id
        if (id !== 'autocomplete-input') autocomplete.onClose()
      }}
    >
      {/* Barra superior con búsqueda y botón de menú */}
      <div className='absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-sidebar gap-4'>
        <Auth module='SAFE_POINTS' action='UPDATE' fallback={<div />}>
          <AutocompleteControl
            onPlaceSelect={onAutocompletePlaceSelect}
            {...autocomplete}
          />
        </Auth>

        <div className='flex items-center gap-1 md:gap-2'>
          <Auth module='SAFE_POINTS' action='UPDATE'>
            {markerMode === null && (
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

            {markerMode === 'create' && (
              <>
                <Button size='icon' variant='outline' onClick={resetMarker}>
                  <XIcon className='h-4 w-4' />
                  <span className='sr-only'>Cancelar</span>
                </Button>

                <CreateSafePoint
                  disabled={!marker}
                  clearMarker={resetMarker}
                  data={{
                    name: marker?.name,
                    address: marker?.address,
                    googlePlaceId: marker?.googlePlaceId,
                    lat: marker?.lat || 0,
                    lng: marker?.lng || 0,
                  }}
                />
              </>
            )}

            {markerMode === 'edit' && (
              <>
                <Button size='icon' variant='outline' onClick={resetMarker}>
                  <XIcon className='h-4 w-4' />
                  <span className='sr-only'>Cancelar</span>
                </Button>

                <Button size='icon' onClick={onSaveSafePoint}>
                  <SaveIcon className='h-4 w-4' />
                  <span className='sr-only'>
                    Guardar nueva ubicación del punto
                  </span>
                </Button>
              </>
            )}
          </Auth>

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
                onEditMarkerPosition={onEditMarkerPosition}
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

        {filteredPoints.map((point, i) => {
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

type Place = {
  id: string
  mainText: string
  secondaryText: string
  text: string
  address: string
  lat: number | undefined
  lng: number | undefined
}
function AutocompleteControl({
  onPlaceSelect,
  ...control
}: {
  onPlaceSelect: (place: Place) => void
} & UseDisclosureReturn) {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { suggestions, isLoading } = useAutocompleteSuggestions(searchQuery)
  const handleInputChange = useDebounce((text: string) => {
    setSearchQuery(text)
  }, 500)

  const handleSelect = useCallback(
    async (prediction: google.maps.places.PlacePrediction | string) => {
      if (typeof prediction === 'string') return

      const place = prediction.toPlace()
      const details = await place.fetchFields({
        fields: ['location', 'formattedAddress'],
      })

      const data = {
        id: place.id,
        mainText: prediction.mainText?.text || '',
        secondaryText: prediction.secondaryText?.text || '',
        text: prediction.text.text || '',
        address: details.place.formattedAddress || '',
        lat: details.place.location?.lat(),
        lng: details.place.location?.lng(),
      }

      onPlaceSelect(data)
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
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => control.onOpen()}
          />
        </div>
      </div>

      {control.open && (
        <div className='absolute top-full left-0 right-0 w-full mt-1 z-50'>
          <Command className='rounded-lg border shadow-md bg-white'>
            <CommandList className='max-h-[300px] overflow-auto'>
              {!isLoading && (
                <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              )}

              {isLoading ? (
                <CommandEmpty>Buscando...</CommandEmpty>
              ) : (
                predictions.map((prediction) => {
                  return (
                    <CommandItem
                      key={prediction.placeId}
                      className='flex flex-col items-start py-2 cursor-pointer'
                      onSelect={() => {
                        handleSelect(prediction)
                      }}
                    >
                      <div className='font-medium'>
                        {prediction.mainText?.text || ''}
                      </div>
                      <div className='text-xs text-muted-foreground'>
                        {prediction.text.text}
                      </div>
                      <div className='text-xs text-muted-foreground'>
                        {prediction.secondaryText?.text}
                      </div>
                    </CommandItem>
                  )
                })
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  )
}
