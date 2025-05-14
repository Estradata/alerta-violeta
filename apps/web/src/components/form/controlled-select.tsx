import {
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import {
   Select,
   SelectContent,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select'
import type {
   ControllerProps,
   ControllerRenderProps,
   FieldPath,
   FieldValues,
} from 'react-hook-form'

export const ControlledSelect = <
   TFieldValues extends FieldValues = FieldValues,
   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
   control,
   name,
   children,
   label = '',
   placeholder = '',
   description = '',
   onChange,
   required,
   disabled,
}: {
   control: ControllerProps<TFieldValues, TName>['control']
   name: ControllerProps<TFieldValues, TName>['name']
   children: React.ReactNode
   label?: string
   placeholder?: string
   description?: string
   onChange?: (
      value: string,
      field: ControllerRenderProps<TFieldValues, TName>
   ) => void
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

                     {description && (
                        <FormDescription>{description}</FormDescription>
                     )}
                  </div>
               )}

               <Select
                  onValueChange={(e) => {
                     if (onChange) {
                        onChange(e, field)
                     } else {
                        field.onChange(e)
                     }
                  }}
                  value={field.value}
                  disabled={disabled}
               >
                  <FormControl>
                     <SelectTrigger className='w-full'>
                        <SelectValue placeholder={placeholder} />
                     </SelectTrigger>
                  </FormControl>

                  <SelectContent>{children}</SelectContent>
               </Select>

               <FormMessage />
            </FormItem>
         )}
      />
   )
}
