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
        "Fast, modern websites for companies that need credibility, conversions, and easy maintenance.",
      bullets: [
        "Landing pages & company websites",
        "Performance-focused builds",
        "SEO-ready structure",
        "CMS or custom admin options",
      ],
    },
    {
      label: "Restaurant & café digital menus",
      targetId: "service-digital-menus",
      icon: "/icons/service-menus.png",
      description:
        "QR-powered menus and product showcases designed for speed, mobile usability, and easy updates.",
      bullets: [
        "QR menu setup",
        "Branded design",
        "Hosted or managed option",
        "Optional admin panel",
      ],
    },
    {
      label: "Admin dashboards",
      targetId: "service-admin-dashboards",
      icon: "/icons/service-dashboard.png",
      description:
        "Custom dashboards for managing users, content, orders, reports, and internal workflows.",
      bullets: [
        "Role-based access",
        "Data tables & filters",
        "Analytics widgets",
        "Custom workflows",
      ],
    },
    {
      label: "Android / iOS apps",
      targetId: "service-mobile-apps",
      icon: "/icons/service-mobile.png",
      description:
        "Cross-platform or native-feel mobile apps for customer experiences and internal business tools.",
      bullets: [
        "Android / iOS development",
        "API integration",
        "Authentication",
        "Push notifications",
      ],
    },
    {
      label: "Desktop tools",
      targetId: "service-desktop-tools",
      icon: "/icons/service-desktop.png",
      description:
        "Desktop software for internal operations, reporting, automation, and specialized workflows.",
      bullets: [
        "Business utilities",
        "Data processing tools",
        "Offline-first options",
        "Custom internal apps",
      ],
    },
    {
      label: "Custom integrations",
      targetId: "service-custom-integrations",
      icon: "/icons/service-integrations.png",
      description:
        "Connect systems, automate repetitive tasks, and sync data between the tools your business uses.",
      bullets: [
        "API integrations",
        "Automation workflows",
        "Data sync pipelines",
        "Custom connectors",
      ],
    },
  ];
  
  export const fallbackProjects = [
    {
      title: "Business Website",
      category: "Web",
      text: "A conversion-focused company website with fast load times and clear service messaging.",
    },
    {
      title: "QR Digital Menu System",
      category: "Hospitality",
      text: "Mobile-first menu experience for cafés/restaurants with easy updates and branding.",
    },
    {
      title: "Admin Dashboard & Tooling",
      category: "Internal Systems",
      text: "A custom dashboard for managing operations, data, and workflows in one place.",
    },
  ] as const;