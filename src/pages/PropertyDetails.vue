<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSeo } from "@/composables/useSeo";
import { mockProperties } from "@/data/mockProperties";
import { mockAgent } from "@/data/mockAgent";
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";
import PropertyGallery from "@/components/property/PropertyGallery.vue";
import PropertyDetailsInfo from "@/components/property/PropertyDetailsInfo.vue";
import MortgageCalculator from "@/components/property/MortgageCalculator.vue";
import FavoriteButton from "@/components/property/FavoriteButton.vue";
import { ArrowLeft, Phone, Mail } from "lucide-vue-next";

const route = useRoute();
const router = useRouter();

const property = computed(() => {
  const id = Number(route.params.id);
  return mockProperties.find((p) => p.id === id);
});

onMounted(() => {
  if (property.value) {
    useSeo({
      title: property.value.title,
      description:
        property.value.description ||
        `${property.value.title} in ${property.value.location}`,
      keywords: [
        property.value.type,
        property.value.location,
        "property",
        "Cavite",
      ],
      image: property.value.image,
      canonicalPath: `/property/${property.value.id}`,
    });
  }
});
</script>

<template>
  <Navbar />
  <main class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Not Found -->
    <div
      v-if="!property"
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center"
    >
      <h1 class="font-heading text-3xl font-bold text-gray-900 dark:text-white">
        Property Not Found
      </h1>
      <p class="mt-4 text-gray-500 dark:text-gray-400">
        The property you're looking for does not exist.
      </p>
      <RouterLink
        to="/properties"
        class="mt-6 inline-flex items-center gap-2 text-accent hover:text-blue-700 font-medium text-sm transition-colors"
      >
        <ArrowLeft :size="16" />
        Back to Properties
      </RouterLink>
    </div>

    <!-- Property Found -->
    <template v-else>
      <!-- Back Button -->
      <div
        class="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <button
            @click="router.back()"
            class="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
            aria-label="Go back to previous page"
          >
            <ArrowLeft :size="16" />
            Back
          </button>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column: Gallery + Details -->
          <div class="lg:col-span-2 space-y-8">
            <div class="relative">
              <PropertyGallery
                :images="property.images || [property.image]"
                :title="property.title"
              />
              <div class="absolute top-3 right-3 z-10">
                <FavoriteButton :property-id="property.id" />
              </div>
            </div>
            <PropertyDetailsInfo :property="property" />
            <MortgageCalculator :property-price="property.price" />
          </div>

          <!-- Right Column: Contact Broker -->
          <div>
            <div
              class="sticky top-20 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6"
            >
              <h3
                class="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-4"
              >
                Interested in this property?
              </h3>

              <!-- Agent Card -->
              <div class="flex items-center gap-3 mb-6">
                <img
                  :src="mockAgent.photo"
                  :alt="mockAgent.name"
                  width="48"
                  height="48"
                  class="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p class="font-medium text-gray-900 dark:text-white text-sm">
                    {{ mockAgent.name }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ mockAgent.license }}
                  </p>
                </div>
              </div>

              <!-- Actions -->
              <div class="space-y-3">
                <a
                  :href="`tel:${mockAgent.phone}`"
                  class="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-accent hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm"
                >
                  <Phone :size="16" />
                  Call Broker
                </a>
                <a
                  :href="`mailto:${mockAgent.email}?subject=Inquiry: ${property.title}`"
                  class="w-full inline-flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-lg transition-colors text-sm"
                >
                  <Mail :size="16" />
                  Email Inquiry
                </a>
              </div>

              <!-- Location Map -->
              <div class="mt-6">
                <h4
                  class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Location
                </h4>
                <div class="w-full h-40 rounded-lg overflow-hidden">
                  <GMapMap
                    :center="{
                      lat: property.latitude,
                      lng: property.longitude,
                    }"
                    :zoom="15"
                    map-type-id="roadmap"
                    style="width: 100%; height: 100%"
                    :options="{
                      mapTypeControl: false,
                      streetViewControl: false,
                      zoomControl: true,
                    }"
                  >
                    <GMapMarker
                      :position="{
                        lat: property.latitude,
                        lng: property.longitude,
                      }"
                    />
                  </GMapMap>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </main>
  <Footer />
</template>
