import { defineStore } from "pinia";
import { useToggle } from "@vueuse/core";
import { ref } from "vue";

export const useUIStore = defineStore("uiStore", () => {
  const [showLeftPanel, toggleLeftPanel] = useToggle(true);

  return { showLeftPanel, toggleLeftPanel };
});

export const useSideStore = defineStore("sideStore", () => {
  const hideEmptySides = ref(true);

  return { hideEmptySides };
});
