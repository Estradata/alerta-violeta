import { Loader2Icon } from 'lucide-react'

export function LoadingScreen() {
  return (
    <div className='flex justify-center items-center w-full h-full'>
      <Loader2Icon className='animate-spin w-40' />
    </div>
  )
}
