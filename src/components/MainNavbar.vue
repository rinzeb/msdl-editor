<script setup lang="ts">
import MainDropdownMenu from "@/MainDropdownMenu.vue";
import { MoonIcon, SunIcon } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { useDark, useToggle } from "@vueuse/core";
import { injectStrict } from "@/utils.ts";
import { activeScenarioKey } from "@/components/injects.ts";
import { MilitaryScenario } from "@orbat-mapper/msdllib";
import { loadMSDLFromFile } from "@/lib/io.ts";

const emit = defineEmits<{ loaded: [scenario: MilitaryScenario] }>();
const msdl = injectStrict(activeScenarioKey);

const isDark = useDark();
const toggleDark = useToggle(isDark);

async function doLoading() {
  try {
    const scn = await loadMSDLFromFile();
    emit("loaded", scn);
  } catch (e) {
    console.error(e);
  }
}
</script>
<template>
  <nav class="flex items-center justify-between p-1 border-b">
    <div class="pl-2 flex items-center gap-2">
      <MainDropdownMenu @loaded="emit('loaded', $event)" />
      <div v-if="msdl">{{ msdl.scenarioId.name || "No title" }}</div>
      <Button v-else variant="outline" @click="doLoading">Load scenario</Button>
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
