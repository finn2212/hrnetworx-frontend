<template>
  <main
    class="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4"
  >
    <NuxtLink to="/" class="hover:underline">← Back to posts</NuxtLink>

    <!-- Show image if available -->
    <img
      v-if="postImageUrl"
      :src="postImageUrl"
      :alt="post.title"
      class="aspect-video rounded-xl"
      width="550"
      height="310"
    />

    <h1 class="text-4xl font-bold mb-8">{{ post.title }}</h1>
    <div class="prose">
      <p>Published: {{ formatDate(post.publishedAt) }}</p>
      <p v-if="post.body">
        {{ post.body }}
      </p>
      <p v-else>No content available.</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useRoute } from "#app";
import { useSanity } from "@/composables/useSanity";

// GROQ query to get a single post by slug
const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const { fetchData, urlFor } = useSanity();

const post = ref<any>({});

const postImageUrl = computed(() => {
  if (post.value.image) {
    return urlFor(post.value.image).width(550).height(310).url();
  }
  return null;
});

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString();
}

// Fetch the post data when this route is visited
onMounted(async () => {
  post.value = await fetchData(POST_QUERY, { slug: slug.value });
});
</script>
