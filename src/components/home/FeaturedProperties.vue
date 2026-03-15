<script setup lang="ts">
import { mockProperties } from "@/data/mockProperties";
import PropertyCard from "@/components/property/PropertyCard.vue";
</script>

<template>
  <section id="properties" class="py-16 md:py-24 bg-gray-50 dark:bg-gray-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <p
          class="text-accent font-semibold text-sm uppercase tracking-wider mb-2"
        >
          Explore Listings
        </p>
        <h2
          class="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
        >
          Featured Properties
        </h2>
        <p class="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Browse our hand-picked selection of quality properties in Cavite —
          from affordable townhouses to premium family homes.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <RouterLink
          v-for="property in mockProperties.slice(0, 6)"
          :key="property.id"
          :to="{ name: 'property-details', params: { id: property.id } }"
          class="block"
        >
          <PropertyCard :property="property" />
        </RouterLink>
      </div>

      <div class="text-center mt-10">
        <RouterLink
          to="/properties"
          class="inline-flex items-center justify-center px-8 py-3 bg-accent hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm"
        >
          View All Properties
        </RouterLink>
      </div>
    </div>
  </section>
</template>
