import './globals.css'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { getStoredToken, useAuth } from './auth'
import { AppProvider } from '@/providers'
import { LoadingScreen } from '@/components/loading-screen'
import { axios } from '@/lib/axios'
import type { LoginResponse } from '@packages/auth/types'

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  context: {
    auth: undefined!, // This will be set after we wrap the app in an AuthProvider
  },
})

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  const auth = useAuth()
  const { login } = auth
  const [loadingAuth, setLoadingAuth] = useState(() =>
    Boolean(getStoredToken())
  )

  useEffect(() => {
    if (!loadingAuth) return

    axios
      .post<LoginResponse>('/auth/verify')
      .then((result) => {
        login(result.data.data.user, result.data.data.token)
      })
      .finally(() => {
        setLoadingAuth(false)
      })
  }, [loadingAuth, login])

  if (loadingAuth) {
    return <LoadingScreen />
  }

  return (
    <AppProvider>
      <RouterProvider router={router} context={{ auth }} />
    </AppProvider>
  )
}

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
