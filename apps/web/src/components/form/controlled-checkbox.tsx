import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import type { ChangeEvent } from 'react'
import type {
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form'

export const ControlledCheckbox = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
}: {
  control: ControllerProps<TFieldValues, TName>['control']
  name: ControllerProps<TFieldValues, TName>['name']
  onChange?: (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<TFieldValues, TName>
  ) => void
  label?: string
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id={name}
                name={name}
                checked={field.value}
                onCheckedChange={field.onChange}
              />

              <FormLabel
                htmlFor={name}
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                {label}
              </FormLabel>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  )
}
