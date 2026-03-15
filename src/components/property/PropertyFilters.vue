<script setup lang="ts">
import { Search } from "lucide-vue-next";

const props = defineProps<{
  location: string;
  priceMin: number;
  priceMax: number;
  bedrooms: number;
  propertyType: string;
}>();

const emit = defineEmits<{
  (e: "update:location", value: string): void;
  (e: "update:priceMin", value: number): void;
  (e: "update:priceMax", value: number): void;
  (e: "update:bedrooms", value: number): void;
  (e: "update:propertyType", value: string): void;
  (e: "reset"): void;
}>();

const locations = [
  "All Locations",
  "General Trias, Cavite",
  "Tagaytay City, Cavite",
  "Imus, Cavite",
  "Silang, Cavite",
  "Bacoor, Cavite",
  "Dasmariñas, Cavite",
  "Kawit, Cavite",
  "Rosario, Cavite",
];

const propertyTypes = [
  "All Types",
  "House",
  "Townhouse",
  "Condo",
  "Duplex",
  "Lot",
];
</script>

<template>
  <div
    class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6"
  >
    <div class="flex items-center gap-2 mb-5">
      <Search :size="20" class="text-accent" />
      <h3
        class="font-heading text-lg font-semibold text-gray-900 dark:text-white"
      >
        Filter Properties
      </h3>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <!-- Location -->
      <div>
        <label
          for="filter-location"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Location
        </label>
        <select
          id="filter-location"
          :value="props.location"
          @change="
            emit('update:location', ($event.target as HTMLSelectElement).value)
          "
          class="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
        >
          <option v-for="loc in locations" :key="loc" :value="loc">
            {{ loc }}
          </option>
        </select>
      </div>

      <!-- Price Min -->
      <div>
        <label
          for="filter-price-min"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Min Price
        </label>
        <input
          id="filter-price-min"
          type="number"
          :value="props.priceMin"
          @input="
            emit(
              'update:priceMin',
              Number(($event.target as HTMLInputElement).value),
            )
          "
          placeholder="0"
          min="0"
          class="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
        />
      </div>

      <!-- Price Max -->
      <div>
        <label
          for="filter-price-max"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Max Price
        </label>
        <input
          id="filter-price-max"
          type="number"
          :value="props.priceMax"
          @input="
            emit(
              'update:priceMax',
              Number(($event.target as HTMLInputElement).value),
            )
          "
          placeholder="10000000"
          min="0"
          class="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
        />
      </div>

      <!-- Bedrooms -->
      <div>
        <label
          for="filter-bedrooms"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Bedrooms
        </label>
        <select
          id="filter-bedrooms"
          :value="props.bedrooms"
          @change="
            emit(
              'update:bedrooms',
              Number(($event.target as HTMLSelectElement).value),
            )
          "
          class="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
        >
          <option :value="0">Any</option>
          <option :value="1">1+</option>
          <option :value="2">2+</option>
          <option :value="3">3+</option>
          <option :value="4">4+</option>
        </select>
      </div>

      <!-- Property Type -->
      <div>
        <label
          for="filter-type"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Property Type
        </label>
        <select
          id="filter-type"
          :value="props.propertyType"
          @change="
            emit(
              'update:propertyType',
              ($event.target as HTMLSelectElement).value,
            )
          "
          class="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
        >
          <option v-for="t in propertyTypes" :key="t" :value="t">
            {{ t }}
          </option>
        </select>
      </div>
    </div>

    <div class="mt-4 flex justify-end">
      <button
        @click="emit('reset')"
        class="text-sm text-accent hover:text-blue-700 font-medium transition-colors"
      >
        Reset Filters
      </button>
    </div>
  </div>
</template>
