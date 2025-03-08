<script setup lang="ts">
import MainDropdownMenu from "@/MainDropdownMenu.vue";
import { MoonIcon, SunIcon } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { useDark, useToggle } from "@vueuse/core";
import { injectStrict } from "@/utils.ts";
import { activeScenarioKey } from "@/components/injects.ts";

const msdl = injectStrict(activeScenarioKey);

const isDark = useDark();
const toggleDark = useToggle(isDark);
import { useDialogStore } from "@/stores/dialogStore.ts";

const dialogStore = useDialogStore();
</script>
<template>
  <nav class="flex items-center justify-between p-1 border-b">
    <div class="pl-2 flex items-center gap-2">
      <MainDropdownMenu />
      <div v-if="msdl">{{ msdl.scenarioId.name || "No title" }}</div>
      <Button v-else variant="outline" @click="dialogStore.toggleLoadDialog()"
        >Load scenario</Button
      >
    </div>

    <div>
      <Button variant="outline" @click="toggleDark()" size="icon">
        <MoonIcon v-if="isDark" class="size-4" />
        <SunIcon v-else class="size-4" />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </div>
  </nav>
</template>
