<script setup lang="ts">
import type { Property } from "@/types/Property";
import {
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Maximize,
  Home,
} from "lucide-vue-next";

defineProps<{
  property: Property;
}>();

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(price);
}
</script>

<template>
  <div>
    <!-- Price & Title -->
    <div class="mb-6">
      <p class="text-3xl font-heading font-bold text-accent">
        {{ formatPrice(property.price) }}
      </p>
      <h1
        class="font-heading text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-2"
      >
        {{ property.title }}
      </h1>
      <div
        class="flex items-center gap-1 mt-2 text-gray-500 dark:text-gray-400"
      >
        <MapPin :size="16" />
        <span>{{ property.location }}</span>
      </div>
    </div>

    <!-- Specs Grid -->
    <div
      class="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 dark:bg-gray-800 rounded-xl p-5 mb-6"
    >
      <div v-if="property.bedrooms" class="text-center">
        <BedDouble :size="24" class="text-accent mx-auto mb-1" />
        <p class="text-sm font-medium text-gray-900 dark:text-white">
          {{ property.bedrooms }}
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400">Bedrooms</p>
      </div>
      <div v-if="property.bathrooms" class="text-center">
        <Bath :size="24" class="text-accent mx-auto mb-1" />
        <p class="text-sm font-medium text-gray-900 dark:text-white">
          {{ property.bathrooms }}
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400">Bathrooms</p>
      </div>
      <div v-if="property.lotArea" class="text-center">
        <Ruler :size="24" class="text-accent mx-auto mb-1" />
        <p class="text-sm font-medium text-gray-900 dark:text-white">
          {{ property.lotArea }} sqm
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400">Lot Area</p>
      </div>
      <div v-if="property.floorArea" class="text-center">
        <Maximize :size="24" class="text-accent mx-auto mb-1" />
        <p class="text-sm font-medium text-gray-900 dark:text-white">
          {{ property.floorArea }} sqm
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400">Floor Area</p>
      </div>
    </div>

    <!-- Property Type -->
    <div class="flex items-center gap-2 mb-6">
      <Home :size="16" class="text-accent" />
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
        Property Type:
      </span>
      <span
        class="text-sm bg-accent/10 dark:bg-accent/20 text-accent px-2 py-0.5 rounded"
      >
        {{ property.type }}
      </span>
    </div>

    <!-- Description -->
    <div v-if="property.description">
      <h2
        class="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-3"
      >
        Description
      </h2>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
        {{ property.description }}
      </p>
    </div>
  </div>
</template>
