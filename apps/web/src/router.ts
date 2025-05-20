import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

// Set up a Router instance
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  context: {
    auth: undefined!, // This will be set after we wrap the app in an AuthProvider
  },
})
