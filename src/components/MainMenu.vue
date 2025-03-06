<script setup lang="ts">
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useLayerStore, useMapSettingsStore } from "@/stores/layerStore.ts";
import { useDialogStore } from "@/stores/dialogStore.ts";

const store = useLayerStore();
const mapSettings = useMapSettingsStore();
const dialogStore = useDialogStore();
</script>

<template>
  <Menubar>
    <MenubarMenu>
      <MenubarTrigger>File</MenubarTrigger>
      <MenubarContent>
        <MenubarItem @select="dialogStore.toggleUrlDialog()">Load MSDL from URL ...</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <!--    <MenubarMenu>-->
    <!--      <MenubarTrigger>View</MenubarTrigger>-->
    <!--      <MenubarContent> </MenubarContent>-->
    <!--    </MenubarMenu>-->
    <MenubarMenu>
      <MenubarTrigger>Map</MenubarTrigger>
      <MenubarContent>
        <MenubarSub>
          <MenubarSubTrigger>Debugging</MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarCheckboxItem v-model:checked="store.showIconAnchors" @select.prevent
              >Show icon anchors</MenubarCheckboxItem
            >
            <MenubarCheckboxItem v-model:checked="mapSettings.showCollisionBoxes" @select.prevent
              >Show collision boxes</MenubarCheckboxItem
            >
            <MenubarCheckboxItem v-model:checked="mapSettings.showTileBoundaries" @select.prevent
              >Show tile boundaries</MenubarCheckboxItem
            >
            <MenubarCheckboxItem v-model:checked="mapSettings.showPadding" @select.prevent
              >Show padding</MenubarCheckboxItem
            >
            <MenubarCheckboxItem v-model:checked="mapSettings.showOverdrawInspector" @select.prevent
              >Show overdraw inspector</MenubarCheckboxItem
            >
          </MenubarSubContent>
        </MenubarSub>

        <MenubarSeparator />
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
