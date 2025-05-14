import {
   FormControl,
   FormDescription,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { Input, type InputProps } from '@/components/ui/input'
import React from 'react'

type Props = {
   label?: string
   placeholder?: string
   inputProps?: InputProps
   description?: string
   onChange: (files: FileList | null) => void
   disabled?: boolean
   required?: boolean
}

export const ControlledFileInput = React.forwardRef<HTMLInputElement, Props>(
   (
      {
         label,
         placeholder,
         inputProps = {},
         description,
         disabled,
         required,
         onChange,
      },
      ref
   ) => {
      return (
         <FormItem>
            {(label || description) && (
               <div>
                  {label && (
                     <FormLabel
                        disabled={Boolean(disabled)}
                        required={required}
                     >
                        {label}
                     </FormLabel>
                  )}

                  {description && (
                     <FormDescription>{description}</FormDescription>
                  )}
               </div>
            )}

            <FormControl>
               <Input
                  {...inputProps}
                  ref={ref}
                  placeholder={placeholder}
                  type='file'
                  disabled={disabled}
                  onChange={(e) => onChange(e.target.files)}
               />
            </FormControl>

            <FormMessage />
         </FormItem>
      )
   }
)

ControlledFileInput.displayName = 'ControlledFileInput'
