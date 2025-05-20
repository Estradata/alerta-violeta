import { Button } from '@/components/ui/button'
import { ControlledInput } from '@/components/form'
import { Form } from '@/components/ui/form'
import { groupByModule } from '@packages/admin-permissions/utils'
import { Label } from '@/components/ui/label'
import { usePermissions } from '@/features/permissions/api/get-permissions'
import type { AdminData } from '@packages/admins/schema'
import type { UseFormReturn } from 'react-hook-form'
import { usePermissionsRoles } from '@/features/permissions/api/get-permissions-roles'
import {
  MODULE_PERMISSIONS_LABELS,
  ACTION_PERMISSIONS_LABELS,
} from '@packages/admin-permissions/consts'
import type {
  PermissionId,
  PermissionModule,
} from '@packages/admin-permissions/schema'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { ControlledSelect } from '@/components/form/controlled-select'
import { ControlledCheckbox } from '@/components/form/controlled-checkbox'

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
  const permissions = usePermissions().data?.data || []
  const roles = usePermissionsRoles().data?.data || []
  const groupedPermissions = groupByModule(permissions)
  const selectedPermissions = form.watch('customPermissions') as PermissionId[]
  const selectedRole = form.watch('roleId')
  const hasRoleSelected = selectedRole !== 'NONE'
  const changePassword = form.getValues('changePassword')

  function onChangePermission(id: UIPermission, m: PermissionModule) {
    const filteredPermissions = selectedPermissions.filter(
      (p) => !p.includes(m)
    )

    const newPermissions = id.includes('NONE')
      ? filteredPermissions
      : [...filteredPermissions, id]

    form.setValue('customPermissions', newPermissions)
  }

  function onRoleChange(roleId: string) {
    form.setValue('roleId', roleId)

    if (roleId === 'NONE') {
      form.setValue('customPermissions', [])
    } else {
      const permissions = roles.find((r) => r.id === roleId)?.permissionIds || []
      form.setValue('customPermissions', permissions)
    }
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

        {type === 'update' && (
          <ControlledCheckbox
            control={form.control}
            name='changePassword'
            label='Actualizar contraseña'
          />
        )}

        <ControlledInput
          control={form.control}
          disabled={type === 'update' && !changePassword}
          name='password'
          type='password'
          label='Contraseña'
          required
          inputProps={{
            autoComplete: 'off',
          }}
        />

        <ControlledInput
          control={form.control}
          disabled={type === 'update' && !changePassword}
          name='confirmPassword'
          label='Confirma la contraseña'
          placeholder='Escribe aquí la contraseña'
          type='password'
          inputProps={{
            autoComplete: 'off',
          }}
          required
        />

        <div>
          <ControlledSelect
            control={form.control}
            name='roleId'
            label='Rol y Permisos'
            // on={()}
            onChange={onRoleChange}
          >
            <SelectItem value='NONE'>Personalizado</SelectItem>

            {roles.map((role) => {
              return (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              )
            })}
          </ControlledSelect>

          <div className='flex flex-col gap-4 pt-4'>
            {groupedPermissions.map((group) => {
              return (
                <div className='flex items-center gap-5' key={group.module}>
                  <Label
                    className={cn(
                      'flex-1',
                      hasRoleSelected && 'text-muted-foreground'
                    )}
                    htmlFor={group.module}
                  >
                    {MODULE_PERMISSIONS_LABELS[group.module]}
                  </Label>

                  <Select
                    disabled={hasRoleSelected}
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
