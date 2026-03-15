<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-vue-next";
import Swiper from "swiper";
import { Navigation, Thumbs, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const props = defineProps<{
  images: string[];
  title: string;
}>();

const mainSwiperEl = ref<HTMLElement | null>(null);
const thumbsSwiperEl = ref<HTMLElement | null>(null);
const fullscreenRef = ref<HTMLElement | null>(null);
const currentIndex = ref(0);
const isFullscreen = ref(false);

let mainSwiper: Swiper | null = null;
let thumbsSwiper: Swiper | null = null;

function initSwipers() {
  if (!mainSwiperEl.value || props.images.length <= 1) return;

  if (thumbsSwiperEl.value) {
    thumbsSwiper = new Swiper(thumbsSwiperEl.value, {
      modules: [Navigation],
      spaceBetween: 8,
      slidesPerView: "auto",
      watchSlidesProgress: true,
    });
  }

  mainSwiper = new Swiper(mainSwiperEl.value, {
    modules: [Navigation, Thumbs, Keyboard],
    spaceBetween: 0,
    keyboard: { enabled: true, onlyInViewport: true },
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom",
    },
    thumbs: thumbsSwiper ? { swiper: thumbsSwiper } : undefined,
    on: {
      slideChange(swiper) {
        currentIndex.value = swiper.activeIndex;
      },
    },
  });
}

function destroySwipers() {
  mainSwiper?.destroy(true, true);
  thumbsSwiper?.destroy(true, true);
  mainSwiper = null;
  thumbsSwiper = null;
}

onMounted(() => {
  initSwipers();
});

onBeforeUnmount(() => {
  destroySwipers();
});

watch(isFullscreen, async () => {
  destroySwipers();
  await nextTick();
  initSwipers();
  if (isFullscreen.value) {
    fullscreenRef.value?.focus();
  }
  if (mainSwiper) {
    mainSwiper.slideTo(currentIndex.value, 0);
  }
});

function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value;
}

function closeFullscreen() {
  isFullscreen.value = false;
}

function onFullscreenKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") {
    closeFullscreen();
  }
}
</script>

<template>
  <!-- Fullscreen Overlay -->
  <Teleport to="body">
    <div
      v-if="isFullscreen"
      class="fixed inset-0 z-50 bg-black flex flex-col"
      @keydown="onFullscreenKeydown"
      tabindex="0"
      ref="fullscreenRef"
    >
      <!-- Fullscreen Header -->
      <div
        class="flex items-center justify-between px-4 py-3 bg-black/80 text-white"
      >
        <span class="text-sm">
          {{ currentIndex + 1 }} / {{ images.length }}
        </span>
        <button
          @click="closeFullscreen"
          class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close fullscreen"
        >
          <X :size="20" />
        </button>
      </div>

      <!-- Fullscreen Main Image -->
      <div class="flex-1 relative overflow-hidden">
        <div ref="mainSwiperEl" class="swiper h-full" v-if="images.length > 1">
          <div class="swiper-wrapper">
            <div
              v-for="(img, i) in images"
              :key="i"
              class="swiper-slide flex items-center justify-center"
            >
              <img
                :src="img"
                :alt="`${title} - Image ${i + 1}`"
                class="max-w-full max-h-full object-contain"
                :loading="i === 0 ? 'eager' : 'lazy'"
              />
            </div>
          </div>
          <button
            class="swiper-button-prev-custom absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft :size="24" />
          </button>
          <button
            class="swiper-button-next-custom absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight :size="24" />
          </button>
        </div>
        <div v-else class="h-full flex items-center justify-center">
          <img
            :src="images[0]"
            :alt="title"
            class="max-w-full max-h-full object-contain"
            loading="eager"
          />
        </div>
      </div>

      <!-- Fullscreen Thumbnails -->
      <div
        v-if="images.length > 1"
        ref="thumbsSwiperEl"
        class="swiper bg-black/80 px-4 py-3"
      >
        <div class="swiper-wrapper">
          <div v-for="(img, i) in images" :key="i" class="swiper-slide !w-20">
            <img
              :src="img"
              :alt="`${title} thumbnail ${i + 1}`"
              class="w-20 h-14 object-cover rounded-lg cursor-pointer border-2 transition-colors"
              :class="
                i === currentIndex
                  ? 'border-accent'
                  : 'border-transparent opacity-60 hover:opacity-100'
              "
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </Teleport>

  <!-- Normal Gallery -->
  <div v-if="!isFullscreen" class="relative">
    <!-- Main Image -->
    <div class="relative overflow-hidden rounded-xl aspect-[16/9]">
      <div v-if="images.length > 1" ref="mainSwiperEl" class="swiper h-full">
        <div class="swiper-wrapper">
          <div v-for="(img, i) in images" :key="i" class="swiper-slide">
            <img
              :src="img"
              :alt="`${title} - Image ${i + 1}`"
              width="800"
              height="450"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
        <!-- Navigation Arrows -->
        <button
          class="swiper-button-prev-custom absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors z-10"
          aria-label="Previous image"
        >
          <ChevronLeft :size="20" />
        </button>
        <button
          class="swiper-button-next-custom absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors z-10"
          aria-label="Next image"
        >
          <ChevronRight :size="20" />
        </button>
      </div>

      <!-- Single image fallback -->
      <img
        v-else
        :src="images[0]"
        :alt="title"
        width="800"
        height="450"
        class="w-full h-full object-cover"
      />

      <!-- Counter + Fullscreen -->
      <div class="absolute bottom-3 right-3 flex items-center gap-2">
        <button
          @click="toggleFullscreen"
          class="bg-black/60 hover:bg-black/80 text-white p-1.5 rounded transition-colors"
          aria-label="Toggle fullscreen"
        >
          <Maximize2 :size="16" />
        </button>
        <div class="bg-black/60 text-white text-xs px-2 py-1 rounded">
          {{ currentIndex + 1 }} / {{ images.length }}
        </div>
      </div>
    </div>

    <!-- Thumbnails -->
    <div v-if="images.length > 1" ref="thumbsSwiperEl" class="swiper mt-3">
      <div class="swiper-wrapper">
        <div v-for="(img, i) in images" :key="i" class="swiper-slide !w-20">
          <img
            :src="img"
            :alt="`${title} thumbnail ${i + 1}`"
            width="80"
            height="56"
            class="w-20 h-14 object-cover rounded-lg cursor-pointer border-2 transition-colors"
            :class="
              i === currentIndex
                ? 'border-accent'
                : 'border-transparent opacity-70 hover:opacity-100'
            "
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
</template>
