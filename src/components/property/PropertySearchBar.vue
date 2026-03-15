<script setup lang="ts">
import { Search } from "lucide-vue-next";

defineProps<{
  searchQuery: string;
  priceMin: number;
  priceMax: number;
  bedrooms: number;
}>();

const emit = defineEmits<{
  (e: "update:searchQuery", value: string): void;
  (e: "update:priceMin", value: number): void;
  (e: "update:priceMax", value: number): void;
  (e: "update:bedrooms", value: number): void;
}>();
</script>

<template>
  <div
    class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4"
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <!-- Location Search -->
      <div class="relative">
        <Search
          :size="16"
          class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          :value="searchQuery"
          @input="
            emit(
              'update:searchQuery',
              ($event.target as HTMLInputElement).value,
            )
          "
          placeholder="Search location..."
          class="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-gray-400"
          aria-label="Search by location"
        />
      </div>

      <!-- Min Price -->
      <div>
        <input
          type="number"
          :value="priceMin || ''"
          @input="
            emit(
              'update:priceMin',
              Number(($event.target as HTMLInputElement).value) || 0,
            )
          "
          placeholder="Min price"
          min="0"
          class="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-gray-400"
          aria-label="Minimum price"
        />
      </div>

      <!-- Max Price -->
      <div>
        <input
          type="number"
          :value="priceMax || ''"
          @input="
            emit(
              'update:priceMax',
              Number(($event.target as HTMLInputElement).value) || 0,
            )
          "
          placeholder="Max price"
          min="0"
          class="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-gray-400"
          aria-label="Maximum price"
        />
      </div>

      <!-- Bedrooms -->
      <div>
        <select
          :value="bedrooms"
          @change="
            emit(
              'update:bedrooms',
              Number(($event.target as HTMLSelectElement).value),
            )
          "
          class="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label="Number of bedrooms"
        >
          <option :value="0">Any Bedrooms</option>
          <option :value="1">1+ Bedroom</option>
          <option :value="2">2+ Bedrooms</option>
          <option :value="3">3+ Bedrooms</option>
          <option :value="4">4+ Bedrooms</option>
        </select>
      </div>
    </div>
  </div>
</template>
