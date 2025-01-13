<template>
  <footer class="bg-white">
    <div class="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <!-- Example: Company Logo & Social Media on the left -->
        <div class="space-y-8">
          <img
            class="h-9"
             :src="logo?.asset.url"
            alt="Company name"
          />
          <p class="text-balance text-sm/6 text-gray-600">
            HRnetworx ist das führende Netzwerk für Personalentscheider und Personal-Dienstleister im deutschsprachigen Raum
          </p>
          <!-- <div class="flex gap-x-6">
            <a
              v-for="item in navigation.social"
              :key="item.name"
              :href="item.href"
              class="text-gray-600 hover:text-gray-800"
            >
              <span class="sr-only">{{ item.name }}</span>
              <component :is="item.icon" class="size-6" aria-hidden="true" />
            </a>
          </div> -->
        </div>

        <!-- Example: Right side for Footer Menu items (passed as a prop) -->
        <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <!-- <h3 class="text-sm/6 font-semibold text-gray-900">Solutions</h3> -->
              <ul role="list" class="mt-6 space-y-4">
                <li v-for="(footerItem, index) in menu">
                  <NuxtLink
                    :to="`/${footerItem.slug}`"
                    class="text-sm/6 text-gray-600 hover:text-gray-900"
                  >
                  {{ footerItem.title }}
                  </NuxtLink>
            
                  
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer bottom area -->
      <div class="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
        <p class="text-sm/6 text-gray-600">
          {{ copyRight }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { RouterLink as NuxtLink } from "vue-router";

// Define the same interface(s) you use for the header menu
interface MenuItem {
  title: string;
  slug?: string;
  children?: MenuItem[];
  _key?: string;
}
interface LogoType {
  asset: any;
  url?: string;
  // ... add any additional fields from Sanity if needed
}
// Use defineProps to accept the new structure
const props = defineProps<{
  menu: MenuItem[];
  copyRight: string;
  logo: LogoType; // object with a .url for the logo
}>();

// For demonstration, your existing social icons
import { defineComponent, h } from "vue";

const navigation = {
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: defineComponent({
        render: () =>
          h("svg", { fill: "currentColor", viewBox: "0 0 24 24" }, [
            h("path", {
              "fill-rule": "evenodd",
              d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0...",
              "clip-rule": "evenodd",
            }),
          ]),
      }),
    },
    // ... your other social items
  ],
};
</script>
