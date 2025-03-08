import { defineStore } from "pinia";
import { ref } from "vue";
import type { MilitaryScenario } from "@orbat-mapper/msdllib";

export const useLayerStore = defineStore("visibleLayers", () => {
  const layers = ref<Set<string>>(new Set());
  const showIconAnchors = ref(false);
  const showUnits = ref(true);
  const showEquipment = ref(true);
  const showLabels = ref(false);

  function setSideLayers(scenario: MilitaryScenario) {
    layers.value.clear();
    scenario.sides.forEach((layer) => {
      layers.value.add(layer.objectHandle);
    });
  }

  return { layers, showIconAnchors, showUnits, showEquipment, showLabels, setSideLayers };
});

export const useMapSettingsStore = defineStore("mapSettings", () => {
  const showPadding = ref(false);
  const showCollisionBoxes = ref(false);
  const showTileBoundaries = ref(false);
  const showOverdrawInspector = ref(false);
  return { showPadding, showCollisionBoxes, showTileBoundaries, showOverdrawInspector };
});
