<script setup lang="ts">
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MilitaryScenario } from "@orbat-mapper/msdllib";
import LoadScenarioPanel from "@/components/LoadScenarioPanel.vue";

const emit = defineEmits<{ loaded: [scenario: MilitaryScenario] }>();

const open = defineModel<boolean>("open", { required: true });

function onLoaded(scenario: MilitaryScenario) {
  emit("loaded", scenario);
  open.value = false;
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Load local MSDL file</DialogTitle>
      </DialogHeader>
      <LoadScenarioPanel @loaded="onLoaded" />
    </DialogContent>
  </Dialog>
</template>
