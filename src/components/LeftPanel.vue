<script setup lang="ts">
import { ChevronsRight } from "lucide-vue-next";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SidePanel from "@/components/SidePanel.vue";
import { useUIStore } from "@/stores/uiStore.ts";
import CloseButton from "@/components/CloseButton.vue";
import { Button } from "@/components/ui/button";
import PanelMapDisplay from "@/components/PanelMapDisplay.vue";

const uiStore = useUIStore();
</script>
<template>
  <aside
    v-if="uiStore.showLeftPanel"
    class="h-full max-h-[90vh] w-96 bg-card/95 pointer-events-auto border rounded-md relative"
  >
    <Tabs default-value="orbat" class="flex flex-col h-full">
      <header class="flex-0 flex items-center justify-between w-full gap-2 p-2">
        <TabsList class="grid flex-auto grid-cols-3">
          <TabsTrigger value="orbat">ORBAT</TabsTrigger>
          <TabsTrigger value="mapdisplay">Map display</TabsTrigger>
          <TabsTrigger value="nn">Info</TabsTrigger>
        </TabsList>
        <CloseButton @click="uiStore.toggleLeftPanel()" />
      </header>
      <ScrollArea class="flex-auto px-4">
        <TabsContent value="orbat">
          <SidePanel />
        </TabsContent>
        <TabsContent value="mapdisplay">
          <PanelMapDisplay class="mt-6" />
        </TabsContent>
        <TabsContent value="nn">
          <p>This is an empty tab.</p>
        </TabsContent>
      </ScrollArea>
    </Tabs>
  </aside>
  <Button
    v-else
    variant="outline"
    @click="uiStore.toggleLeftPanel()"
    size="icon"
    class="pointer-events-auto"
  >
    <ChevronsRight class="size-4" />
    <span class="sr-only">Open panel</span>
  </Button>
</template>
