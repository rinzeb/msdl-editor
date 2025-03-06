<script setup lang="ts">
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { nanoid } from "nanoid";

const checked = defineModel<boolean>({ required: true });
const id = nanoid();
</script>
<template>
  <div class="flex items-center gap-2">
    <Switch :id="id" v-model:checked="checked" />
    <Label :for="id"><slot /></Label>
  </div>
</template>
