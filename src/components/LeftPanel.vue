<script setup lang="ts">
import { ChevronsRight } from "lucide-vue-next";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SidePanel from "@/components/SidePanel.vue";
import { useUIStore } from "@/stores/uiStore.ts";
import CloseButton from "@/components/CloseButton.vue";
import { Button } from "@/components/ui/button";

const uiStore = useUIStore();
</script>
<template>
  <aside
    v-if="uiStore.showLeftPanel"
    class="h-full max-h-[90vh] w-96 bg-card/95 pointer-events-auto border rounded-md relative"
  >
    <Tabs default-value="orbat" class="flex flex-col h-full">
      <TabsList class="flex-0 grid w-full grid-cols-2 relative pr-10">
        <TabsTrigger value="orbat">ORBAT</TabsTrigger>
        <TabsTrigger value="nn">Info</TabsTrigger>
        <CloseButton class="absolute right-2 top-2" @click="uiStore.toggleLeftPanel()" />
      </TabsList>
      <ScrollArea class="flex-auto p-2">
        <TabsContent value="orbat">
          <SidePanel />
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
