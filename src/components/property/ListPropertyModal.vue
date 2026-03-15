<script setup lang="ts">
import { ref } from "vue";
import { X, Building2 } from "lucide-vue-next";

const isOpen = ref(false);

function open() {
  isOpen.value = true;
}

function close() {
  isOpen.value = false;
}

function onBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) {
    close();
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") {
    close();
  }
}

defineExpose({ open, close });
</script>

<template>
  <slot name="trigger" :open="open" />

  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        @click="onBackdropClick"
        @keydown="onKeydown"
        role="dialog"
        aria-modal="true"
        aria-labelledby="list-property-title"
      >
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
        >
          <div
            v-if="isOpen"
            class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
          >
            <!-- Header -->
            <div class="flex items-center justify-between px-6 pt-5 pb-0">
              <div class="flex items-center gap-2">
                <Building2 :size="20" class="text-accent" />
                <h2
                  id="list-property-title"
                  class="font-heading text-lg font-semibold text-gray-900 dark:text-white"
                >
                  List Your Property
                </h2>
              </div>
              <button
                @click="close"
                class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
                aria-label="Close dialog"
              >
                <X :size="18" />
              </button>
            </div>

            <!-- Body -->
            <div class="px-6 py-6">
              <div class="text-center py-6">
                <div
                  class="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-4"
                >
                  <Building2 :size="28" class="text-accent" />
                </div>
                <p class="text-gray-700 dark:text-gray-300 font-body">
                  Property submission will be available in the agent dashboard.
                </p>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Contact us for listing inquiries.
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div class="px-6 pb-5">
              <button
                @click="close"
                class="w-full px-4 py-2.5 bg-accent hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm"
              >
                Got it
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
