<script setup lang="ts">
import { ChevronsRight } from "lucide-vue-next";
import { ScrollArea } from "@/components/ui/scroll-area";
import SidePanel from "@/components/SidePanel.vue";
import { useUIStore } from "@/stores/uiStore.ts";
import CloseButton from "@/components/CloseButton.vue";
import { Button } from "@/components/ui/button";

const uiStore = useUIStore();
</script>
<template>
  <ScrollArea
    v-if="uiStore.showLeftPanel"
    class="h-full w-96 bg-card/95 pointer-events-auto border rounded-md p-2 relative"
  >
    <CloseButton class="absolute right-2 top-2" @click="uiStore.toggleLeftPanel()" />
    <SidePanel />
  </ScrollArea>
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
