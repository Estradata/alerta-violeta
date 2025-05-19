import { Button } from '@/components/ui/button'
import { ControlledInput } from '@/components/form'
import { Form } from '@/components/ui/form'
import { groupByModule } from '@packages/permissions/utils'
import { Label } from '@/components/ui/label'
import { usePermissions } from '@/features/permissions/api/get-permissions'
import type { AdminData } from '@packages/auth-admin/schema'
import type { UseFormReturn } from 'react-hook-form'
import { MODULE_PERMISSIONS_LABELS } from '../../../../../../packages/auth-admin/consts'

export function AdminForm({
  type,
  form,
  onSubmit,
  isLoading,
  disabled,
}: {
  form: UseFormReturn<AdminData>
  onSubmit: (data: AdminData) => void
  isLoading: boolean
  type: 'create' | 'update'
  disabled?: boolean
}) {
  const result = usePermissions()
  const permissions = result.data?.data || []
  const groupedPermissions = groupByModule(permissions)

  console.log(groupedPermissions)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.log(errors)
        })}
        className='space-y-6'
      >
        <ControlledInput
          control={form.control}
          name='name'
          label='Nombre'
          placeholder='Nombre del administrador'
          required
        />

        <ControlledInput
          control={form.control}
          name='email'
          label='Correo electrónico'
          placeholder='hola@ejemplo.com'
          required
        />

        <ControlledInput
          control={form.control}
          name='password'
          label='Contraseña'
          required
        />

        <div>
          <Label>Permisos</Label>

          {groupedPermissions.map((permission) => {
            return (
              <div
                className='flex items-center gap-5 py-10'
                key={permission.module}
              >
                <p className='flex-1'>
                  {MODULE_PERMISSIONS_LABELS[permission.module]}
                </p>

                
              </div>
            )
          })}
        </div>

        <Button
          type='submit'
          className='w-full'
          isLoading={isLoading}
          disabled={disabled}
        >
          {type === 'create'
            ? 'Crear administrador'
            : 'Actualizar administrador'}
        </Button>
      </form>
    </Form>
  )
}
