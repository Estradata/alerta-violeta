import { toast } from 'sonner'
import { QueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

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
  onValidationError?: (errors: Record<string, string>) => void

  // Not Implemented for now, implement when needed
  // onServerError?: () => void
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

export function handleError({
  error,
  onValidationError,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: { error: Error } & MutationConfig<any>) {
  if (error instanceof AxiosError && error.response?.data) {
    const response = error.response.data as {
      name?: string
      data?: Record<string, string>
    }

    if (response.name === 'ValidationError' && response.data) {
      onValidationError?.(response.data)
    }
  }
}
