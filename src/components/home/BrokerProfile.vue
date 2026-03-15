<script setup lang="ts">
import { mockAgent } from "@/data/mockAgent";
import { Award, Phone, Mail } from "lucide-vue-next";
</script>

<template>
  <section id="broker" class="py-16 md:py-24 bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Photo -->
        <div class="flex justify-center lg:justify-start">
          <div class="relative">
            <img
              :src="mockAgent.photo"
              :alt="mockAgent.name"
              width="400"
              height="400"
              class="w-72 h-72 md:w-80 md:h-80 object-cover rounded-2xl shadow-xl"
              loading="lazy"
            />
            <div
              class="absolute -bottom-4 -right-4 bg-accent text-white px-4 py-2 rounded-lg shadow-lg text-sm font-semibold"
            >
              Licensed Broker
            </div>
          </div>
        </div>

        <!-- Info -->
        <div>
          <p
            class="text-accent font-semibold text-sm uppercase tracking-wider mb-2"
          >
            Meet Your Broker
          </p>
          <h2
            class="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
          >
            {{ mockAgent.name }}
          </h2>
          <div
            class="flex items-center gap-2 mt-3 text-gray-500 dark:text-gray-400"
          >
            <Award :size="16" class="text-accent" />
            <span class="text-sm">{{ mockAgent.license }}</span>
          </div>
          <p class="mt-6 text-gray-600 dark:text-gray-300 leading-relaxed">
            {{ mockAgent.bio }}
          </p>
          <div class="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              :href="`tel:${mockAgent.phone}`"
              class="inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-accent transition-colors"
            >
              <Phone :size="16" class="text-accent" />
              {{ mockAgent.phone }}
            </a>
            <a
              :href="`mailto:${mockAgent.email}`"
              class="inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-accent transition-colors"
            >
              <Mail :size="16" class="text-accent" />
              {{ mockAgent.email }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
