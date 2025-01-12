<template>
    <header class="bg-white">
      <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <!-- Logo, etc. omitted for brevity -->
  
        <PopoverGroup class="hidden lg:flex lg:gap-x-12">
          <!-- Loop all top-level menu items -->
          <Popover
            v-for="(menuItem, index) in menu.items"
            :key="menuItem.title"
            class="relative"
          >
            <!-- Check if this item is "Themen" -->
            <template v-if="menuItem.title === 'Themen'">
              <PopoverButton class="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
                {{ menuItem.title }}
                <ChevronDownIcon class="size-5 flex-none text-gray-400" aria-hidden="true" />
              </PopoverButton>
  
              <!-- topicsDropdown() handles the dynamic topics list -->
              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-1"
              >
                <PopoverPanel
                  class="absolute z-10 mt-3 w-48 rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
                >
                  <div class="p-4">
                    <!-- If topics are still loading, show something -->
                    <div v-if="topicsPending" class="text-gray-500">Loading Topics...</div>
  
                    <div
                      v-else
                      v-for="(topic, i) in allTopics"
                      :key="topic._id"
                      class="hover:bg-gray-50 rounded-lg p-2"
                    >
                      <NuxtLink
                        :to="`/topics/${topic.slug}`"
                        class="block font-semibold text-gray-900"
                      >
                        {{ topic.title }}
                      </NuxtLink>
                    </div>
                  </div>
                </PopoverPanel>
              </transition>
            </template>
  
            <!-- If it's not "Themen", use your existing logic -->
            <template v-else>
              <!-- If it has children -->
              <PopoverButton v-if="menuItem.children?.length">
                {{ menuItem.title }}
                <!-- etc... -->
              </PopoverButton>
              <!-- Or a simple link if no children -->
              <NuxtLink
                v-else
                :to="`/${menuItem.slug}`"
                class="text-sm/6 font-semibold text-gray-900"
              >
                {{ menuItem.title }}
              </NuxtLink>
            </template>
          </Popover>
        </PopoverGroup>
      </nav>
    </header>
  </template>
  
  <script setup lang="ts">
  import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue'
  import { ChevronDownIcon } from '@heroicons/vue/20/solid'
  import { computed } from 'vue'
  import { useTopics } from '~/composables/useTopics'
  import { RouterLink as NuxtLink } from 'vue-router'
  
  // Props from your layout
  interface MenuItem {
    title: string
    slug?: string
    children?: MenuItem[]
  }
  
  interface Menu {
    title: string
    items: MenuItem[]
  }
  
  const props = defineProps<{
    menu: Menu
  }>()
  
  // Grab the topics
  const { data: topicsData, pending: topicsPending } = useTopics()
  
  // We'll store them in a computed
  const allTopics = computed(() => topicsData.value || [])
  </script>