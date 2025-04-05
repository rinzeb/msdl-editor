<script setup lang="ts">
import { XIcon } from "lucide-vue-next";
</script>
<template>
  <button
    type="button"
    class="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
  >
    <XIcon class="w-5 h-5" />
    <span class="sr-only">Close</span>
  </button>
</template>
