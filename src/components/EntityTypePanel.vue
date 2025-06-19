<script setup lang="ts">
import PanelDataGrid from "@/components/PanelDataGrid.vue";
import { useEntityTypeStore } from "@/stores/entityTypeStore";
import { computed } from "vue";
import { SisoEnum } from "@siso-entity-type/lib";
import { storeToRefs } from "pinia";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-vue-next";

const { sisoEnums } = storeToRefs(useEntityTypeStore());

const entityType = defineModel<string>();

const sisoEntityType = computed(() =>
  entityType.value ? SisoEnum.fromString(entityType.value) : null,
);

const entityTypeFields = computed(() => {
  if (!sisoEntityType.value) return [];
  return [
    { label: "Kind", value: sisoEnums.value.getKindName(sisoEntityType.value) },
    { label: "Domain", value: sisoEnums.value.getDomainName(sisoEntityType.value) },
    { label: "Country", value: sisoEnums.value.getCountryName(sisoEntityType.value) },
    { label: "Category", value: sisoEnums.value.getCategoryName(sisoEntityType.value) },
    { label: "Subcategory", value: sisoEnums.value.getSubcategoryName(sisoEntityType.value) },
    { label: "Specific", value: sisoEnums.value.getSpecificName(sisoEntityType.value) },
    { label: "Extra", value: sisoEnums.value.getExtraName(sisoEntityType.value) },
  ];
});

// Filter out subsequent fields that are the same as the previous, e.g. specific == extra
const uniqueEntityTypeFields = computed(() => {
  return entityTypeFields.value.reduce(
    (acc, field) => {
      if (acc.length === 0 || acc[acc.length - 1].value !== field.value) {
        acc.push(field);
      }
      return acc;
    },
    [] as { label: string; value: string }[],
  );
});

const testUpdateEntityType = (newType: string = "1.1.110.81.112.2.0") => {
  updateEntityType(newType);
};

const updateEntityType = (newType: string) => {
  entityType.value = newType;
};
</script>
<template>
  <div v-if="sisoEntityType">
    <h4 class="text-sm font-bold mt-2 flex items-center">
      <span>Entity type: {{ entityType || "Unknown" }}</span>
      <Button @click="testUpdateEntityType(undefined)" variant="ghost" size="icon">
        <Pencil class="size-4" />
      </Button>
    </h4>
    <PanelDataGrid class="mt-4" v-if="sisoEntityType">
      <template v-for="(field, index) in uniqueEntityTypeFields" :key="index">
        <span class="font-semibold">{{ field.label }}</span>
        <span>{{ field.value }}</span>
      </template>
    </PanelDataGrid>
    <PanelDataGrid class="mt-4" v-else>
      <span class="font-semibold">No entitytype provided</span>
    </PanelDataGrid>
  </div>
</template>
