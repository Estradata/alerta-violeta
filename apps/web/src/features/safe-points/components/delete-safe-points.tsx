import { ConfirmationDialog } from '@/components/confirmation-dialog'
import { useDeleteSafePoints } from '@/features/safe-points/api/delete-safe-point'
import { useUiStore } from '@/features/safe-points/store/ui'

export function DeleteSafePoints() {
  const dialog = useUiStore((s) => s.deleteDialog)
  const closeDialog = useUiStore((s) => s.closeDeleteDialog)
  const deleteMutation = useDeleteSafePoints({
    onSuccess() {
      closeDialog()
    },
  })

  async function onConfirm() {
    if (!dialog.data) return

    deleteMutation.mutate(dialog.data.map((p) => p.id))
  }

  return (
    <ConfirmationDialog
      title={dialog.data?.length === 1 ? 'Eliminar punto' : 'Eliminar puntos'}
      open={dialog.open}
      onOpenChange={closeDialog}
      onConfirm={() => onConfirm()}
      isLoading={deleteMutation.isPending}
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
