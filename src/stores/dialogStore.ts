import { defineStore } from "pinia";
import { useToggle } from "@vueuse/core";

export const useDialogStore = defineStore("dialogStore", () => {
  const [isUrlDialogOpen, toggleUrlDialog] = useToggle(false);
  return { isUrlDialogOpen, toggleUrlDialog };
});
