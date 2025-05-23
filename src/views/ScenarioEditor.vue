<script setup lang="ts">
import MaplibreMap from "@/components/MaplibreMap.vue";
import MainNavbar from "@/components/MainNavbar.vue";
import LoadFromUrlDialog from "@/components/LoadFromUrlDialog.vue";
import { useDialogStore } from "@/stores/dialogStore.ts";
import { ref, shallowRef, useTemplateRef } from "vue";
import { MilitaryScenario } from "@orbat-mapper/msdllib";
import maplibregl, { MapMouseEvent } from "maplibre-gl";
import MapLogic from "@/components/MapLogic.vue";
import LeftPanel from "@/components/LeftPanel.vue";
import RightPanel from "@/components/RightPanel.vue";
import { useFileDropZone } from "@/composables/filedragdrop.ts";
import DropZoneIndicator from "@/components/DropZoneIndicator.vue";
import { useScenarioStore } from "@/stores/scanarioStore.ts";
import { progress } from "@/composables/progress.ts";
import { GlobalEvents } from "vue-global-events";
import { inputEventFilter } from "@/utils.ts";
import CommandPalette from "@/components/CommandPalette.vue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MapContextMenu from "@/components/MapContextMenu.vue";

const { loadScenario, msdl } = useScenarioStore();

const isOpen = ref(false);
const mapEvent = ref<MapMouseEvent>();

const mlMap = shallowRef<maplibregl.Map>();
const showSearch = ref(false);

const dropZoneRef = useTemplateRef("dropZoneRef");

const dialogStore = useDialogStore();

function onMapReady(map: maplibregl.Map) {
  mlMap.value = map;
}

async function loadExampleScenario() {
  progress.start();
  const url = "/examples/MSDL-example.xml";
  // const url = "/examples/SampleMSDL.xml";
  // const url = "/examples/example3.xml";
  try {
    const response = await fetch(url);
    const msdlAsText = await response.text();
    loadScenario(MilitaryScenario.createFromString(msdlAsText));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  progress.done();
}

loadExampleScenario();

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

function onShowContextMenu(event: MapMouseEvent) {
  mapEvent.value = event;
  isOpen.value = true;
}
</script>
<template>
  <div class="h-full w-full flex flex-col relative" ref="dropZoneRef">
    <header class="shrink-0">
      <MainNavbar />
    </header>
    <main class="flex-auto relative">
      <MaplibreMap @ready="onMapReady" />
      <MapContextMenu v-model="isOpen" :event="mapEvent" />
      <!--        <MaplibreMap @ready="onMapReady" />-->
      <MapLogic v-if="mlMap && msdl" :mlMap="mlMap" @showContextMenu="onShowContextMenu" />
      <div class="absolute inset-0 pointer-events-none p-2">
        <LeftPanel />
        <RightPanel :mlMap />
      </div>
    </main>

    <LoadFromUrlDialog v-model:open="dialogStore.isUrlDialogOpen" @loaded="loadScenario" />
    <DropZoneIndicator v-if="isOverDropZone" />
    <GlobalEvents
      :filter="inputEventFilter"
      @keydown.ctrl.k.prevent="showSearch = true"
      @keydown.meta.k.prevent="showSearch = true"
      @keyup.prevent.alt.k="showSearch = true"
    />
    <CommandPalette v-model:open="showSearch" />
  </div>
</template>
