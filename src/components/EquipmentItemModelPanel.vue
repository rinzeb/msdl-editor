<script setup lang="ts">
import type { EquipmentItem } from "@orbat-mapper/msdllib";
import { computed } from "vue";
import EntityTypePanel from "@/components/EntityTypePanel.vue";

const props = defineProps<{
  equipment: EquipmentItem;
}>();

const equipmentModel = computed(() => props.equipment?.model ?? null);
</script>
<template>
  <div v-if="equipmentModel">
    <h4 class="text-sm font-bold mt-2">EquipmentItem Model</h4>
    <EntityTypePanel v-if="equipmentModel?.entityType" :entity-type="equipmentModel.entityType">
    </EntityTypePanel>
  </div>
  <div v-else>
    <h4 class="text-sm font-bold mt-2">No equipment model provided</h4>
  </div>
</template>
