import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { AdvancedMarker } from '@vis.gl/react-google-maps'
import { ShieldIcon } from 'lucide-react'

export function SafePointMapMarker({
  point,
  selected,
  selectPoint,
}: {
  point: {
    id: string
    name: string
    lat: number
    lng: number
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
          <h1 className='text-sm font-medium'>{point.name}</h1>
        </div>
      </PopoverContent>
    </Popover>
  )
}
