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
  emergencyContactSchema,
  type EmergencyContactData,
} from '@packages/emergency-contacts/schema'
import { useCreateEmergencyContact } from '@/features/emergency-contacts/api/create-emergency-contact'
import { EmergencyContactForm } from '@/features/emergency-contacts/components/emergency-contact-form'
import { useAuth } from '@/auth'

const defaultValues: EmergencyContactData = {
  name: '',
  accountId: '',
  description: '',
  phone: '',
}

export function CreateEmergencyContact({ className }: { className?: string }) {
  const user = useAuth().user!
  const { open, onOpenChange, onClose } = useDisclosure()
  const form = useForm<EmergencyContactData>({
    resolver: zodResolver(emergencyContactSchema),
    defaultValues,
  })

  const createMutation = useCreateEmergencyContact({
    onSuccess() {
      onClose()
      form.reset(defaultValues)
    },
  })

  function onSubmit(data: EmergencyContactData) {
    createMutation.mutate({
      ...data,
      accountId: user.accountId,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className={className} size='sm'>
          Crear contacto
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear contacto</DialogTitle>
          <DialogDescription>
            Completa el formulario a continuación para crear un nuevo contacto.
            Proporciona toda la información requerida y asegúrate de que los
            datos ingresados sean correctos.
          </DialogDescription>
        </DialogHeader>

        <EmergencyContactForm
          onSubmit={onSubmit}
          form={form}
          type='create'
          isLoading={createMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  )
}
