<script setup lang="ts">
import { RouterView } from "vue-router";
import { Toaster } from "vue-sonner";
</script>

<template>
  <RouterView />
  <Toaster class="pointer-events-auto" />
</template>
