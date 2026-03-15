<script setup lang="ts">
import { onMounted } from "vue";
import { useSeo } from "@/composables/useSeo";
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";
import HeroSection from "@/components/home/HeroSection.vue";
import BrokerProfile from "@/components/home/BrokerProfile.vue";
import ServicesSection from "@/components/home/ServicesSection.vue";
import TitleTransferSteps from "@/components/home/TitleTransferSteps.vue";
import FeaturedProperties from "@/components/home/FeaturedProperties.vue";
import ContactSection from "@/components/home/ContactSection.vue";

onMounted(() => {
  useSeo({
    title: "Home",
    description:
      "Find My Home Realty and Services — Your trusted real estate broker in Cavite. Browse property listings, appraisal, title transfer, and documentation services.",
    keywords: [
      "real estate",
      "Cavite",
      "property",
      "broker",
      "house and lot",
      "title transfer",
      "appraisal",
      "Find My Home",
    ],
    canonicalPath: "/",
  });
});
</script>

<template>
  <Navbar />
  <main>
    <HeroSection />
    <BrokerProfile />
    <ServicesSection />
    <TitleTransferSteps />
    <FeaturedProperties />
    <ContactSection />
  </main>
  <Footer />
</template>
