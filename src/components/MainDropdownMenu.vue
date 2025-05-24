<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ExternalLinkIcon } from "lucide-vue-next";
import { useDialogStore } from "@/stores/dialogStore.ts";

import { useLayerStore, useMapSettingsStore } from "@/stores/layerStore.ts";
import { useScenarioStore } from "@/stores/scanarioStore.ts";
import { useScenarioActions } from "@/composables/scenarioActions.ts";

const store = useLayerStore();
const mapSettings = useMapSettingsStore();
const { msdl } = useScenarioStore();
const { dispatchAction } = useScenarioActions();

const dialogStore = useDialogStore();
</script>
<template>
  <DropdownMenu>
    <DropdownMenuTrigger
      class="p-2 hover:bg-accent rounded flex items-center gap-2 data-[state=open]:bg-accent"
    >
      <span class="font-bold tracking-tight">MSDL editor</span>
      <ChevronDown
        class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
      />
    </DropdownMenuTrigger>
    <DropdownMenuContent class="rounded min-w-48" align="start">
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>File</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem @click="dispatchAction('DownloadMSDL')">Download MSDL</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="dispatchAction('LoadMSDLFromFile')"
            >Load MSDL from file ...</DropdownMenuItem
          >
          <DropdownMenuItem @select="dialogStore.toggleUrlDialog()"
            >Load MSDL from URL ...</DropdownMenuItem
          >
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="dispatchAction('ExportKML')"
            >Export as KML/KMZ</DropdownMenuItem
          >
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger :disabled="!msdl">Map debugging</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuCheckboxItem v-model="store.showIconAnchors" @select.prevent
            >Show icon anchors</DropdownMenuCheckboxItem
          >
          <DropdownMenuCheckboxItem v-model="mapSettings.showCollisionBoxes" @select.prevent
            >Show collision boxes</DropdownMenuCheckboxItem
          >
          <DropdownMenuCheckboxItem v-model="mapSettings.showTileBoundaries" @select.prevent
            >Show tile boundaries</DropdownMenuCheckboxItem
          >
          <DropdownMenuCheckboxItem v-model="mapSettings.showPadding" @select.prevent
            >Show padding</DropdownMenuCheckboxItem
          >
          <DropdownMenuCheckboxItem v-model="mapSettings.showOverdrawInspector" @select.prevent
            >Show overdraw inspector</DropdownMenuCheckboxItem
          >
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSeparator />
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>About</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem as-child
            ><a href="https://github.com/orbat-mapper/msdl-editor/" target="_blank"
              ><ExternalLinkIcon /> GitHub project page</a
            ></DropdownMenuItem
          >
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
