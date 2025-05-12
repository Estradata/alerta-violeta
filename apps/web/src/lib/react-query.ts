import { toast } from 'sonner'
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

export type MutationConfig<T> = {
  onSuccess?: (data: T) => void
  onServerError?: () => void
  onValidationError?: () => void
}

export function handleSuccess({
  queryKey,
  result,
  onSuccess,
}: {
  queryKey: string[] | string
  result: { data: { message: string; data?: unknown } }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & MutationConfig<any>) {
  /**
   * Reload fresh data
   */
  const keys = Array.isArray(queryKey) ? queryKey : [queryKey]
  queryClient.invalidateQueries({ queryKey: keys })

  /**
   * Print successful message
   */
  toast.success(result.data.message)

  /**
   * Invoke outside handler
   */
  onSuccess?.(result?.data)
}
