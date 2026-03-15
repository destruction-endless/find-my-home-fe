<template>
  <DemoBanner />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import DemoBanner from "@/components/ui/DemoBanner.vue";
</script>
