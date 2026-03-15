<script setup lang="ts">
import {
  FileText,
  ClipboardCheck,
  Building,
  CheckCircle,
} from "lucide-vue-next";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Document Preparation",
    description:
      "We gather and prepare all required documents including the Deed of Absolute Sale, tax declarations, and transfer certificates.",
  },
  {
    icon: ClipboardCheck,
    step: "02",
    title: "Tax Clearance & Payment",
    description:
      "We process capital gains tax, documentary stamp tax, and local transfer tax payments with the BIR and local government.",
  },
  {
    icon: Building,
    step: "03",
    title: "Registry of Deeds Filing",
    description:
      "We file the transfer documents with the Registry of Deeds and coordinate with the Assessor's office for new tax declarations.",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Title Release",
    description:
      "We follow up and secure the release of the new title under your name. The property is officially and legally yours.",
  },
];
</script>

<template>
  <section class="py-16 md:py-24 bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <p
          class="text-accent font-semibold text-sm uppercase tracking-wider mb-2"
        >
          How It Works
        </p>
        <h2
          class="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
        >
          Title Transfer Process
        </h2>
        <p class="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We handle the entire title transfer process so you can focus on what
          matters — moving into your new home.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="item in steps"
          :key="item.step"
          class="relative text-center"
        >
          <div
            class="w-16 h-16 bg-primary dark:bg-accent rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <component :is="item.icon" :size="28" class="text-white" />
          </div>
          <span class="text-xs font-bold text-accent uppercase tracking-wider">
            Step {{ item.step }}
          </span>
          <h3
            class="font-heading text-lg font-semibold text-gray-900 dark:text-white mt-2 mb-2"
          >
            {{ item.title }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
