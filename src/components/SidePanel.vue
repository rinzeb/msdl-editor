<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-vue-next";
import { Switch } from "@/components/ui/switch";
import { useLayerStore } from "@/stores/layerStore.ts";
import ForceSideMenu from "@/components/ForceSideMenu.vue";
import { Badge } from "@/components/ui/badge";
import OrbatTree from "@/components/OrbatTree.vue";
import { computed } from "vue";
import { injectStrict, sortBy } from "@/utils.ts";
import { activeScenarioKey } from "@/components/injects.ts";
import { Button } from "@/components/ui/button";
import SwitchLabel from "@/components/SwitchLabel.vue";

const msdl = injectStrict(activeScenarioKey);

const store = useLayerStore();

const sides = computed(() => {
  return sortBy(msdl.value?.sides ?? [], "name").filter((side) => side.rootUnits.length > 0);
});

function toggleLayers() {
  if (store.layers.size >= sides.value.length) {
    store.layers.clear();
    return;
  }
  sides.value.forEach((side) => {
    store.layers.add(side.objectHandle);
  });
}

const toggleSide = (id: string) => {
  if (store.layers.has(id)) {
    store.layers.delete(id);
  } else {
    store.layers.add(id);
  }
};
</script>

<template>
  <Accordion type="multiple" class="">
    <AccordionItem v-for="side in sides" :key="side.objectHandle" :value="side.objectHandle">
      <AccordionTrigger
        ><div class="flex items-center gap-2">
          <span class="font-medium">{{ side.name }}</span
          ><Badge v-if="side === msdl?.primarySide">Primary</Badge>
        </div>
        <template #icon>
          <div class="flex items-center gap-2">
            <Switch
              @click.stop
              :modelValue="store.layers.has(side.objectHandle)"
              @update:modelValue="toggleSide(side.objectHandle)"
              title="Toggle visibility"
            />
            <ForceSideMenu :side="side" />
            <ChevronDown
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 data-[state=open]:rotate-90"
            />
          </div>
        </template>
      </AccordionTrigger>
      <AccordionContent>
        <OrbatTree :side="side" />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
  <div v-if="msdl">
    <h4 class="text-sm font-bold mt-2">Map display</h4>
    <div class="grid gap-4 sm:grid-cols-2 grid-cols-1 mt-4">
      <SwitchLabel v-model="store.showUnits">Show units</SwitchLabel>
      <SwitchLabel v-model="store.showEquipment">Show equipment</SwitchLabel>
      <SwitchLabel v-model="store.showLabels">Show labels</SwitchLabel>
    </div>
    <div class="mt-4">
      <Button variant="secondary" @click="toggleLayers()">Toggle layers visibility</Button>
    </div>
  </div>
</template>
