import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  safePointSchema,
  type SafePointData,
} from '@packages/safe-points/schema'
import { SafePointForm } from '@/features/safe-points/components/safe-point-form'
import { useUiStore } from '@/features/safe-points/store/ui'
import { useAuth } from '@/auth'
import { useUpdateSafePoint } from '@/features/safe-points/api/update-safe-point'

export function UpdateSafePoint() {
  const user = useAuth().user!
  const data = useUiStore((s) => s.updateDialog.data)
  const open = useUiStore((s) => s.updateDialog.open)
  const onClose = useUiStore((s) => s.closeUpdateDialog)
  const form = useForm<SafePointData>({
    resolver: zodResolver(safePointSchema),
    values: {
      id: data?.id || '',
      accountId: user.accountId,
      name: data?.name || '',
      googlePlaceId: data?.googlePlaceId || null,
      address: data?.address || '',
      lat: data?.lat || 0,
      lng: data?.lng || 0,
      type: (data?.type || 'ONG') as SafePointData['type'],
    },
  })

  const updateMutation = useUpdateSafePoint({
    onSuccess() {
      onClose()
    },
  })

  function onSubmit(data: SafePointData) {
    updateMutation.mutate({
      ...data,
      accountId: user.accountId,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Actualizar punto</DialogTitle>
          <DialogDescription>
            Completa el formulario a continuación para actualizar un nuevo
            punto. Proporciona toda la información requerida y asegúrate de que
            los datos ingresados sean correctos.
          </DialogDescription>
        </DialogHeader>

        <SafePointForm
          onSubmit={onSubmit}
          form={form}
          type='update'
          isLoading={updateMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  )
}
