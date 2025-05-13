import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import { siteConfig } from '@/config'
import { LoginForm } from '@/features/auth/components/login-form'

const fallback = '/app/admins' as const

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || fallback })
    }
  },
  component: LoginComponent,
})

function LoginComponent() {
  return (
    <div className='container flex h-full w-full mx-auto justify-center items-center'>
      <div className='flex flex-col gap-10 items-center w-full md:max-w-sm'>
        <div className='w-full flex flex-col gap-3 items-center'>
          {/* <Logo /> */}

          <h1 className='text-2xl font-semibold'>{siteConfig.name}</h1>

          <div className='text-sm flex items-center gap-1 text-muted-foreground'>
            <p>¿No tienes una cuenta?</p>
            <Link to='/login' className='underline underline-offset-2'>
              Regístrate aquí
            </Link>
          </div>
        </div>

        <div className='w-full'>
          <LoginForm />
        </div>

        <div>
          <p className='text-sm text-muted-foreground text-center'>
            Lee más acerca de nuestros{' '}
            <Link to='.' className='underline underline-offset-2'>
              Términos y Condiciones
            </Link>
          </p>

          <p className='text-sm text-muted-foreground text-center'>
            Además de nuestro{' '}
            <Link to='.' className='underline underline-offset-2'>
              Aviso de Privacidad.
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
