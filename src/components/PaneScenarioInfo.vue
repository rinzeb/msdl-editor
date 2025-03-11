<script setup lang="ts">
import { useScenarioStore } from "@/stores/scanarioStore.ts";

const { msdl } = useScenarioStore();
</script>
<template>
  <div v-if="msdl">
    <h4 class="text-sm font-bold mt-2">Scenario info</h4>

    <p>Name: {{ msdl.scenarioId.name }}</p>
    <p>Description: {{ msdl.scenarioId.name }}</p>
    <p>Security classification: {{ msdl.scenarioId.securityClassification }}</p>
  </div>
</template>
