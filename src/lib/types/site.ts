export type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
};

export type SectionHeaderContent = {
  eyebrow: string;
  title: string;
  description?: string;
};

export type AboutCard = { title: string; text: string };

export type AboutContent = {
  eyebrow: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  socialLinks: string[];
  cards: AboutCard[];
};

export type ProcessStep = { step: string; title: string; text: string };

export type ProcessContent = {
  eyebrow: string;
  title: string;
  steps: ProcessStep[];
};

export type WhyFluxContent = {
  eyebrow: string;
  title: string;
  points: string[];
};

export type ContactContent = {
  dividerLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  formTitle: string;
  formSubtitle: string;
  servicesLine: string;
};

export type FooterContent = {
  tagline: string;
};

export type SiteSettings = {
  contactEmail: string;
  location: string;
  instagramUrl: string;
  linkedinUrl: string;
};

export type ServiceRecord = {
  id: string;
  label: string;
  target_id: string;
  icon: string;
  description: string;
  bullets: string[];
  sort_order: number;
  is_active: boolean;
  created_at?: string;
};

export type InquiryRecord = {
  id: string;
  name: string;
  email: string;
  service_type: string | null;
  message: string;
  status: "new" | "read" | "archived";
  created_at: string;
};

export type SiteContentKey =
  | "hero"
  | "services_overview"
  | "work"
  | "about"
  | "process"
  | "why_flux"
  | "contact"
  | "footer"
  | "settings";

export type SiteContentMap = {
  hero: HeroContent;
  services_overview: SectionHeaderContent;
  work: SectionHeaderContent;
  about: AboutContent;
  process: ProcessContent;
  why_flux: WhyFluxContent;
  contact: ContactContent;
  footer: FooterContent;
  settings: SiteSettings;
};
