import { defineStore } from "pinia";
import { useToggle } from "@vueuse/core";

export const useUIStore = defineStore("uiStore", () => {
  const [showLeftPanel, toggleLeftPanel] = useToggle(true);

  return { showLeftPanel, toggleLeftPanel };
});
