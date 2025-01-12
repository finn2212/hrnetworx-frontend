// composables/useTopics.ts
import { useAsyncData, useNuxtApp } from '#app'
import groq from 'groq'
import type { Topic } from '../types/sanity' // (optional) We'll define the type below

const query = groq`
  *[_type == "topic"] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`

export function useTopics() {
  const { $sanityClient } = useNuxtApp()

  return useAsyncData<Topic[]>('allTopics', async () => {
    return await $sanityClient.fetch(query)
  })
}