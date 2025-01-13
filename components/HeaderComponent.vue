<template>
  <header class="relative isolate z-10 bg-white">
    <!-- NAV WRAPPER -->
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <!-- LOGO AREA -->
      <div class="flex lg:flex-1">
        <NuxtLink to="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <!-- Use the dynamic logo from props -->
          <img
            v-if="logo?.asset"
            class="h-8 w-auto"
            :src="logo?.asset.url"
            alt="Logo"
          />
          <!-- Optional fallback if no logo URL -->
        </NuxtLink>
      </div>

      <!-- MOBILE BURGER BUTTON -->
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>
      </div>

      <!-- DESKTOP MENU (hidden on mobile) -->
      <PopoverGroup class="hidden lg:flex lg:gap-x-12">
        <!-- Loop over the top-level array: menu -->
        <Popover
          v-for="(menuItem, index) in menu"
          :key="menuItem.title"
          class="relative"
        >
          <!-- If the item is "Themen" (topics) -->
          <template v-if="menuItem.title === 'Themen'">
            <PopoverButton
              class="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900"
            >
              {{ menuItem.title }}
              <ChevronDownIcon
                class="size-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </PopoverButton>

            <!-- Topics dropdown (dynamic topics) -->
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 -translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <PopoverPanel
                class="absolute z-10 mt-3 w-48 rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
              >
                <div class="p-4">
                  <div v-if="topicsPending" class="text-gray-500">
                    Loading Topics...
                  </div>
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

          <!-- Else if it has children, create a generic dropdown -->
          <template v-else-if="menuItem.children?.length">
            <PopoverButton
              class="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900"
            >
              {{ menuItem.title }}
              <ChevronDownIcon
                class="size-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </PopoverButton>

            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 -translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <PopoverPanel
                class="absolute z-10 mt-3 w-48 rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
              >
                <div class="p-4">
                  <div
                    v-for="(child, childIndex) in menuItem.children"
                    :key="child._key"
                    class="hover:bg-gray-50 rounded-lg p-2"
                  >
                    <NuxtLink
                      :to="child.slug ? `/${child.slug}` : '/'"
                      class="block font-semibold text-gray-900"
                    >
                      {{ child.title }}
                    </NuxtLink>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </template>

          <!-- Otherwise, just a single link -->
          <template v-else>
            <NuxtLink
              :to="menuItem.slug ? `/${menuItem.slug}` : '/'"
              class="text-sm/6 font-semibold text-gray-900"
            >
              {{ menuItem.title }}
            </NuxtLink>
          </template>
        </Popover>
      </PopoverGroup>

      <!-- (Optional) Something on the right side in desktop -->
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <!-- Example link for "Login" or your call-to-action -->
        <NuxtLink to="/login" class="text-sm/6 font-semibold text-gray-900">
          <!-- Log in <span aria-hidden="true">&rarr;</span> -->
        </NuxtLink>
      </div>
    </nav>

    <!-- MOBILE MENU (Dialog) -->
    <Dialog
      class="lg:hidden"
      @close="mobileMenuOpen = false"
      :open="mobileMenuOpen"
    >
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <!-- MOBILE MENU HEADER: LOGO + CLOSE BTN -->
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="-m-1.5 p-1.5">
            <span class="sr-only">hrnetworx</span>
            <img
            v-if="logo?.asset"
            class="h-8 w-auto"
            :src="logo?.asset.url"
            alt="Logo"
          />
          </NuxtLink>
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="size-6" aria-hidden="true" />
          </button>
        </div>

        <!-- MOBILE NAV LINKS -->
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <!-- MOBILE MENU LIST -->
            <div class="space-y-2 py-6">
              <!-- Loop menu items again, but in mobile style -->
              <Disclosure
                v-for="(menuItem, i) in menu"
                :key="menuItem.title"
                as="div"
                class="-mx-3"
                v-slot="{ open }"
              >
                <!-- If it's "Themen" or has children, we show a Disclosure for sub-items -->
                <template
                  v-if="
                    menuItem.title === 'Themen' || menuItem.children?.length
                  "
                >
                  <DisclosureButton
                    class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {{ menuItem.title }}
                    <ChevronDownIcon
                      :class="[open ? 'rotate-180' : '', 'size-5 flex-none']"
                      aria-hidden="true"
                    />
                  </DisclosureButton>

                  <!-- SUB-LINKS -->
                  <DisclosurePanel class="mt-2 space-y-2">
                    <!-- If "Themen" -->
                    <template v-if="menuItem.title === 'Themen'">
                      <div
                        v-if="topicsPending"
                        class="pl-6 text-sm text-gray-500"
                      >
                        Loading Topics...
                      </div>
                      <NuxtLink
                        v-else
                        v-for="(topic, tIndex) in allTopics"
                        :key="topic._id"
                        :to="`/topics/${topic.slug}`"
                        class="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {{ topic.title }}
                      </NuxtLink>
                    </template>

                    <!-- Else, if it has children -->
                    <template v-else>
                      <NuxtLink
                        v-for="(child, childIndex) in menuItem.children"
                        :key="child._key"
                        :to="child.slug ? `/${child.slug}` : '/'"
                        class="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {{ child.title }}
                      </NuxtLink>
                    </template>
                  </DisclosurePanel>
                </template>

                <!-- If no children and not "Themen", it's a single link -->
                <template v-else>
                  <DisclosureButton
                    as="NuxtLink"
                    :to="menuItem.slug ? `/${menuItem.slug}` : '/'"
                    class="-mx-3 block w-full rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {{ menuItem.title }}
                  </DisclosureButton>
                </template>
              </Disclosure>
            </div>

            <!-- MOBILE "FOOTER" LINKS (e.g. Login) -->
            <div class="py-6">
              <NuxtLink
                to="/login"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
              >
                Log in
              </NuxtLink>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { RouterLink as NuxtLink } from "vue-router";

// Import your "Themen" logic
import { useTopics } from "~/composables/useTopics";

interface MenuItem {
  title: string;
  slug?: string;
  children?: MenuItem[] | null;
  _key?: string;
}
interface LogoType {
  asset: any;
  url?: string;
  // ... add any additional fields from Sanity if needed
}

const props = defineProps<{
  menu: MenuItem[]; // top-level array of items
  logo: LogoType; // object with a .url for the logo
}>();

// Manage the mobile menu open/close
const mobileMenuOpen = ref(false);

// If you have a “Themen” item that dynamically fetches topics:
const { data: topicsData, pending: topicsPending } = useTopics();
const allTopics = computed(() => topicsData.value || []);
</script>
