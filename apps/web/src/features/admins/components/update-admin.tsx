import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { type AdminData, adminSchema } from '@packages/admins/schema'
import { AdminForm } from '@/features/admins/components/admin-form'
import { useUiStore } from '@/features/admins/store/ui'
import { useUpdateAdmin } from '@/features/admins/api/update-admin'
import { applyFormErrors } from '@/lib/react-hook-form'
import { usePermissionsRoles } from '@/features/permissions/api/get-permissions-roles'

export function UpdateAdmin() {
  const data = useUiStore((s) => s.updateDialog.data)
  const open = useUiStore((s) => s.updateDialog.open)
  const onClose = useUiStore((s) => s.closeUpdateDialog)
  const roles = usePermissionsRoles().data?.data || []
  const form = useForm<AdminData>({
    resolver: zodResolver(adminSchema),
    values: {
      id: data?.id || '',
      email: data?.email || '',
      name: data?.name || '',
      changePassword: false,
      password: '',
      confirmPassword: '',
      roleId: data?.roleId || 'NONE',
      customPermissions: data?.roleId
        ? roles.find((r) => r.id === data.roleId)?.permissionIds || []
        : data?.permissions || [],
    },
  })

  const updateMutation = useUpdateAdmin({
    onSuccess() {
      onClose()
    },
    onValidationError(errors) {
      applyFormErrors(form.setError, errors)
    },
  })

  function onSubmit(data: AdminData) {
    updateMutation.mutate(data)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar administrador</DialogTitle>
          <DialogDescription>
            Completa el formulario a continuación para crear actualizar el
            administrador.
          </DialogDescription>
        </DialogHeader>

        <AdminForm
          roles={roles}
          onSubmit={onSubmit}
          form={form}
          type='update'
          isLoading={updateMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  )
}
