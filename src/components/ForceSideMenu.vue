<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical as DotsVerticalIcon } from "lucide-vue-next";
import { injectStrict } from "@/utils.ts";
import { activeScenarioKey } from "@/components/injects.ts";
import { computed, triggerRef } from "vue";
import { type ForceSide, StandardIdentity } from "@orbat-mapper/msdllib";

const props = defineProps<{
  side: ForceSide;
}>();
const msdl = injectStrict(activeScenarioKey);

function setPrimarySide() {
  if (!msdl.value) return;
  msdl.value.primarySide = props.side;
  triggerRef(msdl);
}

const affiliation = computed({
  get: (): string => (msdl.value && props.side.getAffiliation()) || StandardIdentity.Unknown,
  set: (v: string) => {
    props.side.setAffiliation(v as StandardIdentity);
    triggerRef(msdl);
  },
});
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button @click.stop variant="outline" size="icon">
        <DotsVerticalIcon class="size-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="">
      <DropdownMenuLabel>ForceSide actions</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem @select.prevent="setPrimarySide">Set as primary side</DropdownMenuItem>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Set affiliation</DropdownMenuSubTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup v-model="affiliation">
            <DropdownMenuRadioItem
              v-for="(v, k) in StandardIdentity"
              :key="k"
              :value="v"
              @select.prevent
              >{{ k }}</DropdownMenuRadioItem
            >
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenuSub>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
