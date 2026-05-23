import type { SiteContentMap } from "@/lib/types/site";

export const DEFAULT_SITE_CONTENT: SiteContentMap = {
  hero: {
    eyebrow: "Software studio",
    title: "Websites, apps, and internal tools for small and medium businesses.",
    subtitle:
      "We design and build what you need — company sites, QR menus, admin dashboards, mobile apps, desktop software, and integrations.",
    ctaPrimary: "Get a Quote",
    ctaPrimaryHref: "/#contact",
    ctaSecondary: "See Our Work",
    ctaSecondaryHref: "/work",
  },
  services_overview: {
    eyebrow: "What we build",
    title: "Six things we build — from public websites to back-office systems.",
  },
  work: {
    eyebrow: "Selected work",
    title: "Projects we've built",
    description:
      "Client work, live sites, demos, and internal tools — labeled so you know what you're looking at.",
  },
  about: {
    eyebrow: "About Flux",
    title: "A software studio for teams that need things built properly.",
    paragraph1:
      "Flux builds websites, digital menus, admin dashboards, mobile apps, desktop tools, and integrations for small and medium businesses in North Macedonia and abroad.",
    paragraph2: "You get one team from first conversation through launch — no hand-offs between agencies.",
    socialLinks: [
      "https://www.linkedin.com/company/flux-mk",
      "https://www.instagram.com/fluxit.mk/",
    ],
    cards: [
      {
        title: "Built for business use",
        text: "Every project starts with what your team or customers need to do day to day.",
      },
      {
        title: "Custom, not template",
        text: "We scope and build around your workflow — not a generic theme with your logo on it.",
      },
      {
        title: "Straightforward delivery",
        text: "Clear scope, regular updates, and code you can maintain or hand off.",
      },
      {
        title: "Support after launch",
        text: "Fixes, updates, and new features when your business needs them.",
      },
    ],
  },
  process: {
    eyebrow: "How we work",
    title: "How a project runs",
    steps: [
      {
        step: "01",
        title: "Discovery",
        text: "We learn your business, users, and what the software needs to do.",
      },
      {
        step: "02",
        title: "Scope & design",
        text: "We agree on features, screens, timeline, and price before build starts.",
      },
      {
        step: "03",
        title: "Build",
        text: "We develop in stages with check-ins so you see progress early.",
      },
      {
        step: "04",
        title: "Launch",
        text: "We deploy, test together, and fix what comes up in real use.",
      },
    ],
  },
  why_flux: {
    eyebrow: "Why Flux",
    title: "What you can expect when you work with us",
    points: [
      "One team for websites, apps, dashboards, and integrations",
      "Fixed scope and timeline agreed before development",
      "Design that looks professional on desktop and phone",
      "Software shaped around your process, not the other way around",
      "Direct contact with the people building your project",
      "Honest advice if a simpler option fits better",
    ],
  },
  contact: {
    dividerLabel: "Start a project",
    eyebrow: "Contact",
    title: "Tell us what you need built.",
    description:
      "Share your idea — website, menu, dashboard, app, or integration. We reply with questions, a rough timeline, and next steps. No obligation.",
    formTitle: "Get a quote",
    formSubtitle: "We usually reply within one business day.",
    servicesLine:
      "Websites · Digital menus · Dashboards · Mobile apps · Desktop tools · Integrations",
  },
  footer: {
    tagline:
      "Websites, digital menus, dashboards, mobile apps, desktop tools, and integrations — built for small and medium businesses.",
  },
  settings: {
    contactEmail: "fluxit.mk@gmail.com",
    location: "North Macedonia, Skopje",
    instagramUrl: "https://www.instagram.com/fluxit.mk",
    linkedinUrl: "https://www.linkedin.com/company/flux-mk",
  },
};

export const DEFAULT_SERVICES = [
  {
    label: "Business websites",
    target_id: "service-websites",
    icon: "/icons/service-websites.png",
    description:
      "Company sites and landing pages that explain what you do and make it easy to get in touch.",
    bullets: ["Service and product pages", "Mobile-friendly layout", "Fast load times", "Easy content updates"],
    sort_order: 10,
  },
  {
    label: "Restaurant & café digital menus",
    target_id: "service-digital-menus",
    icon: "/icons/service-menus.png",
    description: "QR menus customers can open on their phone — clear categories, photos, and prices.",
    bullets: ["QR code setup", "Menu you can edit", "Works on any phone", "Optional admin panel"],
    sort_order: 20,
  },
  {
    label: "Admin dashboards",
    target_id: "service-admin-dashboards",
    icon: "/icons/service-dashboard.png",
    description:
      "Internal panels for managing orders, users, content, or reports — built around how your team actually works.",
    bullets: ["Role-based login", "Search, filters, and tables", "Forms and workflows", "Reports and exports"],
    sort_order: 30,
  },
  {
    label: "Android / iOS apps",
    target_id: "service-mobile-apps",
    icon: "/icons/service-mobile.png",
    description:
      "Mobile apps for customers or staff — booking, ordering, field work, or internal tools on the go.",
    bullets: ["Android and iOS", "Login and accounts", "API connections", "Push notifications"],
    sort_order: 40,
  },
  {
    label: "Desktop tools",
    target_id: "service-desktop-tools",
    icon: "/icons/service-desktop.png",
    description:
      "Windows or cross-platform apps for tasks that are awkward in a browser — file handling, offline use, or heavy data entry.",
    bullets: ["Internal business tools", "File import and export", "Offline when needed", "Hardware or device hooks"],
    sort_order: 50,
  },
  {
    label: "Custom integrations",
    target_id: "service-custom-integrations",
    icon: "/icons/service-integrations.png",
    description:
      "Connect the tools you already use — sync data, trigger actions, and cut out manual copy-paste.",
    bullets: ["API connections", "Webhooks and automation", "Data sync between systems", "One-off connectors"],
    sort_order: 60,
  },
] as const;
