import { shallowRef } from "vue";
import { MilitaryScenario } from "@orbat-mapper/msdllib";
import { useLayerStore } from "@/stores/layerStore.ts";

const msdl = shallowRef<MilitaryScenario>();

export function useScenarioStore() {
  const layerStore = useLayerStore();
  function loadScenario(scenario: MilitaryScenario) {
    msdl.value = scenario;
    layerStore.setSideLayers(scenario);
  }

  function clearScenario() {
    msdl.value = undefined;
    layerStore.layers.clear();
  }

  return { loadScenario, clearScenario, msdl };
}
