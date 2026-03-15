<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent } from "vue";
import { useSeo } from "@/composables/useSeo";
import { mockProperties } from "@/data/mockProperties";
import type { Property } from "@/types/Property";
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";
import { MapPin } from "lucide-vue-next";

const PropertyMap = defineAsyncComponent(
  () => import("@/components/map/PropertyMap.vue"),
);

onMounted(() => {
  useSeo({
    title: "Map Search",
    description:
      "Search properties on the map — find homes, lots, and condos in Cavite by location.",
    keywords: ["map search", "property map", "Cavite real estate"],
    canonicalPath: "/map",
  });
});

const defaultCenter = { lat: 14.33, lng: 120.93 };
const mapCenter = ref(defaultCenter);
const selectedPropertyId = ref<number | null>(null);

interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

const currentBounds = ref<MapBounds | null>(null);

const visibleProperties = computed(() => {
  if (!currentBounds.value) return mockProperties;
  const b = currentBounds.value;
  return mockProperties.filter(
    (p) =>
      p.latitude >= b.south &&
      p.latitude <= b.north &&
      p.longitude >= b.west &&
      p.longitude <= b.east,
  );
});

function onBoundsChanged(bounds: MapBounds) {
  currentBounds.value = bounds;
}

function onSelectProperty(property: Property) {
  selectedPropertyId.value = property.id;
}

function onSidebarPropertyClick(property: Property) {
  selectedPropertyId.value = property.id;
  mapCenter.value = {
    lat: property.latitude,
    lng: property.longitude,
  };
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(price);
}
</script>

<template>
  <Navbar />
  <main class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Header -->
    <div class="bg-primary dark:bg-gray-900 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="font-heading text-3xl font-bold text-white">Map Search</h1>
        <p class="mt-2 text-blue-200 dark:text-gray-400">
          Find properties by location on the map
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Map -->
        <div class="lg:col-span-2">
          <PropertyMap
            :properties="mockProperties"
            :center="mapCenter"
            :zoom="11"
            :selected-property-id="selectedPropertyId"
            @select="onSelectProperty"
            @bounds-changed="onBoundsChanged"
          />
        </div>

        <!-- Property List Sidebar -->
        <div class="space-y-4">
          <h2
            class="font-heading text-lg font-semibold text-gray-900 dark:text-white"
          >
            {{ visibleProperties.length }} Properties in View
          </h2>
          <div class="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            <article
              v-for="property in visibleProperties"
              :key="property.id"
              class="flex gap-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-md transition-shadow"
            >
              <img
                :src="property.image"
                :alt="property.title"
                width="112"
                height="84"
                class="w-28 h-full object-cover shrink-0"
                loading="lazy"
              />
              <div class="py-3 pr-3 min-w-0">
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
                <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {{ property.bedrooms }} bed &middot;
                  {{ property.bathrooms }} bath &middot;
                  {{ property.lotArea }} sqm
                </p>
                <div class="mt-2 flex items-center gap-3">
                  <button
                    @click="onSidebarPropertyClick(property)"
                    class="text-xs font-semibold text-accent hover:text-blue-700 transition-colors"
                    :aria-label="`Center map on ${property.title}`"
                  >
                    Center on Map
                  </button>
                  <RouterLink
                    :to="{
                      name: 'property-details',
                      params: { id: property.id },
                    }"
                    class="text-xs font-semibold text-accent hover:text-blue-700 transition-colors"
                  >
                    View Details
                  </RouterLink>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </main>
  <Footer />
</template>
