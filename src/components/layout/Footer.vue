<script setup lang="ts">
import { Phone, Mail, MapPin } from "lucide-vue-next";
</script>

<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Brand -->
        <div>
          <h3 class="font-heading text-xl font-bold text-white mb-4">
            Find My Home
          </h3>
          <p class="text-sm leading-relaxed">
            Your trusted real estate partner in Cavite. We help you find the
            perfect property, handle title transfers, and provide professional
            appraisal services.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-heading text-lg font-semibold text-white mb-4">
            Quick Links
          </h4>
          <ul class="space-y-2 text-sm">
            <li>
              <RouterLink to="/" class="hover:text-accent transition-colors"
                >Home</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/properties"
                class="hover:text-accent transition-colors"
                >Properties</RouterLink
              >
            </li>
            <li>
              <RouterLink to="/map" class="hover:text-accent transition-colors"
                >Map Search</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/#contact"
                class="hover:text-accent transition-colors"
                >Contact</RouterLink
              >
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="font-heading text-lg font-semibold text-white mb-4">
            Contact Us
          </h4>
          <ul class="space-y-3 text-sm">
            <li class="flex items-center gap-2">
              <Phone :size="16" class="text-accent shrink-0" />
              <span>+63 917 123 4567</span>
            </li>
            <li class="flex items-center gap-2">
              <Mail :size="16" class="text-accent shrink-0" />
              <span>rommel@findmyhomerealty.com</span>
            </li>
            <li class="flex items-start gap-2">
              <MapPin :size="16" class="text-accent shrink-0 mt-0.5" />
              <span>Cavite, Philippines</span>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-10 pt-8 border-t border-gray-800 text-center text-sm text-gray-500"
      >
        <p>
          &copy; {{ new Date().getFullYear() }} Find My Home Realty and
          Services. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
