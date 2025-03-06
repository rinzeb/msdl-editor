import { defineStore } from "pinia";
import { ref } from "vue";

export const useLayerStore = defineStore("visibleLayers", () => {
  const layers = ref<Set<string>>(new Set());
  const showIconAnchors = ref(false);
  const showUnits = ref(true);
  const showEquipment = ref(true);
  const showLabels = ref(false);

  return { layers, showIconAnchors, showUnits, showEquipment, showLabels };
});

export const useMapSettingsStore = defineStore("mapSettings", () => {
  const showPadding = ref(false);
  const showCollisionBoxes = ref(false);
  const showTileBoundaries = ref(false);
  const showOverdrawInspector = ref(false);
  return { showPadding, showCollisionBoxes, showTileBoundaries, showOverdrawInspector };
});
