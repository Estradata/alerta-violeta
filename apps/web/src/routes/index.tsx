import Pattern from '@/components/pattern'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

const avatars = [
  {
    src: 'https://github.com/shadcn.png',
    alt: 'Shadcn',
  },
  {
    src: 'https://github.com/shadcn.png',
    alt: 'Shadcn',
  },
  {
    src: 'https://github.com/shadcn.png',
    alt: 'Shadcn',
  },
  {
    src: 'https://github.com/shadcn.png',
    alt: 'Shadcn',
  },
  {
    src: 'https://github.com/shadcn.png',
    alt: 'Shadcn',
  },
  {
    src: '/plus.svg',
    alt: 'Shadcn',
  },
]

function HomeComponent() {
  return (
    <div className='min-h-full'>
      <div className='w-full min-h-screen flex flex-col'>
        <div className='bg-[#f6f6f6] w-full flex-1 grid grid-cols-12 pl-10 rounded-b-4xl relative'>
          <Pattern className='absolute -translate-x-1/6 [mask-image:linear-gradient(to_right,black,transparent)]' />

          <div className='w-full px-10 py-4 flex justify-end col-span-12'>
            <Button asChild className='rounded-sm'>
              <Link to='/login'>Iniciar sesión</Link>
            </Button>
          </div>

          <div className='w-full h-full flex flex-col items-start justify-center text-start gap-16 col-span-5'>
            <header>
              <h2 className='capitalize clear-start text-lg font-medium'>
                The best online clothing store
              </h2>

              <h1 className='text-6xl font-semibold tracking-tight capitalize'>
                Your one-stop <br />
                <span className='text-violet-600'>clothing store app</span>
              </h1>
            </header>

            <p className='text-muted-foreground'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
              obcaecati quas ducimus iste voluptatum suscipit voluptates.
              Corrupti omnis saepe quidem reprehenderit quasi incidunt cumque
              labore hic maxime! Quod, fugiat suscipit.
            </p>

            <div className='flex gap-5'>
              <img src='/app-store.svg' className='h-16 w-auto' />
              <img src='/google-play.svg' className='h-16 w-auto' />
            </div>

            <div className='flex -space-x-4'>
              {avatars.map((avatar, i) => {
                return (
                  <Avatar className='w-16 h-16 border-4 border-white' key={i}>
                    <AvatarImage src={avatar.src} />
                    <AvatarFallback>{avatar.alt}</AvatarFallback>
                  </Avatar>
                )
              })}
            </div>
          </div>

          <div className='w-full h-full flex justify-center items-end col-span-7'>
            <img src='/iphone.png' alt='Mockup' className='w-[400px] h-auto' />
          </div>
        </div>
      </div>

      {/* <div className='h-40 w-full'></div> */}
    </div>
  )
}
