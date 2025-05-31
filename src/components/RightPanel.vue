<script setup lang="ts">
import DetailsPanel from "@/components/DetailsPanel.vue";
import type { EquipmentItem, Unit } from "@orbat-mapper/msdllib";
import type { LngLatLike } from "maplibre-gl";
import { useSelectStore } from "@/stores/selectStore.ts";
const { mlMap } = defineProps<{
  mlMap?: maplibregl.Map;
}>();

const selectStore = useSelectStore();

function flyToItem(item: EquipmentItem | Unit) {
  const coordinates = item.location as LngLatLike;
  if (!coordinates) return;
  mlMap?.flyTo({ center: coordinates, zoom: 16 });
}
</script>
<template>
  <DetailsPanel
    v-if="selectStore.activeItem"
    :item="selectStore.activeItem"
    class="pointer-events-auto absolute right-2 top-[150px]"
    @flyTo="flyToItem"
  />
</template>
