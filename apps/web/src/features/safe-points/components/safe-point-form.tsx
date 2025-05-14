import { ControlledInput } from '@/components/form'
import { ControlledSelect } from '@/components/form/controlled-select'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import type { SafePointData } from '@packages/safe-points/schema'
import type { UseFormReturn } from 'react-hook-form'
import { safePointTypes } from '@packages/safe-points/consts'
import { SelectItem } from '@/components/ui/select'

export function SafePointForm({
  type,
  form,
  onSubmit,
  isLoading,
  disabled,
}: {
  form: UseFormReturn<SafePointData>
  onSubmit: (data: SafePointData) => void
  isLoading: boolean
  type: 'create' | 'update'
  disabled?: boolean
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <ControlledInput
          control={form.control}
          name='name'
          label='Nombre'
          placeholder='Nombre del punto'
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

        <Button
          type='submit'
          className='w-full'
          isLoading={isLoading}
          disabled={disabled}
        >
          {type === 'create' ? 'Crear punto' : 'Actualizar punto'}
        </Button>
      </form>
    </Form>
  )
}
