<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, createApp, h } from "vue";
import type { App as VueApp } from "vue";
import type { Property } from "@/types/Property";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import PropertyMarkerPopup from "./PropertyMarkerPopup.vue";
import router from "@/router";

const props = defineProps<{
  properties: Property[];
  center?: { lat: number; lng: number };
  zoom?: number;
  selectedPropertyId?: number | null;
}>();

const emit = defineEmits<{
  (e: "select", property: Property): void;
  (
    e: "bounds-changed",
    bounds: { north: number; south: number; east: number; west: number },
  ): void;
}>();

let clusterer: InstanceType<typeof MarkerClusterer> | null = null;
let markers: google.maps.marker.AdvancedMarkerElement[] = [];
let activeInfoWindow: google.maps.InfoWindow | null = null;
let boundsDebounceTimer: ReturnType<typeof setTimeout> | null = null;
let mapInstance: google.maps.Map | null = null;
let idleListener: google.maps.MapsEventListener | null = null;
let activePopupApp: VueApp<Element> | null = null;
let markersKey = "";
let markersByPropertyId = new Map<
  number,
  google.maps.marker.AdvancedMarkerElement
>();
let markerElementsByPropertyId = new Map<number, HTMLElement>();

const mapRef = ref<InstanceType<any> | null>(null);

function closeActiveInfoWindow() {
  activePopupApp?.unmount();
  activePopupApp = null;
  if (activeInfoWindow) {
    activeInfoWindow.close();
    activeInfoWindow = null;
  }
}

function computeMarkersKey(properties: Property[]) {
  return properties
    .map(
      (property) => `${property.id}:${property.latitude}:${property.longitude}`,
    )
    .join("|");
}

function formatPrice(price: number) {
  if (price >= 1_000_000) {
    const value = (price / 1_000_000).toFixed(1).replace(/\.0$/, "");
    return `₱${value}M`;
  }

  if (price >= 1_000) {
    const value = (price / 1_000).toFixed(1).replace(/\.0$/, "");
    return `₱${value}K`;
  }

  return `₱${Math.round(price).toLocaleString("en-PH")}`;
}

function createPriceMarkerContent(price: number) {
  const markerElement = document.createElement("div");
  markerElement.className = "price-marker";
  markerElement.textContent = formatPrice(price);
  return markerElement;
}

function updateSelectedMarkerStyles(
  selectedPropertyId: number | null | undefined,
) {
  markerElementsByPropertyId.forEach((element, propertyId) => {
    element.classList.toggle(
      "price-marker--active",
      propertyId === selectedPropertyId,
    );
  });
}

function createMarkers(map: google.maps.Map) {
  markersByPropertyId.clear();
  markerElementsByPropertyId.clear();
  markers = props.properties.map((property) => {
    const markerElement = createPriceMarkerContent(property.price);
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: { lat: property.latitude, lng: property.longitude },
      title: property.title,
      content: markerElement,
    });

    marker.addListener("click", () => {
      openInfoWindow(map, marker, property);
      emit("select", property);
    });

    markersByPropertyId.set(property.id, marker);
    markerElementsByPropertyId.set(property.id, markerElement);
    return marker;
  });
  markersKey = computeMarkersKey(props.properties);
  clusterer?.clearMarkers();
  clusterer?.setMap(null);
  clusterer = new MarkerClusterer({
    map,
    markers: markers as any,
  });
  updateSelectedMarkerStyles(props.selectedPropertyId);
}

function initClustering(map: google.maps.Map) {
  clearMarkers();
  mapInstance = map;
  createMarkers(map);

  idleListener = map.addListener("idle", () => {
    if (boundsDebounceTimer) clearTimeout(boundsDebounceTimer);
    boundsDebounceTimer = setTimeout(() => {
      const bounds = map.getBounds();
      if (bounds) {
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        emit("bounds-changed", {
          north: ne.lat(),
          south: sw.lat(),
          east: ne.lng(),
          west: sw.lng(),
        });
      }
    }, 300);
  });
}

function openInfoWindow(
  map: google.maps.Map,
  marker: google.maps.marker.AdvancedMarkerElement,
  property: Property,
) {
  closeActiveInfoWindow();

  const container = document.createElement("div");
  const app = createApp({
    render() {
      return h(PropertyMarkerPopup, { property });
    },
  });
  app.use(router);
  app.mount(container);
  activePopupApp = app;

  activeInfoWindow = new google.maps.InfoWindow({
    content: container,
  });

  activeInfoWindow.addListener("closeclick", () => {
    activePopupApp?.unmount();
    activePopupApp = null;
  });

  activeInfoWindow.open({ map, anchor: marker });
}

function clearMarkers() {
  closeActiveInfoWindow();
  if (boundsDebounceTimer) {
    clearTimeout(boundsDebounceTimer);
    boundsDebounceTimer = null;
  }
  idleListener?.remove();
  idleListener = null;
  if (clusterer) {
    clusterer.clearMarkers();
    clusterer.setMap(null);
    clusterer = null;
  }
  markers.forEach((marker) => {
    marker.map = null;
  });
  markers = [];
  markersByPropertyId.clear();
  markerElementsByPropertyId.clear();
  markersKey = "";
  mapInstance = null;
}

onMounted(async () => {
  if (!mapRef.value) return;
  const map: google.maps.Map = await mapRef.value.$mapPromise;
  initClustering(map);
});

watch(
  () => computeMarkersKey(props.properties),
  () => {
    if (mapInstance) {
      const nextKey = computeMarkersKey(props.properties);
      if (nextKey !== markersKey) {
        createMarkers(mapInstance);
      }
    }
  },
);

watch(
  () => props.center,
  (value) => {
    if (value && mapInstance) {
      mapInstance.panTo(value);
    }
  },
);

watch(
  () => props.selectedPropertyId,
  (selectedPropertyId) => {
    updateSelectedMarkerStyles(selectedPropertyId);
    if (!selectedPropertyId || !mapInstance) return;
    const selectedProperty = props.properties.find(
      (property) => property.id === selectedPropertyId,
    );
    if (!selectedProperty) return;

    const marker = markersByPropertyId.get(selectedProperty.id);
    mapInstance.panTo({
      lat: selectedProperty.latitude,
      lng: selectedProperty.longitude,
    });
    if (marker) {
      openInfoWindow(mapInstance, marker, selectedProperty);
    }
  },
);

onBeforeUnmount(() => {
  clearMarkers();
});
</script>

<template>
  <div class="w-full h-full min-h-[500px] rounded-xl overflow-hidden">
    <GMapMap
      ref="mapRef"
      :center="center || { lat: 14.4624, lng: 120.9645 }"
      :zoom="zoom || 11"
      map-type-id="roadmap"
      style="width: 100%; height: 500px"
      @click="closeActiveInfoWindow"
      :options="{
        mapTypeControl: false,
        streetViewControl: false,
        mapId: 'DEMO_MAP_ID',
      }"
    />
  </div>
</template>

<style>
.price-marker {
  background: #fff;
  border-radius: 999px;
  padding: 6px 10px;
  font-weight: 600;
  font-size: 12px;
  line-height: 1;
  color: var(--color-accent);
  box-shadow: 0 2px 6px rgb(0 0 0 / 0.2);
  cursor: pointer;
  white-space: nowrap;
}

.price-marker--active {
  background: #2563eb;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}
</style>
