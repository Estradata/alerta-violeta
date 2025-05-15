import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DeleteSafePoints } from '@/features/safe-points/components/delete-safe-points'
import { UpdateSafePoint } from '@/features/safe-points/components/update-safe-point'
import { useUiStore } from '@/features/safe-points/store/ui'
import type { Marker } from '@/routes/app/safe-points'
import type { GetSafePointsResponse } from '@packages/safe-points/types'
import { EditIcon, MapIcon, Trash2Icon } from 'lucide-react'

type SP = GetSafePointsResponse['data'][number]

export function SafePointsList({
  onEditMarkerPosition,
  safePoints,
  onClick,
}: {
  onEditMarkerPosition: (marker: Marker) => void
  safePoints: SP[]
  onClick?: (data: SP) => void
}) {
  const openDeleteDialog = useUiStore((s) => s.openDeleteDialog)
  const openUpdateDialog = useUiStore((s) => s.openUpdateDialog)

  return (
    <div className='flex flex-col h-full'>
      <DeleteSafePoints />
      <UpdateSafePoint />

      {safePoints.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-40 text-muted-foreground'>
          <p>No hay puntos marcados</p>
          <p className='text-sm'>Haz clic en el mapa para añadir uno</p>
        </div>
      ) : (
        <ScrollArea className='flex-1 -mx-4 px-4 max-h-[600px]'>
          <ul className='space-y-3'>
            {safePoints.map((point) => (
              <li
                key={point.id}
                className='border rounded-lg p-3 hover:bg-muted/50 transition-colors'
                onClick={() => {
                  onClick?.(point)
                }}
              >
                <div className='flex items-start justify-between gap-4'>
                  <h3 className='font-medium'>{point.name}</h3>

                  <div className='flex space-x-1'>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-7 w-7'
                      onClick={(e) => {
                        e.stopPropagation()
                        onEditMarkerPosition({
                          safePointId: point.id,
                          
                          lat: point.lat,
                          lng: point.lng,
                          address: point.address,
                          googlePlaceId: point.googlePlaceId || '',
                          name: point.name,
                        })
                      }}
                    >
                      <MapIcon className='h-4 w-4' />
                      <span className='sr-only'>
                        Editar posición en el mapa
                      </span>
                    </Button>

                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-7 w-7'
                      onClick={(e) => {
                        e.stopPropagation()
                        openUpdateDialog(point)
                      }}
                    >
                      <EditIcon className='h-4 w-4' />
                      <span className='sr-only'>Editar datos</span>
                    </Button>

                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-7 w-7 text-destructive hover:text-destructive'
                      onClick={(e) => {
                        e.stopPropagation()
                        openDeleteDialog([point])
                      }}
                    >
                      <Trash2Icon className='h-4 w-4' />
                      <span className='sr-only'>Eliminar</span>
                    </Button>
                  </div>
                </div>

                <div>
                  <p className='text-sm text-muted-foreground line-clamp-2'>
                    {point.address}
                  </p>

                  <div className='mt-2'>
                    <Badge variant='outline' className='text-xs'>
                      {point.type as string}
                    </Badge>
                  </div>
                </div>

                <div className='mt-2 text-xs text-muted-foreground'>
                  <span>Lat: {point.lat.toFixed(4)}, </span>
                  <span>Long: {point.lng.toFixed(4)}</span>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </div>
  )
}
