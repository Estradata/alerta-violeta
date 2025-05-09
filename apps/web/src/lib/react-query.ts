import { QueryClient } from '@tanstack/react-query'

// TODO: REWRITE queryClient.invalidateQueries calls
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})
