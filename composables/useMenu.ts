import { useAsyncData, useNuxtApp } from '#app'
import groq from 'groq'

const mainMenuQuery = groq`
  *[_type == "menu" && title == "Main Menu"][0] {
    title,
    items[]{
      title,
      "slug": slug.current,
      children[]{
        title,
        "slug": slug.current
      }
    }
  }
`

export function useMenu() {
  const { $sanityClient } = useNuxtApp()

  const { data, pending, error } = useAsyncData('mainMenu', () =>
    $sanityClient.fetch(mainMenuQuery)
  )

  console.log('Menu Data:', data.value)
  console.log('Error:', error.value)

  return { data, pending, error }
}