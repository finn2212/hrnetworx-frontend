// ~/composables/useSingletonPage.ts
import { useAsyncData, useNuxtApp } from '#app'
import groq from 'groq'

export function useSingletonPage(pageType: string) {
  const { $sanityClient } = useNuxtApp()

  // pageType might be "homePage", "impressumPage", etc.
  const query = groq`
    *[_type == $pageType][0] {
      title,
      content
    }
  `

  const { data, pending, error } = useAsyncData(`singleton-${pageType}`, () =>
    $sanityClient.fetch(query, { pageType })
  )

  return { data, pending, error }
}