<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const props = defineProps<{
  open: boolean;
  title?: string;
  message?: string;
}>();

const emit = defineEmits(["update:open", "yes", "no"]);

function onYes() {
  emit("yes");
  emit("update:open", false);
}

function onNo() {
  emit("no");
  emit("update:open", false);
}
</script>

<template>
  <Dialog :open="open" @update:open="(value) => emit('update:open', value)">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ title || "Are you sure?" }}</DialogTitle>
        <DialogDescription>
          <slot name="description">{{ message }}</slot>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="secondary" @click="onNo">No</Button>
        <Button @click="onYes">Yes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
