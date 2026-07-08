import { getEntry } from "astro:content";

export async function getSiteSettings() {
  const entry = await getEntry("settings", "site");
  if (!entry) {
    throw new Error("Missing content entry: src/content/settings/site.md");
  }
  return entry.data;
}

export type SiteSettings = Awaited<ReturnType<typeof getSiteSettings>>;
