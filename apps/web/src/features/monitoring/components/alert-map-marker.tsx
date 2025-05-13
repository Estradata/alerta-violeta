import { CustomMapPin } from '@/components/custom-map-pin'
import { AdvancedMarker } from '@vis.gl/react-google-maps'

export function AlertMapMarker({
  position,
}: {
  position: { lat: number; lng: number }
}) {
  return (
    <AdvancedMarker position={position}>
      <div className='relative flex justify-center items-center circles'>
        {/* Ripple Animation */}
        <span className='circle-1'></span>
        <span className='circle-2'></span>
        <span className='circle-3'></span>

        <CustomMapPin />
      </div>
    </AdvancedMarker>
  )
}
