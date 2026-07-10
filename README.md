# AKAM Architects & Construction - Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/1e260b37-d35a-4069-83ee-4221c797b54a/deploy-status)](https://app.netlify.com/projects/akamarchitects/deploys)

A premium, static-first portfolio website for AKAM Architects & Construction, built with
Astro, TypeScript, Tailwind CSS, React islands, and Framer Motion. See [CLAUDE.md](CLAUDE.md)
for the full design/engineering brief this project follows.

## Project Structure

```text
src/
  components/       Reusable Astro components + a few hydrated React islands
                     (Reveal, Lightbox, AnimatedCounter - Framer Motion)
  layouts/
    Layout.astro     Base HTML shell: SEO, fonts, nav, footer, floating UI
  content.config.ts  Content Collections schemas (all editable content)
  content/           ALL editable text + image references live here as Markdown:
    settings/site.md      Site-wide: name, tagline, logo files, phone, email,
                          address, hours, social links
    home/home.md          Every heading/paragraph/CTA + hero image on the Home page
    about/about.md        About page: story, vision, mission, timeline, stats
    expertise/*.md        One file per expertise item (title, description, order)
    testimonials/*.md     One file per testimonial (quote, name, role, order)
    pages/*.md            Eyebrow/heading/intro for Projects, Gallery, Expertise,
                          Testimonials, Contact, and the 404 page
    legal/privacy-policy.md   Full Privacy Policy body as Markdown
    projects/*.md         One Markdown file per project - see "Adding a Project"
  assets/            Local images referenced from content frontmatter and pages
    logo/             AKAM logo variants (icon, white icon, full lockup)
    projects/<slug>/  Per-project photography
  lib/
    site.ts           Structural config only: routes/nav links, categories, site URL
    settings.ts        Helper that loads content/settings/site.md
    schema.ts           JSON-LD helpers (Organization, LocalBusiness, Breadcrumb)
  pages/              File-based routes (Home, Projects, Gallery, Expertise, About,
                      Testimonials, Contact, Privacy Policy, 404)
  styles/
    global.css        Tailwind v4 entry point + design tokens (@theme) + fonts
public/
  robots.txt          References the auto-generated sitemap
```

## Editing Site Content (no code required)

Almost every piece of written content and every image reference on the site is a
Markdown file under `src/content/`:

- **Contact details, logo, social links** → `src/content/settings/site.md`
- **Home page copy and hero image** → `src/content/home/home.md`
- **About page (story, vision, mission, timeline, stats)** → `src/content/about/about.md`
- **Expertise items** → add/edit files in `src/content/expertise/` (sorted by `order`)
- **Testimonials** → add/edit files in `src/content/testimonials/` (sorted by `order`)
- **Page headings/intros** (Projects, Gallery, Expertise, Testimonials, Contact, 404)
  → `src/content/pages/<page>.md`
- **Privacy Policy** → `src/content/legal/privacy-policy.md` (body is plain Markdown)
- **Projects** → `src/content/projects/` (see below)

Image fields in frontmatter are relative paths into `src/assets/` - drop a new image
there and update the path. Commit + push, and the active deployment redeploys automatically.

## Adding a Project

Every project on the Projects page, its detail page, and the Gallery page are all
generated automatically from `src/content/projects/`. To add a new project:

1. Create a new Markdown file, e.g. `src/content/projects/my-new-project.md`
   (the filename becomes the URL slug: `/projects/my-new-project`).
2. Fill in the frontmatter:

   ```yaml
   ---
   title: "Project Name"
   category: "Residential" # Residential | Commercial | Interior | Hospitality | Institutional
   location: "City, State"
   year: 2025
   area: "4,000 sq.ft" # optional
   services: ["Architecture", "Interior Design"]
   heroImage: "../../assets/projects/my-new-project/hero.jpg"
   heroImageAlt: "Descriptive alt text for the hero photo"
   gallery:
     - image: "../../assets/projects/my-new-project/01.jpg"
       alt: "Descriptive alt text"
     - image: "../../assets/projects/my-new-project/02.jpg"
       alt: "Descriptive alt text"
   excerpt: "One or two sentences used on cards and for SEO."
   description: |
     Full project write-up. Separate paragraphs with a blank line -
     each becomes its own paragraph on the project page.
   featured: true
   featuredOrder: 7
   ---
   ```

