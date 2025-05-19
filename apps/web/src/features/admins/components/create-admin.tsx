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
import { type AdminData, adminSchema } from '@packages/auth-admin/schema'
import { AdminForm } from '@/features/admins/components/admin-form'

const defaultValues: AdminData = {
  name: '',
  accountId: '',
  email: '',
  password: '',
  customPermissions: [
    {
      action: 'view',
      module: 'admin',
    },
  ],
}

export function CreateAdmin() {
  const { open, onOpenChange } = useDisclosure()
  const form = useForm<AdminData>({
    resolver: zodResolver(adminSchema),
    defaultValues,
  })

  function onSubmit(data: AdminData) {
    console.log(data)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size='sm'>Crear administrador</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear administrador</DialogTitle>
          <DialogDescription>
            Completa el formulario a continuación para crear un nuevo
            administrador. Proporciona toda la información requerida y asegúrate
            de que los datos ingresados sean correctos.
          </DialogDescription>
        </DialogHeader>

        <AdminForm
          onSubmit={onSubmit}
          form={form}
          type='create'
          isLoading={false}
        />
      </DialogContent>
    </Dialog>
  )
}
