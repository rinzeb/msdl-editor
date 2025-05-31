<script setup lang="ts">
import { FocusIcon, ArrowUpIcon } from "lucide-vue-next";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabsmod";
import { Button } from "@/components/ui/button";
import { EquipmentItem, Unit } from "@orbat-mapper/msdllib";
import XmlBeautify from "xml-beautify";
import CloseButton from "@/components/CloseButton.vue";
import { useSelectStore } from "@/stores/selectStore.ts";
import MilSymbol from "@/components/MilSymbol.vue";
import { computed } from "vue";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useScenarioStore } from "@/stores/scanarioStore.ts";

const props = defineProps<{
  item: Unit | EquipmentItem;
}>();

const emit = defineEmits(["flyTo"]);

const { msdl } = useScenarioStore();

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

function isUnit(item: Unit | EquipmentItem): item is Unit {
  return item instanceof Unit;
}

function goUp() {
  const parentItem =
    msdl.value?.getUnitById(props.item.superiorHandle) ??
    msdl.value?.getEquipmentById(props.item.superiorHandle);
  if (!parentItem) return;
  selectStore.activeItem = parentItem;
}
</script>

<template>
  <Card class="text-sm bg-sidebar/90 gap-0 backdrop-blur-lg relative min-w-[200px]">
    <header class="px-4 h-10 mt-4 flex justify-between">
      <div class="flex gap-2">
        <MilSymbol :sidc="item.sidc" :key="item.sidc" :size="16" />
        <span class="text-base font-bold">{{ item.label }}</span>
      </div>
      <div>
        <Badge>{{ typeLabel }}</Badge>
      </div>
    </header>
    <div class="flex items-center pl-2 py-1 border-b border-muted-foreground/20">
      <Button variant="ghost" size="icon" @click="emit('flyTo', item)" title="Zoom to item"
        ><FocusIcon
      /></Button>
      <Button variant="ghost" size="icon" @click="goUp" title="Go to parent"
        ><ArrowUpIcon
      /></Button>
    </div>
    <Tabs default-value="info" class="mt-0">
      <TabsList class="w-full flex">
        <TabsTrigger value="info">Info</TabsTrigger>
        <TabsTrigger v-if="isUnit(item)" value="equipment"
          >Equipment
          <Badge class="ml-2 px-1 py-0 text-xs rounded-full">{{ item.equipment.length }}</Badge>
        </TabsTrigger>
        <TabsTrigger value="xml">XML</TabsTrigger>
      </TabsList>
      <ScrollArea class="">
        <div class="max-h-[50vh] min-w-96">
          <TabsContent value="info" class="p-4">
            <Button :disabled="!item.location" @click="emit('flyTo', item)" variant="outline"
              >Fly to</Button
            >
          </TabsContent>
          <TabsContent v-if="isUnit(item)" value="equipment" class="p-4">
            <ul class="list-disc pl-4">
              <li
                v-for="eq in item.equipment"
                :key="eq.objectHandle"
                class="flex items-center gap-2"
              >
                <MilSymbol :sidc="eq.sidc" :size="16" />
                <Button variant="link" size="sm" @click="emit('flyTo', eq)">{{ eq.label }}</Button>
              </li>
            </ul>
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
