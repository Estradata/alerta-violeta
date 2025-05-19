import { Button } from '@/components/ui/button'
import { ControlledInput } from '@/components/form'
import { Form } from '@/components/ui/form'
import { groupByModule } from '@packages/permissions/utils'
import { Label } from '@/components/ui/label'
import { usePermissions } from '@/features/permissions/api/get-permissions'
import type { AdminData } from '@packages/auth-admin/schema'
import type { UseFormReturn } from 'react-hook-form'
import {
  MODULE_PERMISSIONS_LABELS,
  ACTION_PERMISSIONS_LABELS,
} from '@packages/permissions/consts'
import type {
  PermissionId,
  PermissionModule,
} from '@packages/permissions/schema'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type UIPermission = PermissionId | `${PermissionModule}.NONE`

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
  const selectedPermissions = form.watch('customPermissions') as PermissionId[]

  function onChangePermission(id: UIPermission, m: PermissionModule) {
    const filteredPermissions = selectedPermissions.filter(
      (p) => !p.includes(m)
    )

    const newPermissions = id.includes('NONE')
      ? filteredPermissions
      : [...filteredPermissions, id]

    form.setValue('customPermissions', newPermissions)
  }

  function getModulePermission(m: PermissionModule) {
    return selectedPermissions.find((p) => p.includes(m)) || `${m}.NONE`
  }

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

          <div className='flex flex-col gap-4 pt-4'>
            {groupedPermissions.map((group) => {
              return (
                <div className='flex items-center gap-5' key={group.module}>
                  <Label className='flex-1' htmlFor={group.module}>
                    {MODULE_PERMISSIONS_LABELS[group.module]}
                  </Label>

                  <Select
                    name={group.module}
                    value={getModulePermission(group.module)}
                    onValueChange={(id) =>
                      onChangePermission(id as UIPermission, group.module)
                    }
                  >
                    <SelectTrigger className='w-[180px]' id={group.module}>
                      <SelectValue placeholder='Theme' />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value={`${group.module}.NONE`}>
                        Sin Permiso
                      </SelectItem>

                      {group.permissions.map((permission) => {
                        return (
                          <SelectItem key={permission.id} value={permission.id}>
                            {ACTION_PERMISSIONS_LABELS[permission.action]}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
              )
            })}
          </div>
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
