<script setup lang="ts">
import PanelDataGrid from "@/components/PanelDataGrid.vue";
import { useEntityTypeStore } from "@/stores/entityTypeStore";
import { computed } from "vue";
import { SisoEnum } from "@siso-entity-type/lib";
import { storeToRefs } from "pinia";

const { sisoEnums } = storeToRefs(useEntityTypeStore());

const props = defineProps<{
  entityType: string;
}>();

const sisoEntityType = computed(() =>
  props.entityType ? SisoEnum.fromString(props.entityType) : null,
);

</script>
<template>
  <div v-if="sisoEntityType">
    <h4 class="text-sm font-bold mt-2">Entity type: {{ props.entityType || "Unknown" }}</h4>
    <PanelDataGrid class="mt-4" v-if="sisoEntityType">
      <span class="font-semibold">Kind</span>
      <span>{{ sisoEnums.getKindName(sisoEntityType) }}</span>
      <span class="font-semibold">Domain</span>
      <span>{{ sisoEnums.getDomainName(sisoEntityType) }}</span>
      <span class="font-semibold">Country</span>
      <span>{{ sisoEnums.getCountryName(sisoEntityType) }}</span>
      <span class="font-semibold">Category</span>
      <span>{{ sisoEnums.getCategoryName(sisoEntityType) }}</span>
      <span class="font-semibold">Subcategory</span>
      <span>{{ sisoEnums.getSubcategoryName(sisoEntityType) }}</span>
      <span class="font-semibold">Specific</span>
      <span>{{ sisoEnums.getSpecificName(sisoEntityType) }}</span>
      <span class="font-semibold">Extra</span>
      <span>{{ sisoEnums.getExtraName(sisoEntityType) }}</span>
    </PanelDataGrid>
    <PanelDataGrid class="mt-4" v-else>
      <span class="font-semibold">No entitytype provided</span>
    </PanelDataGrid>
  </div>
</template>
