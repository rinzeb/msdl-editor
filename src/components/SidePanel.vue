<script setup lang="ts">
import {
  Accordion,
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/accordion";
import type { ForceSide } from "@orbat-mapper/msdllib";
import { ChevronDown } from "lucide-vue-next";
import { Switch } from "@/components/ui/switch";
import { useLayerStore } from "@/stores/layerStore.ts";
import ForceSideMenu from "@/components/ForceSideMenu.vue";
import { Badge } from "@/components/ui/badge";
import OrbatTree from "@/components/OrbatTree.vue";
defineProps<{ sides: ForceSide[]; primarySide?: ForceSide | null }>();
const store = useLayerStore();

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
          ><Badge v-if="side === primarySide">Primary</Badge>
        </div>
        <template #icon>
          <div class="flex items-center gap-2">
            <Switch
              @click.stop
              :checked="store.layers.has(side.objectHandle)"
              @update:checked="toggleSide(side.objectHandle)"
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
</template>
