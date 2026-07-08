// Structural site config - routes and IA. Editorial content (name, contact info,
// social links, etc.) lives in src/content/settings/site.md, not here.

export const siteUrl = "https://akamarchitects.com";
export const siteLocale = "en_IN";

export const navLinks = [
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Expertise", href: "/expertise" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerLinks = [
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Expertise", href: "/expertise" },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
] as const;

export const projectCategories = [
  "Residential",
  "Commercial",
  "Interior",
  "Hospitality",
  "Institutional",
] as const;
