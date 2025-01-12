<template>
    <Suspense>
      <template #default>
        <div class="layout-wrapper">
          <HeaderComponent :menu="menuData" />
          <NuxtPage />
          <FooterComponent />
        </div>
      </template>
      <template #fallback>
        <div class="p-8 text-center">Loading menu...</div>
      </template>
    </Suspense>
  </template>
  
  <script setup lang="ts">
  import HeaderComponent from '~/components/HeaderComponent.vue'
  import FooterComponent from '~/components/FooterComponent.vue'
  import { useMenu } from '~/composables/useMenu'
  
  const { data: menuData, pending, error } = useMenu()
  
  // For debugging:
  console.log('Layout menuData:', menuData.value)
  </script>
  
  <style scoped>
  .layout-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  </style>