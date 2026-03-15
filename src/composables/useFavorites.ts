import { ref, watch } from "vue";

const STORAGE_KEY = "findmyhome_favorites";

function loadFavorites(): number[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

const favorites = ref<number[]>(loadFavorites());

watch(
  favorites,
  (val) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  },
  { deep: true },
);

export function useFavorites() {
  function isFavorite(propertyId: number): boolean {
    return favorites.value.includes(propertyId);
  }

  function addFavorite(propertyId: number) {
    if (!favorites.value.includes(propertyId)) {
      favorites.value.push(propertyId);
    }
  }

  function removeFavorite(propertyId: number) {
    favorites.value = favorites.value.filter((id) => id !== propertyId);
  }

  function toggleFavorite(propertyId: number) {
    if (isFavorite(propertyId)) {
      removeFavorite(propertyId);
    } else {
      addFavorite(propertyId);
    }
  }

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
}
