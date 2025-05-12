import { Button } from '@/components/ui/button'
import { useDisclosure } from '@/hooks/use-disclosure'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  safePointSchema,
  type SafePointData,
} from '@packages/safe-points/schema'
import { useCreateSafePoint } from '@/features/safe-points/api/create-safe-point'
import { SafePointForm } from '@/features/safe-points/components/safe-point-form'
import { useGlobalStore } from '@/store/global-store'

const defaultValues: SafePointData = {
  name: '',
  accountId: '',
  address: '',
  lat: 0,
  lng: 0,
  type: 'ONG',
}

export function CreateSafePoint({ className }: { className?: string }) {
  const user = useGlobalStore((s) => s.user!)
  const { open, onOpenChange, onClose } = useDisclosure()
  const form = useForm<SafePointData>({
    resolver: zodResolver(safePointSchema),
    defaultValues,
  })

  const createMutation = useCreateSafePoint({
    onSuccess() {
      onClose()
      form.reset(defaultValues)
    },
  })

  function onSubmit(data: SafePointData) {
    createMutation.mutate({
      ...data,
      accountId: user.accountId,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className={className}>Crear punto</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear punto</DialogTitle>
          <DialogDescription>
            Completa el formulario a continuación para crear una nueva area.
            Proporciona toda la información requerida y asegúrate de que los
            datos ingresados sean correctos.
          </DialogDescription>
        </DialogHeader>

        <SafePointForm
          onSubmit={onSubmit}
          form={form}
          type='create'
          isLoading={createMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  )
}
