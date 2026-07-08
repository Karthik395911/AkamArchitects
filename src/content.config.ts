import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.enum([
        "Residential",
        "Commercial",
        "Interior",
        "Hospitality",
        "Institutional",
      ]),
      location: z.string(),
      year: z.number().int(),
      area: z.string().optional(),
      services: z.array(z.string()),
      heroImage: image(),
      heroImageAlt: z.string(),
      gallery: z
        .array(
          z.object({
            image: image(),
            alt: z.string(),
          }),
        )
        .default([]),
      excerpt: z.string(),
      description: z.string(),
      featured: z.boolean().default(false),
      featuredOrder: z.number().int().default(999),
    }),
});

// Site-wide settings - a single file (src/content/settings/site.md).
const settings = defineCollection({
  loader: glob({ pattern: "site.md", base: "./src/content/settings" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      shortName: z.string(),
      tagline: z.string(),
      description: z.string(),
      founded: z.number().int(),
      logoIcon: image(),
      logoIconOnDark: image(),
      logoFull: image(),
      logoAlt: z.string(),
      phone: z.string(),
      phoneHref: z.string(),
      whatsapp: z.string(),
      email: z.string(),
      addressLine1: z.string(),
      addressLine2: z.string().optional(),
      addressCity: z.string(),
      addressState: z.string(),
      addressPostalCode: z.string(),
      addressCountry: z.string(),
      mapQuery: z.string(),
      hours: z.string(),
      socialFacebook: z.string().optional(),
      socialInstagram: z.string().optional(),
      socialLinkedin: z.string().optional(),
    }),
});

// Home page copy - a single file (src/content/home/home.md).
// Text fields are optional: leave a key empty (or delete it) and that element -
// or the whole section, where nothing else remains - simply isn't rendered.
const home = defineCollection({
  loader: glob({ pattern: "home.md", base: "./src/content/home" }),
  schema: ({ image }) =>
    z.object({
      heroEyebrow: z.string().optional(),
      heroHeading: z.string(),
      heroSubheading: z.string().optional(),
      heroImage: image(),
      heroImageAlt: z.string(),
      heroCtaPrimaryLabel: z.string().optional(),
      heroCtaPrimaryHref: z.string().optional(),
      heroCtaSecondaryLabel: z.string().optional(),
      heroCtaSecondaryHref: z.string().optional(),
      featuredEyebrow: z.string().optional(),
      featuredHeading: z.string().optional(),
      expertiseEyebrow: z.string().optional(),
      expertiseHeading: z.string().optional(),
      aboutEyebrow: z.string().optional(),
      aboutHeading: z.string().optional(),
      aboutBody: z.string().optional(),
      aboutImage: image().optional(),
      aboutImageAlt: z.string().optional(),
      testimonialsEyebrow: z.string().optional(),
      testimonialsHeading: z.string().optional(),
      ctaHeading: z.string().optional(),
      ctaButtonLabel: z.string().optional(),
    }),
});

// About page copy - a single file (src/content/about/about.md).
const about = defineCollection({
  loader: glob({ pattern: "about.md", base: "./src/content/about" }),
  schema: ({ image }) =>
    z.object({
      eyebrow: z.string().optional(),
      heading: z.string(),
      heroImage: image(),
      heroImageAlt: z.string(),
      storyEyebrow: z.string().optional(),
      storyHeading: z.string().optional(),
      storyBody: z.string().optional(),
      vision: z.string().optional(),
      mission: z.string().optional(),
      timeline: z
        .array(
          z.object({
            year: z.string(),
            title: z.string(),
            body: z.string(),
          }),
        )
        .default([]),
      stats: z
        .array(
          z.object({
            value: z.number(),
            suffix: z.string().default(""),
            label: z.string(),
          }),
        )
        .default([]),
    }),
});

// Expertise (formerly "Services") offerings - one file per item.
const expertise = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/expertise" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().int().default(999),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/testimonials" }),
  schema: z.object({
    quote: z.string(),
    name: z.string(),
    role: z.string(),
    order: z.number().int().default(999),
  }),
});

// Short eyebrow/heading/intro copy for simpler pages - one file per page.
const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    eyebrow: z.string().optional(),
    heading: z.string(),
    intro: z.string().optional(),
  }),
});

// Privacy Policy - full legal body as markdown (src/content/legal/privacy-policy.md).
const legal = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/legal" }),
  schema: z.object({
    title: z.string(),
    lastUpdated: z.string(),
  }),
});

export const collections = {
  projects,
  settings,
  home,
  about,
  expertise,
  testimonials,
  pages,
  legal,
};
