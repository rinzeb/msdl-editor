<script setup lang="ts">
import { ArrowUpIcon, FocusIcon } from "lucide-vue-next";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabsmod";
import { Button } from "@/components/ui/button";
import { EquipmentItem, Unit } from "@orbat-mapper/msdllib";
import CloseButton from "@/components/CloseButton.vue";
import { useSelectStore } from "@/stores/selectStore.ts";
import MilSymbol from "@/components/MilSymbol.vue";
import { computed } from "vue";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useScenarioStore } from "@/stores/scanarioStore.ts";
import DetailsPanelHoldings from "@/components/DetailsPanelHoldings.vue";
import ShowXMLDialog from "@/components/ShowXMLDialog.vue";
import UnitModelPanel from "@/components/UnitModelPanel.vue";
import EquipmentItemModelPanel from "@/components/EquipmentItemModelPanel.vue";

const props = defineProps<{
  item: Unit | EquipmentItem;
}>();

const emit = defineEmits(["flyTo"]);

const { msdl, isNETN } = useScenarioStore();

const selectStore = useSelectStore();

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

function isEquipmentItem(item: Unit | EquipmentItem): item is EquipmentItem {
  return item instanceof EquipmentItem;
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
      <ShowXMLDialog :item="item">XML</ShowXMLDialog>
    </div>
    <Tabs default-value="info" class="mt-0">
      <TabsList class="w-full flex">
        <TabsTrigger value="info">Info</TabsTrigger>
        <TabsTrigger v-if="isUnit(item)" value="equipment"
          >Equipment
          <Badge class="px-1 py-0 text-xs rounded-full">{{ item.equipment.length }}</Badge>
        </TabsTrigger>
        <TabsTrigger value="model">Model</TabsTrigger>
        <TabsTrigger v-if="isNETN" value="holdings"
          >Holdings
          <Badge class="ml-0 px-1 py-0 text-xs rounded-full">{{
            item.holdings.length
          }}</Badge></TabsTrigger
        >
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
          <TabsContent v-if="isNETN" value="holdings" class="p-4">
            <DetailsPanelHoldings :item="item" />
          </TabsContent>
          <TabsContent v-if="isUnit(item)" value="model">
            <div class="max-w-[40vw]">
              <div class="bg-muted p-2 overflow-auto">
                <UnitModelPanel :unit="item"> </UnitModelPanel>
              </div>
            </div>
          </TabsContent>
          <TabsContent v-if="isEquipmentItem(item)" value="model">
            <div class="max-w-[40vw]">
              <div class="bg-muted p-2 overflow-auto">
                <EquipmentItemModelPanel :equipment="item"> </EquipmentItemModelPanel>
              </div>
            </div>
          </TabsContent>
        </div>
      </ScrollArea>
    </Tabs>
    <CloseButton class="absolute right-4 top-2" @click="selectStore.clearActiveItem()" />
  </Card>
</template>
