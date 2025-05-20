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
  emergencyContactSchema,
  type EmergencyContactData,
} from '@packages/emergency-contacts/schema'
import { EmergencyContactForm } from '@/features/emergency-contacts/components/emergency-contact-form'
import { useUiStore } from '@/features/emergency-contacts/store/ui'
import { useUpdateEmergencyContact } from '@/features/emergency-contacts/api/update-emergency-contact'

export function UpdateEmergencyContact() {
  const data = useUiStore((s) => s.updateDialog.data)
  const open = useUiStore((s) => s.updateDialog.open)
  const onClose = useUiStore((s) => s.closeUpdateDialog)
  const form = useForm<EmergencyContactData>({
    resolver: zodResolver(emergencyContactSchema),
    values: {
      id: data?.id || '',
      name: data?.name || '',
      description: data?.description || '',
      phone: data?.phone || '',
    },
  })

  const updateMutation = useUpdateEmergencyContact({
    onSuccess() {
      onClose()
    },
  })

  function onSubmit(data: EmergencyContactData) {
    updateMutation.mutate(data)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Actualizar contacto</DialogTitle>
          <DialogDescription>
            Completa el formulario a continuación para actualizar un nuevo
            contacto. Proporciona toda la información requerida y asegúrate de
            que los datos ingresados sean correctos.
          </DialogDescription>
        </DialogHeader>

        <EmergencyContactForm
          onSubmit={onSubmit}
          form={form}
          type='update'
          isLoading={updateMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  )
}
