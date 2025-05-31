import { defineStore } from "pinia";
import { ref } from "vue";
import type { MilitaryScenario } from "@orbat-mapper/msdllib";
import { useLocalStorage } from "@vueuse/core";

export const useLayerStore = defineStore("visibleLayers", () => {
  const layers = ref<Set<string>>(new Set());
  const showIconAnchors = useLocalStorage("showIconAnchors", false);
  const showUnits = useLocalStorage("showUnits", true);
  const showEquipment = useLocalStorage("showEquipment", true);
  const showLabels = useLocalStorage("showLabels", true);
  const showSymbolOutline = useLocalStorage("showSymbolOutline", true);

  function setSideLayers(scenario: MilitaryScenario) {
    layers.value.clear();
    scenario.sides.forEach((layer) => {
      layers.value.add(layer.objectHandle);
    });
  }

  return {
    layers,
    showIconAnchors,
    showUnits,
    showEquipment,
    showLabels,
    setSideLayers,
    showSymbolOutline,
  };
});

export const useMapSettingsStore = defineStore("mapSettings", () => {
  const showPadding = ref(false);
  const showCollisionBoxes = ref(false);
  const showTileBoundaries = ref(false);
  const showOverdrawInspector = ref(false);
  return { showPadding, showCollisionBoxes, showTileBoundaries, showOverdrawInspector };
});
