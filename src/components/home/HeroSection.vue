<script setup lang="ts">
import { Search } from "lucide-vue-next";
</script>

<template>
  <section
    id="hero"
    class="relative bg-primary dark:bg-gray-950 overflow-hidden"
  >
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div
        class="absolute inset-0"
        style="
          background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.15&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
        "
      ></div>
    </div>

    <div
      class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left: Text Content -->
        <div>
          <h1
            class="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
          >
            Find Your
            <span class="text-blue-300">Dream Home</span>
            in Cavite
          </h1>
          <p
            class="mt-6 text-lg md:text-xl text-blue-100 leading-relaxed max-w-xl"
          >
            Find My Home Realty and Services is your trusted partner in buying,
            selling, and securing your dream property. Let licensed broker
            Rommel C. Tabucol guide you every step of the way.
          </p>
          <div class="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="#properties"
              class="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm"
            >
              <Search :size="18" />
              Browse Properties
            </a>
            <a
              href="#contact"
              class="inline-flex items-center justify-center px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-colors text-sm"
            >
              Get in Touch
            </a>
          </div>
        </div>

        <!-- Right: Property Image -->
        <div class="hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
            alt="Beautiful modern home"
            width="800"
            height="600"
            class="w-full h-auto rounded-2xl shadow-2xl object-cover aspect-[4/3]"
          />
        </div>
      </div>
    </div>
  </section>
</template>
