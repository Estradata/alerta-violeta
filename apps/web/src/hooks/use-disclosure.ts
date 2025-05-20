import { useCallback, useState } from 'react'

export type UseDisclosureReturn = {
  open: boolean
  onOpen: () => void
  onClose: () => void
  onToggle: () => void
  onOpenChange: (v: boolean) => void
}

export function useDisclosure(initialValue = false): UseDisclosureReturn {
  const [open, setOpen] = useState(initialValue)

  const onOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const onClose = useCallback(() => {
    setOpen(false)
  }, [])

  const onToggle = useCallback(() => {
    setOpen((v) => !v)
  }, [])

  const onOpenChange = useCallback((v: boolean) => {
    setOpen(v)
  }, [])

  return {
    open,
    onOpen,
    onClose,
    onToggle,
    onOpenChange,
  }
}
