<script setup lang="ts">
import type { Property } from "@/types/Property";
import { MapPin, BedDouble, Bath, Ruler } from "lucide-vue-next";

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
  <div class="w-64 p-0 overflow-hidden rounded-lg shadow-lg">
    <img
      :src="property.image"
      :alt="property.title"
      class="w-full h-32 object-cover"
    />
    <div class="p-3 bg-white dark:bg-gray-900">
      <p class="text-sm font-bold text-accent">
        {{ formatPrice(property.price) }}
      </p>
      <p
        class="text-sm font-medium text-gray-900 dark:text-white line-clamp-1 mt-0.5"
      >
        {{ property.title }}
      </p>
      <div
        class="flex items-center gap-1 mt-1 text-gray-500 dark:text-gray-400"
      >
        <MapPin :size="12" />
        <span class="text-xs">{{ property.location }}</span>
      </div>
      <div
        class="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400"
      >
        <span v-if="property.bedrooms" class="flex items-center gap-0.5">
          <BedDouble :size="12" />
          {{ property.bedrooms }}
        </span>
        <span v-if="property.bathrooms" class="flex items-center gap-0.5">
          <Bath :size="12" />
          {{ property.bathrooms }}
        </span>
        <span class="flex items-center gap-0.5">
          <Ruler :size="12" />
          {{ property.lotArea }} sqm
        </span>
      </div>
      <RouterLink
        :to="{ name: 'property-details', params: { id: property.id } }"
        class="mt-3 block text-center text-xs font-semibold text-white bg-accent hover:bg-blue-700 rounded-md py-1.5 transition-colors"
      >
        View Details
      </RouterLink>
    </div>
  </div>
</template>