3. Only projects with `featured: true` appear on the Projects page and Gallery
   (keep this to ~30 flagship projects, ordered by `featuredOrder`).
4. That's it - the project page, its entry in the Projects grid, its images in the
   Gallery, and its appearance in "Related Projects" on other pages are all automatic.

The six sample projects shipped with this repo use placeholder photography downloaded
from [Pexels](https://www.pexels.com) (free to use under the Pexels license, no
attribution required). Replace them with AKAM's real project photography before launch.

Two empty-content behaviours are built in:

- **Empty collection** - if a collection has no files (e.g. every file in
  `src/content/testimonials/` is deleted or renamed away from `.md`), every section that
  depends on it disappears from the site; nothing breaks.
- **Empty key** - if an optional frontmatter key (eyebrow, intro, subheading, CTA label,
  vision/mission, timeline, stats, etc.) is left empty or removed, just that element is
  not rendered.

## Updating Images

- Store original/optimized images under `src/assets/` (for content-collection images,
  alongside each project, e.g. `src/assets/projects/<slug>/`). Astro's image pipeline
  automatically generates responsive sizes, converts formats, and prevents layout shift
  for anything referenced through `heroImage`/`gallery` in frontmatter or the `<Image />`
  component.
- Never commit unoptimized camera originals - resize and compress before adding to the
  repo (originals should stay on the studio NAS).
- The AKAM logo variants live in `src/assets/logo/` and are referenced from
  `src/content/settings/site.md` - swap the files or the paths there to update the logo
  everywhere (navbar, footer, social share image, structured data) at once.

## Environment Variables

Copy `.env.example` to `.env` (or set these in your Vercel project) to enable optional
integrations. Everything works and builds without them - each feature just stays inactive:

| Variable               | Enables                                    |
| ----------------------- | ------------------------------------------- |
| `PUBLIC_GA_ID`          | Google Analytics                            |
| `PUBLIC_CLARITY_ID`     | Microsoft Clarity                           |
| `PUBLIC_FORMSPREE_ID`   | The Contact page enquiry form (via Formspree) |

## Local Development

```sh
npm install
npm run dev        # http://localhost:4321
```

## Build Commands

| Command             | Action                                         |
| -------------------- | ----------------------------------------------- |
| `npm install`        | Install dependencies                            |
| `npm run dev`         | Start the local dev server                      |
| `npm run build`       | Type-check (`astro check`) then build to `./dist/` |
| `npm run preview`     | Preview the production build locally            |
| `npm run astro check` | Run Astro's TypeScript/template diagnostics only |

## Deployment

This is a fully static site - no server runtime required.

### Temporary: GitHub Pages

GitHub Actions deploys `main` to GitHub Pages via `.github/workflows/deploy.yml`.
The workflow builds with `GITHUB_PAGES=true`, which sets:

- `site`: `https://schr-0dinger.github.io`
- `base`: `/AkamArchitects`

In the GitHub repo, set **Settings -> Pages -> Build and deployment -> Source** to
**GitHub Actions**. After the workflow finishes, the site is published at:

`https://schr-0dinger.github.io/AkamArchitects/`

### Later: Vercel or Custom Domain

1. Push to GitHub.
2. Import the repo into [Vercel](https://vercel.com) (framework preset: Astro).
3. Set `SITE_URL` to the production origin, if it differs from `https://akamarchitects.com`.
4. Set `BASE_PATH=/` for a root-domain deployment.
5. Set the environment variables above in the Vercel project settings, if used.

The sitemap, canonical URLs, and JSON-LD derive from the configured `site` and `base`.
