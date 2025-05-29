<script setup lang="ts">
import { useScenarioStore } from "@/stores/scanarioStore.ts";
import { Button } from "@/components/ui/button";
import { useDialogStore } from "@/stores/dialogStore.ts";

const { msdl } = useScenarioStore();
const dialogStore = useDialogStore();
</script>
<template>
  <div v-if="msdl">
    <h4 class="text-sm font-bold mt-2">Scenario info</h4>

    <p>Name: {{ msdl.scenarioId.name }}</p>
    <p>Description: {{ msdl.scenarioId.name }}</p>
    <p>Security classification: {{ msdl.scenarioId.securityClassification }}</p>

    <Button variant="outline" class="mt-2" @click="dialogStore.toggleAssociationDialog()"
      >Show associations</Button
    >
  </div>
</template>
