<template>
    <h1>{{ topic?.title }}</h1>
    <!-- Render events, blog posts that reference this topic, etc. -->
  </template>
  
  <script setup lang="ts">
  import { onBeforeMount, ref } from 'vue'
  import { useRoute, useNuxtApp } from '#app'
  import groq from 'groq'
  import type { Topic } from '~/types/sanity'
  
  const topic = ref<Topic|null>(null)
  const route = useRoute()
  const { $sanityClient } = useNuxtApp()
  
  const topicQuery = groq`
    *[_type == "topic" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current
    }
  `
  
  onBeforeMount(async () => {
    const slug = route.params.slug
    topic.value = await $sanityClient.fetch(topicQuery, { slug })
  })
  </script>