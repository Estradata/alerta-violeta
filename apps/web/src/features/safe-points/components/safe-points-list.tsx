import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { GetSafePointsResponse } from '@packages/safe-points/types'
import { EditIcon, Trash2Icon } from 'lucide-react'

type SP = GetSafePointsResponse['data'][number]

export function SafePointsList({
  safePoints,
  onClick,
}: {
  safePoints: SP[]
  onClick?: (data: SP) => void
}) {
  return (
    <div className='flex flex-col h-full'>
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
                <div className='flex items-start justify-between'>
                  <div>
                    <h3 className='font-medium'>{point.name}</h3>

                    <p className='text-sm text-muted-foreground line-clamp-2'>
                      {point.address}
                    </p>

                    <div className='mt-2'>
                      <Badge variant='outline' className='text-xs'>
                        {point.type as string}
                      </Badge>
                    </div>
                  </div>

                  <div className='flex space-x-1'>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-7 w-7'
                      // onClick={() => onEdit(point)}
                    >
                      <EditIcon className='h-4 w-4' />
                      <span className='sr-only'>Editar</span>
                    </Button>

                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-7 w-7 text-destructive hover:text-destructive'
                      // onClick={() => onDelete(point.id)}
                    >
                      <Trash2Icon className='h-4 w-4' />
                      <span className='sr-only'>Eliminar</span>
                    </Button>
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
