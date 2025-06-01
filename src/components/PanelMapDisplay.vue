<script setup lang="ts">
import { useLayerStore } from "@/stores/layerStore.ts";
import SwitchLabel from "@/components/SwitchLabel.vue";
import { Slider } from "@/components/ui/slider";
import { computed, ref } from "vue";

const layerStore = useLayerStore();

const symbSize = ref([layerStore.symbolSize]);
</script>
<template>
  <div>
    <h4 class="text-sm font-bold mt-2">Map display</h4>
    <div class="grid gap-4 sm:grid-cols-2 grid-cols-1 mt-4">
      <SwitchLabel v-model="layerStore.showUnits">Show units</SwitchLabel>
      <SwitchLabel v-model="layerStore.showEquipment">Show equipment</SwitchLabel>
      <SwitchLabel v-model="layerStore.showLabels">Show labels</SwitchLabel>
      <SwitchLabel v-model="layerStore.showSymbolOutline">Show symbol outline</SwitchLabel>
      <div class="flex items-center sm:col-span-2 gap-4 text-sm">
        <span class="flex-none text-sm font-medium">Symbol size</span>
        <Slider
          v-model="symbSize"
          :min="10"
          :max="40"
          @valueCommit="layerStore.symbolSize = $event[0]"
        />
        <span class="flex-none">{{ symbSize[0] }} px</span>
      </div>
    </div>
  </div>
</template>
