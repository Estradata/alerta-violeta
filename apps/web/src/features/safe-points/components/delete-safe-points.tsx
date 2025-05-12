import { ConfirmationDialog } from '@/components/confirmation-dialog'
import { useDeleteSafePoints } from '@/features/safe-points/api/delete-safe-point'
import { useUiStore } from '@/features/safe-points/store/ui'

export function DeleteSafePoints() {
  const dialog = useUiStore((s) => s.deleteDialog)
  const closeDialog = useUiStore((s) => s.closeDeleteDialog)
  const deleteAreasMutation = useDeleteSafePoints({
    onSuccess() {
      closeDialog()
    },
  })

  async function onConfirm() {
    if (!dialog.data) return

    deleteAreasMutation.mutate(dialog.data.map((p) => p.id))
  }

  return (
    <ConfirmationDialog
      title={dialog.data?.length === 1 ? 'Eliminar area' : 'Eliminar areas'}
      open={dialog.open}
      onOpenChange={closeDialog}
      onConfirm={() => onConfirm()}
      isLoading={deleteAreasMutation.isPending}
      text={
        dialog.data?.length === 1 ? (
          <>
            ¿Está seguro de que desea eliminar el punto
            <br />
            <span className='text-foreground font-medium'>
              {dialog.data[0]?.name}
            </span>{' '}
            ?
          </>
        ) : (
          <>
            Se eliminarán {dialog.data?.length} puntos, este proceso no se puede
            deshacer.
            <br />
            <div className='text-foreground font-medium py-3'>
              ¿Estás seguro?
            </div>
          </>
        )
      }
    />
  )
}
