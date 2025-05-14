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
import { useAuth } from '@/auth'
import { CheckCheckIcon } from 'lucide-react'

const defaultValues: SafePointData = {
  name: '',
  accountId: '',
  address: '',
  lat: 0,
  lng: 0,
  type: 'ONG',
}

export function CreateSafePoint({
  disabled,
  data,
  clearMarker,
}: {
  disabled?: boolean
  clearMarker?: () => void
  data: {
    address?: string
    lat: number
    lng: number
  }
}) {
  const user = useAuth().user!
  const { open, onOpenChange, onClose } = useDisclosure()
  const form = useForm<SafePointData>({
    resolver: zodResolver(safePointSchema),
    values: {
      ...defaultValues,
      address: data?.address || '',
      lat: data?.lat || 0,
      lng: data?.lng || 0,
    },
  })

  const createMutation = useCreateSafePoint({
    onSuccess() {
      onClose()
      form.reset(defaultValues)
      clearMarker?.()
    },
  })

  function onSubmit(data: SafePointData) {
    console.log(data)
    createMutation.mutate({
      ...data,
      accountId: user.accountId,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size='icon' disabled={disabled}>
          <CheckCheckIcon className='h-4 w-4' />
          <span className='sr-only'>Añadir punto</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear punto</DialogTitle>
          <DialogDescription>
            Completa el formulario a continuación para crear un nuevo punto.
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
