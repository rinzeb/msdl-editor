<script setup lang="ts">
import MaplibreMap from "@/components/MaplibreMap.vue";
import MainNavbar from "@/components/MainNavbar.vue";
import LoadFromUrlDialog from "@/components/LoadFromUrlDialog.vue";
import { useDialogStore } from "@/stores/dialogStore.ts";
import { provide, shallowRef, useTemplateRef } from "vue";
import { MilitaryScenario } from "@orbat-mapper/msdllib";
import { activeScenarioKey } from "@/components/injects.ts";
import { useLayerStore } from "@/stores/layerStore.ts";
import maplibregl from "maplibre-gl";
import MapLogic from "@/components/MapLogic.vue";
import LeftPanel from "@/components/LeftPanel.vue";
import RightPanel from "@/components/RightPanel.vue";
import { useFileDropZone } from "@/composables/filedragdrop.ts";
import DropZoneIndicator from "@/components/DropZoneIndicator.vue";

const mlMap = shallowRef<maplibregl.Map>();
const msdl = shallowRef<MilitaryScenario>();
provide(activeScenarioKey, msdl);

const dropZoneRef = useTemplateRef("dropZoneRef");

const dialogStore = useDialogStore();
const store = useLayerStore();

function loadScenario(scenario: MilitaryScenario) {
  msdl.value = scenario;
  store.setSideLayers(scenario);
}

function onMapReady(map: maplibregl.Map) {
  mlMap.value = map;
}

async function getData() {
  const url = "/examples/MSDL-example.xml";
  // const url = "/examples/SampleMSDL.xml";
  // const url = "/examples/example3.xml";
  try {
    store.layers.clear();
    const response = await fetch(url);
    const msdlAsText = await response.text();
    msdl.value = MilitaryScenario.createFromString(msdlAsText);
    // msdl.value.primarySide = msdl.value.sides[2];
    msdl.value.sides.forEach((side) => {
      store.layers.add(side.objectHandle);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// getData();

const { isOverDropZone } = useFileDropZone(dropZoneRef, onDrop);

async function onDrop(files: File[] | null) {
  if (!files || files.length === 0) {
    console.error("No files dropped");
    return;
  }
  const file = files[0];
  try {
    const content = await file.text();
    loadScenario(MilitaryScenario.createFromString(content));
  } catch (e) {
    console.error("Failed to load", file.name, e);
  }
}
</script>
<template>
  <div class="h-full w-full flex flex-col relative" ref="dropZoneRef">
    <header class="flex-shrink-0">
      <MainNavbar @loaded="loadScenario" />
    </header>
    <main class="flex-auto relative">
      <MaplibreMap @ready="onMapReady" />
      <MapLogic v-if="mlMap && msdl" :mlMap="mlMap" />
      <div class="absolute inset-0 pointer-events-none p-2">
        <LeftPanel />
        <RightPanel :mlMap />
      </div>
    </main>
    <LoadFromUrlDialog v-model:open="dialogStore.isUrlDialogOpen" @loaded="loadScenario" />
    <DropZoneIndicator v-if="isOverDropZone" />
  </div>
</template>
