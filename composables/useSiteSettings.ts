// ~/composables/useSiteSettings.ts
import { useAsyncData, useNuxtApp } from "#app";
import groq from "groq";

// Example GROQ query to fetch a single siteSettings document
const siteConfigQuery = groq`
  *[_type == "siteConfig"][0] {
    mainMenu[]{
        title,
        "slug": slug.current,
        children[]{
            title,
            "slug": slug.current
        }
    },
    footerMenu[]{
        title,
        "slug": slug.current,
        children[]{
            title,
            "slug": slug.current
        }
    },
    copyrightFooter,
    logo {
        asset->{
            url
        }
    }
  }
`;

export function useSiteSettings() {
  const { $sanityClient } = useNuxtApp();

  // We pass 'site-settings' as a unique key for caching
  const { data, pending, error } = useAsyncData("site-settings", () =>
    $sanityClient.fetch(siteConfigQuery)
  );

  return { data, pending, error };
}
