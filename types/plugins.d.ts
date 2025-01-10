// types/plugins.d.ts

import type { SanityClient } from '@sanity/client'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

declare module '#app' {
  interface NuxtApp {
    $sanityClient: SanityClient
    $urlFor: (source: SanityImageSource) => ImageUrlBuilder
  }
}

// It’s important to ensure this file is included by TypeScript:
export {}