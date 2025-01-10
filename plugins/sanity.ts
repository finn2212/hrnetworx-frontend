import { defineNuxtPlugin } from "#app";
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const config = {
  projectId: "bp7li5l9",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
};

export default defineNuxtPlugin(() => {
  const client = sanityClient(config);
  const builder = imageUrlBuilder(client);

  return {
    provide: {
      // Expose the Sanity client as $sanityClient
      sanityClient: client,
      // Helper to generate image URLs
      urlFor: (source: SanityImageSource) => builder.image(source),
    },
  };
});
