import { Link, Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/app')({
  component: AppLayoutComponent,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        // search: {
        //   redirect: location.href,
        // },
      })
    }
  },
})

function AppLayoutComponent() {
  return (
    <div className='flex w-full h-full'>
      <aside className='w-40 border-r flex flex-col gap-20'>
        App Layout
        <Link to='/app/monitoring'>Monitoreo</Link>
        <Link to='/app/safe-points'>Puntos Violetas</Link>
        <Link to='/app/users'>Usuarios</Link>
        <Link to='/app/alerts'>Alertas</Link>
        <Link to='/app/emergency-contacts'>Directorio de Seguridad</Link>
      </aside>
      
      <main className='flex-1'>
        <Outlet />
      </main>
    </div>
  )
}
