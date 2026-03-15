<script setup lang="ts">
import { computed } from "vue";
import { Heart } from "lucide-vue-next";
import { useFavorites } from "@/composables/useFavorites";

const props = defineProps<{
  propertyId: number;
}>();

const { isFavorite, toggleFavorite } = useFavorites();

const active = computed(() => isFavorite(props.propertyId));

function onClick(e: Event) {
  e.preventDefault();
  e.stopPropagation();
  toggleFavorite(props.propertyId);
}
</script>

<template>
  <button
    @click="onClick"
    class="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
    :class="
      active
        ? 'bg-red-500 text-white hover:bg-red-600'
        : 'bg-black/40 text-white hover:bg-black/60'
    "
    :aria-label="active ? 'Remove from favorites' : 'Add to favorites'"
  >
    <Heart :size="16" :fill="active ? 'currentColor' : 'none'" />
  </button>
</template>
