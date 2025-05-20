
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EllipsisIcon } from 'lucide-react'

type TableRowActionsProps = {
  variant?: 'secondary' | 'default' | 'ghost'
  actions?: {
    render: React.ReactNode
    asChild?: boolean
  }[]
  disabled?: boolean
}

export function TableRowActions({
  actions,
  disabled,
  variant = 'ghost',
}: TableRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size='icon'
          className='w-9 h-9'
          disabled={disabled}
        >
          <EllipsisIcon className='h-4 w-4' />
          <span className='sr-only'>Abrir menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='min-w-[160px]'>
        {actions?.map((action, i) => {
          return (
            <DropdownMenuItem key={i} asChild={action.asChild}>
              {action.render}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
