import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input, type InputProps } from '@/components/ui/input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState, type ChangeEvent } from 'react'
import type {
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form'

export const ControlledInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  placeholder,
  inputProps = {},
  description,
  type = 'text',
  onChange,
  disabled,
  required,
}: {
  control: ControllerProps<TFieldValues, TName>['control']
  name: ControllerProps<TFieldValues, TName>['name']
  onChange?: (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<TFieldValues, TName>
  ) => void
  label?: string
  type?: InputProps['type']
  placeholder?: string
  inputProps?: InputProps
  description?: string
  disabled?: boolean
  required?: boolean
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const localType: InputProps['type'] =
    type === 'password' ? (showPassword ? 'text' : 'password') : type

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='relative'>
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

          <div className='relative'>
            <FormControl>
              <Input
                {...field}
                {...inputProps}
                placeholder={placeholder}
                type={localType}
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

            {type === 'password' && (
              <div className='absolute top-1/2 -translate-y-1/2 right-1'>
                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8'
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={disabled}
                >
                  {showPassword && !disabled ? (
                    <EyeIcon className='h-3 w-3' aria-hidden='true' />
                  ) : (
                    <EyeOffIcon className='h-3 w-3' aria-hidden='true' />
                  )}
                  <span className='sr-only'>
                    {showPassword ? 'Hide password' : 'Show password'}
                  </span>
                </Button>
              </div>
            )}
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
