<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useTheme } from "@/composables/useTheme";
import ListPropertyModal from "@/components/property/ListPropertyModal.vue";
import { Menu, X, Sun, Moon, Plus } from "lucide-vue-next";

const { theme, toggleTheme } = useTheme();
const mobileMenuOpen = ref(false);

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Properties", to: "/properties" },
  { label: "Map Search", to: "/map" },
  { label: "Contact", to: "/#contact" },
];
</script>

<template>
  <nav
    class="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2">
          <span
            class="font-heading text-xl font-bold text-primary dark:text-white"
          >
            Find My Home
          </span>
          <span
            class="hidden sm:inline text-sm text-gray-500 dark:text-gray-400"
          >
            Realty &amp; Services
          </span>
        </RouterLink>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-6">
          <RouterLink
            v-for="link in navLinks"
            :key="link.label"
            :to="link.to"
            class="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors"
          >
            {{ link.label }}
          </RouterLink>
          <ListPropertyModal>
            <template #trigger="{ open }">
              <button
                @click="open"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                <Plus :size="16" />
                List Your Property
              </button>
            </template>
          </ListPropertyModal>
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            :aria-label="
              theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            "
          >
            <Sun v-if="theme === 'dark'" :size="18" />
            <Moon v-else :size="18" />
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center gap-2">
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            :aria-label="
              theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            "
          >
            <Sun v-if="theme === 'dark'" :size="18" />
            <Moon v-else :size="18" />
          </button>
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
            :aria-expanded="mobileMenuOpen"
          >
            <X v-if="mobileMenuOpen" :size="22" />
            <Menu v-else :size="22" />
          </button>
        </div>
      </div>

      <!-- Mobile Nav -->
      <div v-if="mobileMenuOpen" class="md:hidden pb-4 space-y-2">
        <RouterLink
          v-for="link in navLinks"
          :key="link.label"
          :to="link.to"
          class="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          @click="mobileMenuOpen = false"
        >
          {{ link.label }}
        </RouterLink>
        <ListPropertyModal>
          <template #trigger="{ open }">
            <button
              @click="
                open();
                mobileMenuOpen = false;
              "
              class="w-full flex items-center gap-1.5 px-3 py-2 bg-accent hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              <Plus :size="16" />
              List Your Property
            </button>
          </template>
        </ListPropertyModal>
      </div>
    </div>
  </nav>
</template>
