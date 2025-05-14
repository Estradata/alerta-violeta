import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function ConfirmationDialog({
  title = 'Eliminar',
  open,
  text,
  isLoading,
  onOpenChange,
  onConfirm,
  variant = 'destructive',
  cancelButton = true,
  confirmationText = 'Confirmar',
}: {
  variant?: 'destructive' | 'link' | 'default' | 'outline' | 'secondary'
  title?: string
  text: React.ReactNode
  onConfirm: () => void
  onOpenChange: (v: boolean) => void
  open: boolean
  isLoading?: boolean
  cancelButton?: boolean
  maxWidth?: string
  confirmationText?: string
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className='text-muted-foreground'>{text}</div>

        <DialogFooter>
          {cancelButton && (
            <Button variant='outline' onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
          )}

          <Button
            onClick={() => onConfirm()}
            isLoading={isLoading}
            variant={variant}
          >
            {confirmationText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
