import { computed, shallowRef } from "vue";
import { MilitaryScenario } from "@orbat-mapper/msdllib";
import { useLayerStore } from "@/stores/layerStore.ts";
import { useSelectStore } from "@/stores/selectStore.ts";

const msdl = shallowRef<MilitaryScenario>();

const undoStack = shallowRef<unknown[]>([]);
const redoStack = shallowRef<unknown[]>([]);

export function useScenarioStore() {
  const layerStore = useLayerStore();
  const selectStore = useSelectStore();

  const canUndo = computed(() => undoStack.value.length > 0);
  const canRedo = computed(() => redoStack.value.length > 0);

  function loadScenario(scenario: MilitaryScenario) {
    selectStore.clearActiveItem();
    msdl.value = scenario;
    layerStore.setSideLayers(scenario);
    undoStack.value = [];
    redoStack.value = [];
  }

  function clearScenario() {
    msdl.value = undefined;
    layerStore.layers.clear();
    selectStore.clearActiveItem();
    undoStack.value = [];
    redoStack.value = [];
  }

  function undo() {
    console.warn("Undo is not implemented yet.");
  }

  function redo() {
    console.warn("Redo is not implemented yet.");
  }

  return { loadScenario, clearScenario, msdl, undo, redo, canUndo, canRedo };
}
