import { shallowRef } from "vue";
import { MilitaryScenario } from "@orbat-mapper/msdllib";
import { useLayerStore } from "@/stores/layerStore.ts";
import { useSelectStore } from "@/stores/selectStore.ts";

const msdl = shallowRef<MilitaryScenario>();

export function useScenarioStore() {
  const layerStore = useLayerStore();
  const selectStore = useSelectStore();
  function loadScenario(scenario: MilitaryScenario) {
    selectStore.clearActiveItem();
    msdl.value = scenario;
    layerStore.setSideLayers(scenario);
  }

  function clearScenario() {
    msdl.value = undefined;
    layerStore.layers.clear();
    selectStore.clearActiveItem();
  }

  return { loadScenario, clearScenario, msdl };
}
