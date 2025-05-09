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
  return (
    <div>
      <h1>App Layout</h1>
      <Outlet />
    </div>
  )
}
