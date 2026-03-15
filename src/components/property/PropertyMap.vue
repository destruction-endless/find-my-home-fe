<script setup lang="ts">
import type { Property } from "@/types/Property";

defineProps<{
  properties?: Property[];
  center?: { lat: number; lng: number };
  zoom?: number;
}>();
</script>

<template>
  <div
    class="w-full h-full min-h-[300px] bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center"
  >
    <div class="text-center p-8">
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Map component ready. Configure your Google Maps API key to display
        property locations.
      </p>
      <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">
        Powered by @fawmi/vue-google-maps
      </p>
    </div>
  </div>
</template>
