<script setup lang="ts">
import { useLayerStore } from "@/stores/layerStore.ts";
import SwitchLabel from "@/components/SwitchLabel.vue";

const layerStore = useLayerStore();
</script>
<template>
  <div>
    <h4 class="text-sm font-bold mt-2">Map display</h4>
    <div class="grid gap-4 sm:grid-cols-2 grid-cols-1 mt-4">
      <SwitchLabel v-model="layerStore.showUnits">Show units</SwitchLabel>
      <SwitchLabel v-model="layerStore.showEquipment">Show equipment</SwitchLabel>
      <SwitchLabel v-model="layerStore.showLabels">Show labels</SwitchLabel>
    </div>
  </div>
</template>
