<template>
    <main class="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 class="text-4xl font-bold mb-8">Posts</h1>
      <ul class="flex flex-col gap-y-4">
        <li
          v-for="post in posts"
          :key="post._id"
          class="hover:underline"
        >
          <NuxtLink :to="`/${post.slug.current}`">
            <h2 class="text-xl font-semibold">{{ post.title }}</h2>
            <p>{{ formatDate(post.publishedAt) }}</p>
          </NuxtLink>
        </li>
      </ul>
    </main>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useSanity } from '@/composables/useSanity'
  
  // GROQ query to list the latest posts
  const POSTS_QUERY = `*[
    _type == "post" 
    && defined(slug.current)
  ]|order(publishedAt desc)[0...12]{
    _id, title, slug, publishedAt
  }`
  
  const posts = ref<any[]>([])
  
  const { fetchData } = useSanity()
  
  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString()
  }
  
  // Fetch posts when component mounts
  onMounted(async () => {
    posts.value = await fetchData(POSTS_QUERY)
  })
  </script>