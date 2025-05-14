import type { StateCreator } from 'zustand'

type Store<T> = {
  updateDialog: {
    open: boolean
    data: T | null
  }
  openUpdateDialog: (data: T) => void
  closeUpdateDialog: () => void

  deleteDialog: {
    open: boolean
    data: T[] | null
  }
  openDeleteDialog: (data: T[]) => void
  closeDeleteDialog: () => void
}

export const createUiStore =
  <T>(): StateCreator<Store<T>> =>
  (set) => ({
    updateDialog: {
      open: false,
      data: null,
    },
    deleteDialog: {
      open: false,
      data: null,
    },

    openUpdateDialog(data) {
      set({
        updateDialog: {
          data,
          open: true,
        },
      })
    },

    closeUpdateDialog() {
      set({
        updateDialog: {
          data: null,
          open: false,
        },
      })
    },

    openDeleteDialog(data) {
      set({
        deleteDialog: {
          open: true,
          data,
        },
      })
    },

    closeDeleteDialog() {
      set({
        deleteDialog: {
          open: false,
          data: null,
        },
      })
    },
  })
