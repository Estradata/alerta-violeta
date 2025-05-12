import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea, type TextareaProps } from '@/components/ui/textarea'
import type { ChangeEvent } from 'react'
import type {
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form'

export const ControlledTextarea = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  placeholder,
  inputProps = {},
  description,
  onChange,
  disabled,
  required,
}: {
  control: ControllerProps<TFieldValues, TName>['control']
  name: ControllerProps<TFieldValues, TName>['name']
  onChange?: (
    e: ChangeEvent<HTMLTextAreaElement>,
    field: ControllerRenderProps<TFieldValues, TName>
  ) => void
  label?: string
  placeholder?: string
  inputProps?: TextareaProps
  description?: string
  disabled?: boolean
  required?: boolean
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {(label || description) && (
            <div>
              {label && (
                <FormLabel disabled={disabled} required={required}>
                  {label}
                </FormLabel>
              )}

              {description && <FormDescription>{description}</FormDescription>}
            </div>
          )}

          <FormControl>
            <Textarea
              {...field}
              {...inputProps}
              placeholder={placeholder}
              onChange={(e) => {
                if (onChange) {
                  onChange(e, field)
                } else {
                  field.onChange(e)
                }
              }}
              disabled={disabled}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
