import { useUiStore } from '@/features/emergency-contacts/store/ui'
import { useDeleteEmergencyContacts } from '@/features/emergency-contacts/api/delete-emergency-contacts'
import { ConfirmationDialog } from '@/components/confirmation-dialog'

export function DeleteEmergencyContacts() {
  const dialog = useUiStore((s) => s.deleteDialog)
  const closeDialog = useUiStore((s) => s.closeDeleteDialog)
  const deleteMutation = useDeleteEmergencyContacts({
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
        dialog.data?.length === 1 ? 'Eliminar contacto' : 'Eliminar contactos'
      }
      open={dialog.open}
      onOpenChange={closeDialog}
      onConfirm={() => onConfirm()}
      isLoading={deleteMutation.isPending}
      text={
        dialog.data?.length === 1 ? (
          <>
            ¿Está seguro de que desea eliminar el contacto
            <br />
            <span className='text-foreground font-medium'>
              {dialog.data[0]?.name}
            </span>{' '}
            ?
          </>
        ) : (
          <>
            Se eliminarán {dialog.data?.length} contactos, este proceso no se
            puede deshacer.
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
