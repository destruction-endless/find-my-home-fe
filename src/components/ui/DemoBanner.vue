<script setup lang="ts">
import { ref } from "vue";
import { X, Info } from "lucide-vue-next";

const dismissed = ref(false);
</script>

<template>
  <div
    v-if="!dismissed"
    class="bg-amber-50 dark:bg-amber-900/30 border-b border-amber-200 dark:border-amber-800"
    role="status"
  >
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4"
    >
      <div
        class="flex items-center gap-2 text-amber-800 dark:text-amber-200 text-xs sm:text-sm"
      >
        <Info :size="16" class="shrink-0" />
        <p class="font-body">
          <strong class="font-semibold">Demo Version</strong> — Property data is
          for demonstration purposes only.
        </p>
      </div>
      <button
        @click="dismissed = true"
        class="p-1 rounded hover:bg-amber-200/50 dark:hover:bg-amber-800/50 text-amber-700 dark:text-amber-300 transition-colors shrink-0"
        aria-label="Dismiss demo banner"
      >
        <X :size="16" />
      </button>
    </div>
  </div>
</template>
