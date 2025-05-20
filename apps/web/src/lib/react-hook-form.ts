import type { UseFormSetError } from 'react-hook-form'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function applyFormErrors<T extends Record<string, any>>(
  setError: UseFormSetError<T>,
  errors: Record<string, string>
) {
  console.log('errors', errors)

  Object.entries(errors).forEach(([field, message]) => {
    // @ts-expect-error idgaf
    setError(field as keyof T, {
      type: 'manual',
      message,
    })
  })
}
