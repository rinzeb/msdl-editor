<script setup lang="ts">
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
    <DropdownMenuTrigger class="absolute pointer-events-none" :style="style">
      <CrosshairIcon
        class="text-red-900 -translate-x-1/2 -translate-y-1/2"
        :class="isOpen ? '' : 'hidden'"
      />
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="start" :sideOffset="0">
      <DropdownMenuLabel v-if="event">{{
        formatDecimalDegrees([event.lngLat.lng, event.lngLat.lat])
      }}</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuSub>
        <DropdownMenuSubTrigger inset><span>Open in</span></DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem
            v-for="{ name, url } in returnMapProviders(dropPosition)"
            :key="url"
            inset
            as-child
            ><a :href="url" target="_blank">{{ name }}</a></DropdownMenuItem
          >
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSeparator />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
