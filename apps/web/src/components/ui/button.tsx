import * as React from 'react'
import { Slot, Slottable } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Loader2Icon } from 'lucide-react'

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer disabled:cursor-auto justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-lg gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-lg px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const loadingIndicatorVariants = {
  default: 'text-primary-foreground',
  destructive: 'text-destructive-foreground',
  outline: ' text-black dark:text-white',
  secondary: 'text-secondary-foreground',
  ghost: 'text-black dark:text-white',
  link: 'text-primary',
}

function Button({
  className,
  variant,
  size,
  disabled,
  children,
  asChild = false,
  isLoading = false,
  ref,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    isLoading?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot='button'
      className={cn(
        buttonVariants({ variant, size, className }),
        'transition-all',
        isLoading && 'text-transparent hover:text-transparent relative'
      )}
      ref={ref}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && (
        <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
          <Loader2Icon
            className={cn(
              'h-4 w-4 animate-spin',
              loadingIndicatorVariants[variant ?? 'default']
            )}
          />
        </div>
      )}

      <Slottable>{children}</Slottable>
    </Comp>
  )
}

export { Button, buttonVariants }
