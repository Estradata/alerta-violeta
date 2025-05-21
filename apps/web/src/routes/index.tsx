import Pattern from '@/components/pattern'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config'
import { cn } from '@/lib/utils'
import { createFileRoute, Link } from '@tanstack/react-router'
import { MapPinnedIcon, ShieldAlertIcon } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

const avatars = [
  {
    src: '/pp-1.png',
    alt: 'Avatar 1',
  },
  {
    src: '/pp-2.png',
    alt: 'Avatar 2',
  },
  {
    src: '/pp-3.png',
    alt: 'Avatar 3',
  },
  {
    src: '/pp-4.png',
    alt: 'Avatar 4',
  },
  {
    src: '/plus.svg',
    alt: 'Y más',
  },
]

function HomeComponent() {
  return (
    <div className='w-full flex flex-col min-h-screen overflow-hidden'>
      <div className='bg-[#f6f6f6] w-full flex-1 grid grid-cols-12 pl-10 relative'>
        <Pattern className='absolute md:-translate-x-1/6    [mask-image:linear-gradient(to_top,black,transparent)]  md:[mask-image:linear-gradient(to_right,black,transparent)] -bottom-60 md:top-0' />

        <div className='w-full px-10 py-4 flex justify-end col-span-12 absolute top-0 left-0'>
          <Button
            asChild
            size='lg'
            className='rounded-full bg-violet-600 hover:bg-violet-900'
          >
            <Link to='/login'>Iniciar sesión</Link>
          </Button>
        </div>

        <div className='w-full h-full flex flex-col items-start justify-start md:justify-center text-start gap-20 col-span-12 md:col-span-5 pt-32 md:pt-0 min-h-screen'>
          <header className='flex flex-col items-start text-start gap-5'>
            <h2 className='capitalize clear-start text-base md:text-lg font-medium'>
              Plataforma integral de gestión de emergencias
            </h2>

            <h1 className='text-5xl md:text-6xl font-semibold tracking-tight capitalize'>
              Protege con{' '}
              <span className='text-violet-600'>{siteConfig.name}</span>
            </h1>

            <p className='text-muted-foreground'>
              Visualiza y atiende alertas en tiempo real, gestiona espacios
              seguros y directorios de apoyo, revisa eventos pasados y obtén
              reportes detallados para mejorar la respuesta ciudadana.
            </p>
          </header>

          <div className='flex gap-5 h-16'>
            <img src='/app-store.svg' className='h-16 w-auto' />
            <img src='/google-play.svg' className='h-16 w-auto' />
          </div>

          <div className='flex gap-10 items-center'>
            <div className='flex -space-x-4'>
              {avatars.map((avatar, i) => {
                return (
                  <Avatar className='w-16 h-16 border-4 border-white' key={i}>
                    <AvatarImage src={avatar.src} />
                    <AvatarFallback className='bg-white'></AvatarFallback>
                  </Avatar>
                )
              })}
            </div>

            <div>
              <p className='text-4xl font-semibold'>50k+</p>
              <p className='text-muted-foreground'>Usuarios protegidos</p>
            </div>
          </div>
        </div>

        <div className='w-full h-full flex justify-center items-end col-span-12 md:col-span-7'>
          <div className='relative'>
            <FloatingBadge
              position='top-right'
              icon={<MapPinnedIcon className='size-4 md:size-6'/>}
              text='Gestión de puntos seguros'
            />

            <FloatingBadge
              position='bottom-left'
              icon={<ShieldAlertIcon className='size-4 md:size-6'/>}
              text='Alertas en tiempo real'
              delayClass='delay-1'
            />

            <div className='absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2'>
              <img src='/figure.svg' />
            </div>

            <img
              src='/shot.png'
              alt='Mockup'
              className=' w-[300px] md:w-[400px] h-auto z-50'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

type FloatingBadgeProps = {
  position: 'top-right' | 'bottom-left'
  icon: React.ReactNode
  text: string
  delayClass?: string
}
function FloatingBadge({
  position,
  icon,
  text,
  delayClass = '',
}: FloatingBadgeProps) {
  const isTopRight = position === 'top-right'

  return (
    <div
      className={cn(
        `absolute ${
          isTopRight
            ? 'right-0 md:right-0 top-20 translate-x-2/12 md:translate-x-1/2'
            : 'left-0 bottom-20 md:bottom-40  -translate-x-5/12 md:-translate-x-1/2'
        } rounded-full bg-white shadow-2xl flex items-center gap-3 p-2 pr-5 capitalize fade-in-once opacity-0 ${delayClass}`,
        'text-xs md:text-base',
        'pointer-events-none'
      )}
    >
      <div className='h-8 md:h-10 flex justify-center items-center aspect-square rounded-full bg-violet-600 text-white'>
        {icon}
      </div>

      {text}

      <div
        className={`absolute ${
          isTopRight
            ? '-right-2 -top-2 -translate-y-1/2 translate-x-1/2 rotate-180'
            : '-left-2 -bottom-2 translate-y-1/2 -translate-x-1/2'
        } opacity-0 an-opacity delay-2`}
      >
        <img src='/figure-2.svg' />
      </div>
    </div>
  )
}
