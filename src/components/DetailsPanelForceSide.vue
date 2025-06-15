<script setup lang="ts">
import type { ForceSide } from "@orbat-mapper/msdllib";
import DescriptionList from "@/components/DescriptionList.vue";
import DescriptionItem from "@/components/DescriptionItem.vue";

const props = defineProps<{
  item: ForceSide;
}>();
</script>

<template>
  <DescriptionList class="divide-y divide-border">
    <DescriptionItem label="Name">{{ item.name }}</DescriptionItem>
    <DescriptionItem v-if="item.militaryService" label="Military service">{{
      item.militaryService
    }}</DescriptionItem>
    <DescriptionItem v-if="item.countryCode" label="Country code">
      {{ item.countryCode }}
    </DescriptionItem>
  </DescriptionList>
</template>
