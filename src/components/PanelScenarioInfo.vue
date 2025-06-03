<script setup lang="ts">
import { useScenarioStore } from "@/stores/scanarioStore.ts";
import { Button } from "@/components/ui/button";
import { useDialogStore } from "@/stores/dialogStore.ts";
import PanelDataGrid from "@/components/PanelDataGrid.vue";

const { msdl } = useScenarioStore();
const dialogStore = useDialogStore();
</script>
<template>
  <div v-if="msdl">
    <h4 class="text-sm font-bold mt-2">Scenario info</h4>

    <PanelDataGrid class="mt-4">
      <span class="font-semibold">Name</span>
      <span>{{ msdl.scenarioId.name }}</span>
      <span class="font-semibold">Description</span>
      <span>{{ msdl.scenarioId.description }}</span>
      <span class="font-semibold">Security classification</span>
      <span>{{ msdl.scenarioId.securityClassification }}</span>
    </PanelDataGrid>

    <Button variant="outline" class="mt-2" @click="dialogStore.toggleAssociationDialog()"
      >Show associations</Button
    >
  </div>
</template>
