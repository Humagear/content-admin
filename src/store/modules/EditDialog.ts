// stores/useEditDialogStore.ts
import { defineStore } from "pinia";

export const useEditDialogStore = defineStore("editDialog", {
  state: () => ({
    isVisible: false,
    row: null
  }),
  actions: {
    openDialog(row: any) {
      this.isVisible = true;
      this.row = row;
    },
    closeDialog() {
      this.isVisible = false;
      this.row = null;
    }
  }
});
