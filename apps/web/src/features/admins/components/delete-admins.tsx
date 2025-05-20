import { ConfirmationDialog } from '@/components/confirmation-dialog'
import { useDeleteAdmins } from '@/features/admins/api/delete-admins'
import { useUiStore } from '@/features/admins/store/ui'

export function DeleteAdmins() {
  const dialog = useUiStore((s) => s.deleteDialog)
  const closeDialog = useUiStore((s) => s.closeDeleteDialog)
  const deleteMutation = useDeleteAdmins({
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
      title={
        dialog.data?.length === 1
          ? 'Eliminar administrador'
          : 'Eliminar administradores'
      }
      open={dialog.open}
      onOpenChange={closeDialog}
      onConfirm={() => onConfirm()}
      isLoading={deleteMutation.isPending}
      text={
        dialog.data?.length === 1 ? (
          <>
            ¿Está seguro de que desea eliminar el administrador
            <br />
            <span className='text-foreground font-medium'>
              {dialog.data[0]?.name}
            </span>{' '}
            ?
          </>
        ) : (
          <>
            Se eliminarán {dialog.data?.length} administradores, este proceso no
            se puede deshacer.
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
