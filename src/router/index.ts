import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        title: "Home",
        description:
          "Find My Home Realty and Services — Your trusted real estate partner in Cavite.",
      },
    },
    {
      path: "/properties",
      name: "properties",
      component: () => import("@/pages/Properties.vue"),
      meta: {
        title: "Properties",
        description: "Browse available properties in Cavite.",
      },
    },
    {
      path: "/property/:id",
      name: "property-details",
      component: () => import("@/pages/PropertyDetails.vue"),
      meta: {
        title: "Property Details",
        description: "View property details.",
      },
    },
    {
      path: "/map",
      name: "map-search",
      component: () => import("@/pages/MapSearch.vue"),
      meta: {
        title: "Map Search",
        description: "Search properties by location on the map.",
      },
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    }
    return { top: 0 };
  },
});

export default router;
