import { useNuxtApp } from '#app'

export function useSanity() {
  const { $sanityClient, $urlFor } = useNuxtApp()

  /**
   * fetchData - Helper to run a GROQ query
   * @param {string} query - GROQ query
   * @param {Record<string, any>} params - Optional params for query
   */
  async function fetchData(query: string, params: Record<string, any> = {}) {
    try {
      return await $sanityClient.fetch(query, params)
    } catch (error) {
      console.error('Sanity fetch error:', error)
      return []
    }
  }

  /**
   * urlFor - Helper to build image URLs
   */
  function urlFor(source: any) {
    return $urlFor(source)
  }

  return {
    fetchData,
    urlFor,
  }
}