<script setup lang="ts">
import { mockServices } from "@/data/mockServices";
import { Home, BadgeDollarSign, FileCheck, FolderOpen } from "lucide-vue-next";

const iconMap: Record<string, typeof Home> = {
  Home,
  BadgeDollarSign,
  FileCheck,
  FolderOpen,
};
</script>

<template>
  <section id="services" class="py-16 md:py-24 bg-gray-50 dark:bg-gray-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <p
          class="text-accent font-semibold text-sm uppercase tracking-wider mb-2"
        >
          What We Offer
        </p>
        <h2
          class="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
        >
          Our Services
        </h2>
        <p class="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Comprehensive real estate solutions to serve all your property needs —
          from buying and selling to title transfer and documentation.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="service in mockServices"
          :key="service.title"
          class="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-800"
        >
          <div
            class="w-12 h-12 bg-accent/10 dark:bg-accent/20 rounded-lg flex items-center justify-center mb-4"
          >
            <component
              :is="iconMap[service.icon]"
              :size="24"
              class="text-accent"
            />
          </div>
          <h3
            class="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-2"
          >
            {{ service.title }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ service.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
