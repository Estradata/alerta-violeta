import { useAuth } from '@/auth'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

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
  const auth = useAuth()

  return (
    <SidebarProvider className='h-full'>
      <AppSidebar user={auth.user!} />

      <SidebarInset className='overflow-hidden'>
        <main
          className='h-full w-full'
          // className='py-12 px-4 sm:px-6 lg:px-8 h-full'
        >
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
