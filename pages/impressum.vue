<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">{{ contact?.title }}</h1>

    <!-- If you're using PortableText for rich text: -->
    <PortableText v-if="contact?.content" :value="contact.content" />
  </div>
</template>

<script setup lang="ts">
import { useSingletonPage } from "~/composables/useSingletonPage";
import { PortableText } from "@portabletext/vue";

const { data: contact, pending } = useSingletonPage("impressumPage");
</script>
