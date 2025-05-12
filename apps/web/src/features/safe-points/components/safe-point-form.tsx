import { ControlledInput } from '@/components/form'
import { ControlledSelect } from '@/components/form/controlled-select'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import type { SafePointData } from '@packages/safe-points/schema'
import type { UseFormReturn } from 'react-hook-form'
import { safePointTypes } from '../../../../../../packages/safe-points/consts'
import { SelectItem } from '@/components/ui/select'

export function SafePointForm({
  type,
  form,
  onSubmit,
  isLoading,
}: {
  form: UseFormReturn<SafePointData>
  onSubmit: (data: SafePointData) => void
  isLoading: boolean
  type: 'create' | 'update'
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <ControlledInput
          control={form.control}
          name='name'
          label='Nombre del punto'
          required
        />

        <ControlledInput
          control={form.control}
          name='address'
          label='Dirección'
          required
        />

        <ControlledInput
          control={form.control}
          name='lat'
          label='Latitud'
          required
        />

        <ControlledInput
          control={form.control}
          name='lng'
          label='Lng'
          required
        />

        <ControlledSelect
          control={form.control}
          name='type'
          label='Tipo'
          required
        >
          {safePointTypes.map((type) => {
            return (
              <SelectItem value={type.value} key={type.value}>
                {type.value}
              </SelectItem>
            )
          })}
        </ControlledSelect>

        <Button type='submit' className='w-full' isLoading={isLoading}>
          {type === 'create' ? 'Crear punto' : 'Actualizar punto'}
        </Button>
      </form>
    </Form>
  )
}
