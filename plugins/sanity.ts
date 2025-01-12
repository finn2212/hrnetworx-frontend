// plugins/sanity.ts
import { defineNuxtPlugin } from '#app'
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const config = {
  projectId: 'bp7li5l9',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
}

export default defineNuxtPlugin(() => {
  // Use the named export "createClient" instead of the deprecated default export
  const sanity = createClient(config)
  const builder = imageUrlBuilder(sanity)

  return {
    provide: {
      /**
       * This will inject `sanityClient` into the Nuxt app
       * so you can access it via `const { $sanityClient } = useNuxtApp()`
       */
      sanityClient: sanity,

      /**
       * Helper function to generate image URLs from a Sanity image source
       * usage: $urlFor(someImageRef)
       */
      urlFor: (source: SanityImageSource) => builder.image(source),
    },
  }
})