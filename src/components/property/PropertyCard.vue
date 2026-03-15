<script setup lang="ts">
import type { Property } from "@/types/Property";
import { MapPin, BedDouble, Bath, Ruler } from "lucide-vue-next";
import FavoriteButton from "./FavoriteButton.vue";

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
  <article
    class="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-800 group"
  >
    <!-- Image -->
    <div class="relative overflow-hidden aspect-[4/3]">
      <img
        :src="property.image"
        :alt="property.title"
        width="400"
        height="300"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <div
        class="absolute top-3 left-3 bg-accent text-white text-sm font-bold px-3 py-1 rounded-lg"
      >
        {{ formatPrice(property.price) }}
      </div>
      <div class="absolute top-3 right-3">
        <FavoriteButton :property-id="property.id" />
      </div>
    </div>

    <!-- Content -->
    <div class="p-5">
      <h3
        class="font-heading text-lg font-semibold text-gray-900 dark:text-white line-clamp-1"
      >
        {{ property.title }}
      </h3>
      <div
        class="flex items-center gap-1 mt-1 text-gray-500 dark:text-gray-400"
      >
        <MapPin :size="14" />
        <span class="text-sm">{{ property.location }}</span>
      </div>

      <!-- Features -->
      <div
        class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400"
      >
        <div v-if="property.bedrooms" class="flex items-center gap-1">
          <BedDouble :size="16" class="text-accent" />
          <span
            >{{ property.bedrooms }}
            {{ property.bedrooms === 1 ? "Bed" : "Beds" }}</span
          >
        </div>
        <div v-if="property.bathrooms" class="flex items-center gap-1">
          <Bath :size="16" class="text-accent" />
          <span
            >{{ property.bathrooms }}
            {{ property.bathrooms === 1 ? "Bath" : "Baths" }}</span
          >
        </div>
        <div class="flex items-center gap-1">
          <Ruler :size="16" class="text-accent" />
          <span>{{ property.lotArea }} sqm</span>
        </div>
      </div>
    </div>
  </article>
</template>
