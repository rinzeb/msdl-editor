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
import { sortBy } from "@/utils.ts";
import { Button } from "@/components/ui/button";
import { useScenarioStore } from "@/stores/scanarioStore.ts";

const { msdl } = useScenarioStore();

const layerStore = useLayerStore();

const sides = computed(() => {
  return sortBy(msdl.value?.sides ?? [], "name").filter((side) => side.rootUnits.length > 0);
});

function toggleLayers() {
  if (layerStore.layers.size >= sides.value.length) {
    layerStore.layers.clear();
    return;
  }
  sides.value.forEach((side) => {
    layerStore.layers.add(side.objectHandle);
  });
}

const toggleSide = (id: string) => {
  if (layerStore.layers.has(id)) {
    layerStore.layers.delete(id);
  } else {
    layerStore.layers.add(id);
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
              :modelValue="layerStore.layers.has(side.objectHandle)"
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
    <div class="mt-4">
      <Button variant="secondary" @click="toggleLayers()">Toggle layers visibility</Button>
    </div>
  </div>
</template>
