<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { TabsList, type TabsListProps } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps<TabsListProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = reactiveOmit(props, "class");
</script>

<template>
  <TabsList
    data-slot="tabs-list"
    v-bind="delegatedProps"
    :class="
      cn('border-b text-sm font-medium border-muted-foreground/50 flex px-2 gap-x-3', props.class)
    "
  >
    <slot />
  </TabsList>
</template>
