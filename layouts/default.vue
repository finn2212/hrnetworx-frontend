<template>
  <Suspense>
    <template #default>
      <div class="layout-wrapper">
        <HeaderComponent 
        :menu="siteConfig?.mainMenu ?? []" 
        :logo="siteConfig?.logo ?? {}" />

        <NuxtPage />

        <FooterComponent
          :menu="siteConfig?.footerMenu ?? []"
          :copyRight="siteConfig?.copyrightFooter ?? ''"
          :logo="siteConfig?.logo ?? {}" />
        />
      </div>
    </template>
    <template #fallback>
      <div class="p-8 text-center">Loading site settings...</div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import HeaderComponent from "~/components/HeaderComponent.vue";
import FooterComponent from "~/components/FooterComponent.vue";
import { useSiteSettings } from "~/composables/useSiteSettings";

const { data: siteConfigData, pending, error } = useSiteSettings();

// If siteConfigData.value is null/undefined, siteConfig is null/undefined
// but you can safely pass '?? []' in the template to avoid errors
const siteConfig = siteConfigData.value;

console.log("Site Settings:", siteConfig);
</script>
