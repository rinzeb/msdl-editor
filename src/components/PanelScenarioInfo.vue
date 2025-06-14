<script setup lang="ts">
import { useScenarioStore } from "@/stores/scanarioStore.ts";
import { Button } from "@/components/ui/button";
import { useDialogStore } from "@/stores/dialogStore.ts";
import PanelDataGrid from "@/components/PanelDataGrid.vue";
import { Badge } from "@/components/ui/badge";
import ShowXMLDialog from "@/components/ShowXMLDialog.vue";
import { computed } from "vue";
import DescriptionItem from "@/components/DescriptionItem.vue";
import DescriptionList from "@/components/DescriptionList.vue";

const { msdl } = useScenarioStore();
const dialogStore = useDialogStore();

const myElement = computed(() => {
  return { element: msdl.value?.scenarioId.element };
});
</script>
<template>
  <div v-if="msdl">
    <div class="flex items-center justify-between">
      <h4 class="text-sm font-bold mt-2">Scenario info</h4>
      <Badge v-if="msdl.isNETN">NETN</Badge>
    </div>
    <DescriptionList class="divide-y divide-border">
      <DescriptionItem label="Name">{{ msdl.scenarioId.name || "n/a" }}</DescriptionItem>
      <DescriptionItem label="Description">{{ msdl.scenarioId.description }}</DescriptionItem>
      <DescriptionItem label="Security classification">
        {{ msdl.scenarioId.securityClassification }}
      </DescriptionItem>
      <DescriptionItem label="Modification date">
        {{ msdl.scenarioId.modificationDate || "n/a" }}
      </DescriptionItem>
      <DescriptionItem label="Type">{{ msdl.scenarioId.type || "n/a" }}</DescriptionItem>
      <DescriptionItem label="Version">{{ msdl.scenarioId.version || "n/a" }}</DescriptionItem>
    </DescriptionList>

    <div class="flex items-center mt-2">
      <Button variant="outline" class="" @click="dialogStore.toggleAssociationDialog()"
        >Show associations</Button
      >
    </div>
    <div class="mt-4">
      <h4 class="text-sm font-bold">Debugging</h4>
      <div class="flex gap-2 mt-2">
        <ShowXMLDialog :item="myElement" class="">ScenarioID</ShowXMLDialog>
        <ShowXMLDialog :item="msdl" class="">MSDL (slow)</ShowXMLDialog>
      </div>
    </div>
  </div>
</template>
