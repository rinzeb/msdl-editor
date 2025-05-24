<script setup lang="ts">
// The shadcn context menu component is not compatible with maplibre-gl. The contextmenu event
// is not triggered as expected. A workaround is to use the maplibre-gl context menu event and
// dropdown menu that will be positioned manually. Unfortunately we lose the longpress event,
// so it will currently not work on mobile devices.

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CrosshairIcon } from "lucide-vue-next";
import type { MapMouseEvent } from "maplibre-gl";
import { computed } from "vue";
import { formatDecimalDegrees } from "@/utils.ts";
import type { Position } from "geojson";

const props = defineProps<{ event?: MapMouseEvent }>();
const isOpen = defineModel({ default: false });
const dropPosition = computed(() => {
  if (!props.event) return [0, 0];
  return [props.event.lngLat.lng, props.event.lngLat.lat];
});

const style = computed(() => ({
  top: `${props.event?.point.y}px`,
  left: `${props.event?.point.x}px`,
}));

function returnMapProviders(lonLat: Position, zoomLevel = 15) {
  return [
    {
      name: "Google Maps",
      url: `https://www.google.com/maps/@${lonLat[1]},${lonLat[0]},${zoomLevel}z`,
    },
    {
      name: "Google Street View",
      url:
        "https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=" +
        lonLat[1] +
        "," +
        lonLat[0],
    },
    {
      name: "Bing Maps",
      url: `https://www.bing.com/maps?cp=${lonLat[1]}~${lonLat[0]}&lvl=${zoomLevel}`,
    },
    {
      name: "OpenStreetMap",
      url: `https://www.openstreetmap.org/#map=15/${lonLat[1]}/${lonLat[0]}`,
    },
    {
      name: "Geohack",
      url: `https://geohack.toolforge.org/geohack.php?params=${lonLat[1]}_N_${lonLat[0]}_E`,
    },
  ];
}
</script>

<template>
  <DropdownMenu v-model:open="isOpen">
    <DropdownMenuTrigger
      class="absolute pointer-events-none data-[state=closed]:*:hidden"
      :style="style"
    >
      <CrosshairIcon class="size-6 text-red-900/70 -translate-x-1/2 -translate-y-1/2" />
    </DropdownMenuTrigger>
    <DropdownMenuContent
      class="w-56 data-[state=open]:animate-none data-[state=closed]:animate-none"
      align="start"
      :sideOffset="0"
    >
      <DropdownMenuLabel v-if="event">{{
        formatDecimalDegrees([event.lngLat.lng, event.lngLat.lat])
      }}</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuSub>
        <DropdownMenuSubTrigger><span>Open in</span></DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem
            v-for="{ name, url } in returnMapProviders(dropPosition)"
            :key="url"
            as-child
            ><a :href="url" target="_blank">{{ name }}</a></DropdownMenuItem
          >
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSeparator />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
