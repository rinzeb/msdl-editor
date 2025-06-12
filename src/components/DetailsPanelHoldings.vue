<script setup lang="ts">
import { type EquipmentItem, type Unit } from "@orbat-mapper/msdllib";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const props = defineProps<{
  item: Unit | EquipmentItem;
}>();
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>On hand</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="(holding, i) in item.holdings" :key="i">
        <TableCell class="w-1/3">{{ holding.nsnName }}</TableCell>
        <TableCell class="w-2/3">{{ holding.onHandQuantity }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
