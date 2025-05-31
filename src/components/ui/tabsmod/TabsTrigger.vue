<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = reactiveOmit(props, "class");

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <TabsTrigger
    data-slot="tabs-trigger"
    v-bind="forwardedProps"
    :class="
      cn(
        `data-[state=active]:shadow-none px-2 data-[state=active]:text-foreground text-foreground/70  border-b-2 border-transparent data-[state=active]:border-primary py-3 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
        props.class,
      )
    "
  >
    <slot />
  </TabsTrigger>
</template>
