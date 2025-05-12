import type { UseFormReturn } from 'react-hook-form'
import type { EmergencyContactData } from '@packages/emergency-contacts/schema'
import { Form } from '@/components/ui/form'
import { ControlledInput } from '@/components/form'
import { Button } from '@/components/ui/button'
import { ControlledTextarea } from '@/components/form/controlled-textarea'

export function EmergencyContactForm({
  type,
  form,
  onSubmit,
  isLoading,
}: {
  form: UseFormReturn<EmergencyContactData>
  onSubmit: (data: EmergencyContactData) => void
  isLoading: boolean
  type: 'create' | 'update'
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <ControlledInput
          control={form.control}
          name='name'
          label='Nombre del contacto'
          required
        />

        <ControlledTextarea
          control={form.control}
          name='description'
          label='Descripción'
          required
        />

        <ControlledInput
          control={form.control}
          name='phone'
          label='Teléfono'
          required
        />

        <Button type='submit' className='w-full' isLoading={isLoading}>
          {type === 'create' ? 'Crear contacto' : 'Actualizar contacto'}
        </Button>
      </form>
    </Form>
  )
}
