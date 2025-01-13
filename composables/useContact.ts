// ~/composables/useHomePage.ts
import { useAsyncData, useNuxtApp } from '#app'
import groq from 'groq'

export function useContact() {
  const { $sanityClient } = useNuxtApp()

  const homePageQuery = groq`
    *[_type == "agbPage"][0] {
      title,
      content
      // ...any other fields you defined...
    }
  `

  // unique key "homePage-query" for caching
  const { data, pending, error } = useAsyncData('contact-query', () =>
    $sanityClient.fetch(homePageQuery)
  )

  return { data, pending, error }
}