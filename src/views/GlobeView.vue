<script setup lang="ts">
import { type EquipmentItem, MilitaryScenario, type Unit } from "@orbat-mapper/msdllib";
import { computed, provide, shallowRef } from "vue";
import { sortBy } from "@/utils.ts";
import SidePanel from "@/components/SidePanel.vue";
import maplibregl, { type LngLatLike } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import MaplibreMap from "@/components/MaplibreMap.vue";
import MapLogic from "@/components/MapLogic.vue";
import { useLayerStore } from "@/stores/layerStore.ts";
import { Button } from "@/components/ui/button";
import LoadScenarioPanel from "@/components/LoadScenarioPanel.vue";
import { useToggle } from "@vueuse/core";
import { ChevronLeft as DoubleArrowLeftIcon } from "lucide-vue-next";
import LoadFromUrl from "@/components/LoadFromUrl.vue";
import { activeScenarioKey } from "@/components/injects.ts";
import SwitchLabel from "@/components/SwitchLabel.vue";
import MainMenu from "@/components/MainMenu.vue";
import { useDialogStore } from "@/stores/dialogStore.ts";
import DetailsPanel from "@/components/DetailsPanel.vue";
import { useSelectStore } from "@/stores/selectStore.ts";
import { ScrollArea } from "@/components/ui/scroll-area";

const store = useLayerStore();
const dialogStore = useDialogStore();
const selectStore = useSelectStore();

const mlMap = shallowRef<maplibregl.Map>();
const [showSidebar, toggleSidebar] = useToggle(true);

const msdl = shallowRef<MilitaryScenario>();

provide(activeScenarioKey, msdl);
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

getData();

function loadScenario(scenario: MilitaryScenario) {
  store.layers.clear();
  msdl.value = scenario;
  // msdl.value.primarySide = msdl.value.sides[2];
  msdl.value.sides.forEach((side) => {
    store.layers.add(side.objectHandle);
  });
}

const sides = computed(() => {
  return sortBy(msdl.value?.sides ?? [], "name").filter((side) => side.rootUnits.length > 0);
});

function onMapReady(map: maplibregl.Map) {
  mlMap.value = map;
}

function toggleLayers() {
  if (store.layers.size >= sides.value.length) {
    store.layers.clear();
    return;
  }
  sides.value.forEach((side) => {
    store.layers.add(side.objectHandle);
  });
}

function flyToItem(item: EquipmentItem | Unit) {
  const coordinates = item.location as LngLatLike;
  if (!coordinates) return;
  mlMap.value?.flyTo({ center: coordinates, zoom: 10 });
}
</script>
<template>
  <main class="h-full w-full flex">
    <ScrollArea
      class="w-64 mt-12 sm:w-96 px-2 border rounded-md flex-none overflow-auto"
      v-if="showSidebar"
    >
      <Button
        variant="outline"
        @click="toggleSidebar()"
        size="icon"
        title="Toggle sidebar"
        class="mt-2"
      >
        <DoubleArrowLeftIcon class="size-4" />
        <span class="sr-only">Toggle theme</span>
      </Button>
      <SidePanel :sides="sides" :primarySide="msdl?.primarySide" />
      <div v-if="msdl">
        <h4 class="text-sm font-bold mt-2">Map display</h4>
        <div class="grid gap-4 sm:grid-cols-2 grid-cols-1 mt-4">
          <SwitchLabel v-model="store.showUnits">Show units</SwitchLabel>
          <SwitchLabel v-model="store.showEquipment">Show equipment</SwitchLabel>
          <SwitchLabel v-model="store.showLabels">Show labels</SwitchLabel>
        </div>
        <div class="mt-4">
          <Button variant="secondary" @click="toggleLayers()">Toggle layers visibility</Button>
        </div>
      </div>
      <LoadScenarioPanel class="mt-4" @loaded="loadScenario" />
      <div class="mt-4">
        <Button variant="outline" @click="dialogStore.toggleUrlDialog()">Load from URL</Button>
      </div>
    </ScrollArea>
    <div id="map" class="flex-auto h-full z-0 relative">
      <MaplibreMap @ready="onMapReady" />
      <DetailsPanel
        v-if="selectStore.activeItem"
        :item="selectStore.activeItem"
        class="absolute right-2 top-[150px]"
        @flyTo="flyToItem"
      />
    </div>
    <MapLogic v-if="mlMap && msdl" :mlMap="mlMap" />
    <div v-if="!showSidebar" class="fixed top-14 left-2" title="Toggle sidebar">
      <Button variant="outline" @click="toggleSidebar()" size="icon">
        <DoubleArrowLeftIcon class="size-4 rotate-180" />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </div>
    <LoadFromUrl @loaded="loadScenario" v-model:open="dialogStore.isUrlDialogOpen" />
    <MainMenu class="fixed top-1 left-2" />
  </main>
</template>
