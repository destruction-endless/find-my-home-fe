<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
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
import {
  ArrowLeft,
  Phone,
  Mail,
  ExternalLink,
  Navigation,
  GraduationCap,
  Hospital,
  ShoppingBag,
  UtensilsCrossed,
} from "lucide-vue-next";

const route = useRoute();
const router = useRouter();

const property = computed(() => {
  const id = Number(route.params.id);
  return mockProperties.find((p) => p.id === id);
});

interface NearbyPlace {
  name: string;
  vicinity: string;
}

interface NearbyCategory {
  label: string;
  type: string;
  icon: typeof GraduationCap;
  places: NearbyPlace[];
}

const nearbyCategories = ref<NearbyCategory[]>([
  { label: "Schools", type: "school", icon: GraduationCap, places: [] },
  { label: "Hospitals", type: "hospital", icon: Hospital, places: [] },
  { label: "Shopping", type: "shopping_mall", icon: ShoppingBag, places: [] },
  {
    label: "Restaurants",
    type: "restaurant",
    icon: UtensilsCrossed,
    places: [],
  },
]);

const locationMapRef = ref<InstanceType<any> | null>(null);

function loadNearbyPlaces(map: google.maps.Map) {
  const prop = property.value;
  if (!prop) return;

  const service = new google.maps.places.PlacesService(map);
  const location = new google.maps.LatLng(prop.latitude, prop.longitude);

  for (const category of nearbyCategories.value) {
    service.nearbySearch(
      { location, radius: 1500, type: category.type },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          category.places = results.slice(0, 3).map((place) => ({
            name: place.name || "Unknown",
            vicinity: place.vicinity || "",
          }));
        }
      },
    );
  }
}

onMounted(async () => {
  if (!locationMapRef.value) return;
  const map: google.maps.Map = await locationMapRef.value.$mapPromise;
  loadNearbyPlaces(map);
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
                <div class="w-full h-48 rounded-lg overflow-hidden">
                  <GMapMap
                    ref="locationMapRef"
                    :center="{
                      lat: property.latitude,
                      lng: property.longitude,
                    }"
                    :zoom="16"
                    map-type-id="roadmap"
                    class="w-full h-full"
                    :options="{
                      mapTypeControl: false,
                      streetViewControl: false,
                      fullscreenControl: false,
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
                <!-- Map action buttons -->
                <div class="flex gap-2 mt-3">
                  <a
                    :href="`https://www.google.com/maps?q=${property.latitude},${property.longitude}`"
                    target="_blank"
                    rel="noopener"
                    class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-accent border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <ExternalLink :size="14" />
                    Open in Maps
                  </a>
                  <a
                    :href="`https://www.google.com/maps/dir/?api=1&destination=${property.latitude},${property.longitude}`"
                    target="_blank"
                    rel="noopener"
                    class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-accent border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Navigation :size="14" />
                    Get Directions
                  </a>
                </div>

                <!-- Nearby Places -->
                <div
                  v-if="nearbyCategories.some((c) => c.places.length > 0)"
                  class="mt-5"
                >
                  <h4
                    class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                  >
                    Nearby Places
                  </h4>
                  <div class="space-y-3">
                    <div
                      v-for="category in nearbyCategories"
                      :key="category.type"
                    >
                      <template v-if="category.places.length > 0">
                        <div
                          class="flex items-center gap-1.5 mb-1 text-gray-600 dark:text-gray-400"
                        >
                          <component :is="category.icon" :size="13" />
                          <span class="text-xs font-semibold">{{
                            category.label
                          }}</span>
                        </div>
                        <ul class="space-y-1 pl-5">
                          <li
                            v-for="place in category.places"
                            :key="place.name"
                            class="text-xs text-gray-600 dark:text-gray-400 list-disc"
                          >
                            {{ place.name }}
                          </li>
                        </ul>
                      </template>
                    </div>
                  </div>
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
