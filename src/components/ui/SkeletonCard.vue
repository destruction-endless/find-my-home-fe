<script setup lang="ts">
defineProps<{
  count?: number;
}>();
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="i in count || 6"
      :key="i"
      class="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 animate-pulse"
      role="status"
      :aria-label="`Loading property ${i}`"
    >
      <!-- Image placeholder -->
      <div class="aspect-[4/3] bg-gray-200 dark:bg-gray-800" />

      <!-- Content placeholder -->
      <div class="p-5 space-y-3">
        <div class="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
        <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
        <div
          class="pt-4 border-t border-gray-100 dark:border-gray-800 flex gap-4"
        >
          <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-16" />
          <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-16" />
          <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-16" />
        </div>
      </div>
    </div>
  </div>
</template>
