import type { ProjectStatusLabel } from "@/lib/constants/projects";

export const placeholderLogos = [
  "/icons/service-websites.png",
  "/icons/service-menus.png",
  "/icons/service-dashboard.png",
  "/icons/service-mobile.png",
  "/icons/service-desktop.png",
  "/icons/service-integrations.png",
] as const;

export type Service = {
  label: string;
  targetId: string;
  icon: string;
  description: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    label: "Business websites",
    targetId: "service-websites",
    icon: "/icons/service-websites.png",
    description:
      "Company sites and landing pages that explain what you do and make it easy to get in touch.",
    bullets: [
      "Service and product pages",
      "Mobile-friendly layout",
      "Fast load times",
      "Easy content updates",
    ],
  },
  {
    label: "Restaurant & café digital menus",
    targetId: "service-digital-menus",
    icon: "/icons/service-menus.png",
    description:
      "QR menus customers can open on their phone — clear categories, photos, and prices.",
    bullets: [
      "QR code setup",
      "Menu you can edit",
      "Works on any phone",
      "Optional admin panel",
    ],
  },
  {
    label: "Admin dashboards",
    targetId: "service-admin-dashboards",
    icon: "/icons/service-dashboard.png",
    description:
      "Internal panels for managing orders, users, content, or reports — built around how your team actually works.",
    bullets: [
      "Role-based login",
      "Search, filters, and tables",
      "Forms and workflows",
      "Reports and exports",
    ],
  },
  {
    label: "Android / iOS apps",
    targetId: "service-mobile-apps",
    icon: "/icons/service-mobile.png",
    description:
      "Mobile apps for customers or staff — booking, ordering, field work, or internal tools on the go.",
    bullets: [
      "Android and iOS",
      "Login and accounts",
      "API connections",
      "Push notifications",
    ],
  },
  {
    label: "Desktop tools",
    targetId: "service-desktop-tools",
    icon: "/icons/service-desktop.png",
    description:
      "Windows or cross-platform apps for tasks that are awkward in a browser — file handling, offline use, or heavy data entry.",
    bullets: [
      "Internal business tools",
      "File import and export",
      "Offline when needed",
      "Hardware or device hooks",
    ],
  },
  {
    label: "Custom integrations",
    targetId: "service-custom-integrations",
    icon: "/icons/service-integrations.png",
    description:
      "Connect the tools you already use — sync data, trigger actions, and cut out manual copy-paste.",
    bullets: [
      "API connections",
      "Webhooks and automation",
      "Data sync between systems",
      "One-off connectors",
    ],
  },
];

export const fallbackProjects = [
  {
    title: "White Angel",
    category: "Websites",
    label: "Client project" as ProjectStatusLabel,
    text: "Company website with service pages, contact flow, and a layout tuned for mobile visitors.",
  },
  {
    title: "Best Mebel",
    category: "Websites",
    label: "Client project" as ProjectStatusLabel,
    text: "Furniture catalog site focused on product browsing and inquiry forms for showroom sales.",
  },
  {
    title: "UEB Finance",
    category: "Admin Dashboards",
    label: "Internal tool" as ProjectStatusLabel,
    text: "Operations dashboard for reviewing data, managing records, and handling day-to-day admin tasks.",
  },
  {
    title: "QR Digital Menu",
    category: "Digital Menus",
    label: "Demo" as ProjectStatusLabel,
    text: "Sample QR menu layout — categories, item photos, and pricing — built to show what we deliver for hospitality.",
  },
] as const;
