<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useSeo } from "@/composables/useSeo";
import { mockProperties } from "@/data/mockProperties";
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";
import PropertyCard from "@/components/property/PropertyCard.vue";
import PropertyFilters from "@/components/property/PropertyFilters.vue";
import PropertySearchBar from "@/components/property/PropertySearchBar.vue";
import SkeletonCard from "@/components/ui/SkeletonCard.vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

onMounted(() => {
  useSeo({
    title: "Properties",
    description:
      "Browse available properties in Cavite — houses, townhouses, condos, lots, and more.",
    keywords: ["properties", "Cavite", "house and lot", "real estate listings"],
    canonicalPath: "/properties",
  });
  simulateLoading();
});

const searchQuery = ref("");
const location = ref("All Locations");
const priceMin = ref(0);
const priceMax = ref(0);
const bedrooms = ref(0);
const propertyType = ref("All Types");
const currentPage = ref(1);
const perPage = 6;
const isLoading = ref(true);

function simulateLoading() {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 600);
}

function resetFilters() {
  searchQuery.value = "";
  location.value = "All Locations";
  priceMin.value = 0;
  priceMax.value = 0;
  bedrooms.value = 0;
  propertyType.value = "All Types";
  currentPage.value = 1;
}

const filteredProperties = computed(() => {
  return mockProperties.filter((p) => {
    if (
      searchQuery.value &&
      !p.location.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
      !p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
      return false;
    if (location.value !== "All Locations" && p.location !== location.value)
      return false;
    if (priceMin.value > 0 && p.price < priceMin.value) return false;
    if (priceMax.value > 0 && p.price > priceMax.value) return false;
    if (bedrooms.value > 0 && p.bedrooms < bedrooms.value) return false;
    if (propertyType.value !== "All Types" && p.type !== propertyType.value)
      return false;
    return true;
  });
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredProperties.value.length / perPage)),
);

const paginatedProperties = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return filteredProperties.value.slice(start, start + perPage);
});

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
</script>

<template>
  <Navbar />
  <main class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Header -->
    <div class="bg-primary dark:bg-gray-900 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="font-heading text-3xl md:text-4xl font-bold text-white">
          Property Listings
        </h1>
        <p class="mt-2 text-blue-200 dark:text-gray-400">
          Browse {{ filteredProperties.length }} available properties in Cavite
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search Bar -->
      <PropertySearchBar
        :search-query="searchQuery"
        :price-min="priceMin"
        :price-max="priceMax"
        :bedrooms="bedrooms"
        @update:search-query="
          searchQuery = $event;
          currentPage = 1;
        "
        @update:price-min="
          priceMin = $event;
          currentPage = 1;
        "
        @update:price-max="
          priceMax = $event;
          currentPage = 1;
        "
        @update:bedrooms="
          bedrooms = $event;
          currentPage = 1;
        "
      />

      <!-- Filters -->
      <div class="mt-4">
        <PropertyFilters
          :location="location"
          :price-min="priceMin"
          :price-max="priceMax"
          :bedrooms="bedrooms"
          :property-type="propertyType"
          @update:location="
            location = $event;
            currentPage = 1;
          "
          @update:price-min="
            priceMin = $event;
            currentPage = 1;
          "
          @update:price-max="
            priceMax = $event;
            currentPage = 1;
          "
          @update:bedrooms="
            bedrooms = $event;
            currentPage = 1;
          "
          @update:property-type="
            propertyType = $event;
            currentPage = 1;
          "
          @reset="resetFilters"
        />
      </div>

      <!-- Loading Skeleton -->
      <div v-if="isLoading" class="mt-8">
        <SkeletonCard />
      </div>

      <!-- Property Grid -->
      <div v-else-if="paginatedProperties.length" class="mt-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <RouterLink
            v-for="property in paginatedProperties"
            :key="property.id"
            :to="{ name: 'property-details', params: { id: property.id } }"
            class="block"
          >
            <PropertyCard :property="property" />
          </RouterLink>
        </div>

        <!-- Pagination -->
        <div
          v-if="totalPages > 1"
          class="mt-10 flex items-center justify-center gap-2"
        >
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="p-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft :size="18" />
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            class="w-10 h-10 rounded-lg text-sm font-medium transition-colors"
            :class="
              page === currentPage
                ? 'bg-accent text-white'
                : 'border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            "
            :aria-label="`Go to page ${page}`"
            :aria-current="page === currentPage ? 'page' : undefined"
          >
            {{ page }}
          </button>
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="p-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <ChevronRight :size="18" />
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="mt-12 text-center py-16 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800"
      >
        <p class="text-gray-500 dark:text-gray-400 text-lg">
          No properties match your filters.
        </p>
        <button
          @click="resetFilters"
          class="mt-4 text-accent hover:text-blue-700 font-medium text-sm transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  </main>
  <Footer />
</template>
