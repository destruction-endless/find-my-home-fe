<script setup lang="ts">
import { watch, onBeforeUnmount, createApp, h } from "vue";
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
let markers: google.maps.Marker[] = [];
let activeInfoWindow: google.maps.InfoWindow | null = null;
let boundsDebounceTimer: ReturnType<typeof setTimeout> | null = null;
let mapInstance: google.maps.Map | null = null;
let idleListener: google.maps.MapsEventListener | null = null;
let activePopupApp: VueApp<Element> | null = null;
let markersKey = "";
let markersByPropertyId = new Map<number, google.maps.Marker>();

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

function createMarkers(map: google.maps.Map) {
  markersByPropertyId.clear();
  markers = props.properties.map((property) => {
    const marker = new google.maps.Marker({
      position: { lat: property.latitude, lng: property.longitude },
      title: property.title,
    });

    marker.addListener("click", () => {
      openInfoWindow(map, marker, property);
      emit("select", property);
    });

    markersByPropertyId.set(property.id, marker);
    return marker;
  });
  markersKey = computeMarkersKey(props.properties);
  clusterer?.clearMarkers();
  clusterer?.setMap(null);
  clusterer = new MarkerClusterer({ map, markers });
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
  marker: google.maps.Marker,
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

  activeInfoWindow.open(map, marker);
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
  markers.forEach((marker) => marker.setMap(null));
  markers = [];
  markersByPropertyId.clear();
  markersKey = "";
  mapInstance = null;
}

function onMapReady(map: google.maps.Map) {
  initClustering(map);
}

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
      :center="center || { lat: 14.4624, lng: 120.9645 }"
      :zoom="zoom || 11"
      map-type-id="roadmap"
      style="width: 100%; height: 500px"
      @click="closeActiveInfoWindow"
      :options="{ mapTypeControl: false, streetViewControl: false }"
      @ready="onMapReady"
    />
  </div>
</template>
