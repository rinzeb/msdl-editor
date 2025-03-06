import { defineStore } from "pinia";
import { shallowRef } from "vue";
import type { EquipmentItem, Unit } from "@orbat-mapper/msdllib";

export const useSelectStore = defineStore("selectStore", () => {
  const activeItem = shallowRef<Unit | EquipmentItem | null>(null);
  function clearActiveItem() {
    activeItem.value = null;
  }
  return { activeItem, clearActiveItem };
});
