<script setup lang="ts">
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { EquipmentItem, Unit } from "@orbat-mapper/msdllib";
import XmlBeautify from "xml-beautify";
import CloseButton from "@/components/CloseButton.vue";
import { useSelectStore } from "@/stores/selectStore.ts";
import MilSymbol from "@/components/MilSymbol.vue";
import { computed } from "vue";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const props = defineProps<{
  item: Unit | EquipmentItem;
}>();

const emit = defineEmits(["flyTo"]);

const selectStore = useSelectStore();

const prettyXML = computed(() => {
  return new XmlBeautify().beautify(props.item.element.outerHTML, {
    indent: "  ",
    useSelfClosingElement: true,
  });
});
const typeLabel = computed(() => {
  if (props.item instanceof Unit) {
    return "Unit";
  }
  if (props.item instanceof EquipmentItem) {
    return "Equipment";
  }
  return "Item";
});
</script>

<template>
  <Card class="text-sm bg-card/90 relative min-w-[200px]">
    <header class="p-4 mt-4 h-20 flex justify-between">
      <div class="flex gap-2">
        <MilSymbol :sidc="item.sidc" :key="item.sidc" :size="16" />
        <span class="text-base font-bold">{{ item.label }}</span>
      </div>
      <div>
        <Badge>{{ typeLabel }}</Badge>
      </div>
    </header>
    <Tabs default-value="info" class="">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="info">Info</TabsTrigger>
        <TabsTrigger value="xml">XML</TabsTrigger>
      </TabsList>
      <ScrollArea class="">
        <div class="max-h-[60vh] min-w-96">
          <TabsContent value="info" class="p-4">
            <Button :disabled="!item.location" @click="emit('flyTo', item)" variant="outline"
              >Fly to</Button
            >
          </TabsContent>
          <TabsContent value="xml"
            ><div class="max-w-[40vw]">
              <div class="bg-muted p-2 overflow-auto">
                <code class="">
                  <pre>{{ prettyXML }}</pre>
                </code>
              </div>
            </div></TabsContent
          >
        </div>
      </ScrollArea>
    </Tabs>
    <CloseButton class="absolute right-4 top-2" @click="selectStore.clearActiveItem()" />
  </Card>
</template>
