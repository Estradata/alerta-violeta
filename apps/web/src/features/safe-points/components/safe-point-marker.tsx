import { Badge } from '@/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import type { GetSafePointsResponse } from '@packages/safe-points/types'
import { AdvancedMarker } from '@vis.gl/react-google-maps'
import { ShieldIcon } from 'lucide-react'

type SafePoint = GetSafePointsResponse['data'][number]

export function SafePointMapMarker({
  point,
  selected,
  selectPoint,
}: {
  point: SafePoint
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
          position={{ lat: point.lat, lng: point.lng }}
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
      </PopoverContent>
    </Popover>
  )
}
