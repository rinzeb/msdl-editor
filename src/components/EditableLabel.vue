<script setup lang="ts">
import { EditableArea, EditableInput, EditablePreview, EditableRoot } from "reka-ui";

const v = defineModel({ type: String, required: true });
</script>

<template>
  <EditableRoot
    submit-mode="both"
    default-value="Click to edit"
    placeholder="Enter text..."
    auto-resize
    v-model="v"
  >
    <EditableArea
      class="focus-within:ring-2 focus-within:border-ring ring-ring/50 ring-offset-4 rounded cursor-text data-[disabled]:cursor-default data-[readonly]cursor-default"
    >
      <EditablePreview />
      <EditableInput class="placeholder:text-muted-foreground" />
    </EditableArea>
  </EditableRoot>
</template>
