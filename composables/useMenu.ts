import { useAsyncData, useNuxtApp } from '#app'
import groq from 'groq'

// GROQ query with a dynamic placeholder for the menu title
const menuQuery = groq`
  *[_type == "menu" && title == $title][0] {
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

export function useMenu(menuTitle: string) {
  const { $sanityClient } = useNuxtApp()

  const { data, pending, error } = useAsyncData(
    `menu-${menuTitle}`, // Use a unique key per menu
    () => $sanityClient.fetch(menuQuery, { title: menuTitle }) // Pass the dynamic title to the query
  )

  return { data, pending, error }
}