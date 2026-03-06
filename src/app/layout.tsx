import "./globals.css";
import Navbar from "@/components/Navbar";
import type { Metadata, Viewport } from "next";
import StructuredData from "@/components/seo/StructuredData";

const SITE_NAME = "Flux";
const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || "https://flux.mk"; // set this env var
const SITE_URL = new URL(SITE_DOMAIN);

const TITLE = "Flux Websites & Apps for Business";
const DESCRIPTION =
  "Flux builds high-performance websites, mobile apps, dashboards, QR menus, and custom software for real business workflows.";

export const metadata: Metadata = {
  metadataBase: SITE_URL,

  // Better title handling across pages
  title: {
    default: TITLE,
    template: `%s ${SITE_NAME}`,
  },
  description: DESCRIPTION,

  // Optional but useful
  applicationName: SITE_NAME,
  category: "Technology",

  // Keywords help a bit for some engines; not a magic bullet
  keywords: [
    // EN — Core
    "web development",
    "software development",
    "custom software",
    "web design",
    "business websites",
    "company website",
    "landing page development",
    "web applications",
    "SaaS development",
    "mobile apps",
    "iOS app development",
    "Android app development",
    "cross-platform apps",
    "admin dashboard",
    "dashboard development",
    "internal tools",
    "automation",
    "API integration",
    "system integrations",
    "database design",
    "PostgreSQL",
    "Supabase",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "UI/UX",
    "performance optimization",
    "SEO friendly website",
    "hosting and deployment",
    "maintenance and support",
    "QR digital menu",
    "digital menu for restaurants",
    "cafe QR menu",
    "restaurant menu website",
    "online menu",
  
    // EN — Local intent
    "web development North Macedonia",
    "software company Skopje",
    "web design Skopje",
    "mobile app development Skopje",
    "custom software North Macedonia",
  
    // AL — Core (Shqip)
    "zhvillim ueb",
    "zhvillim softueri",
    "softuer i personalizuar",
    "dizajn ueb",
    "faqe interneti per biznese",
    "faqe interneti per kompani",
    "zhvillim aplikacionesh ueb",
    "aplikacione mobile",
    "zhvillim aplikacionesh Android",
    "zhvillim aplikacionesh iOS",
    "aplikacione cross-platform",
    "panel administrimi",
    "dashboard per menaxhim",
    "vegla te brendshme",
    "automatizim procesesh",
    "integrim API",
    "integrime sistemesh",
    "baze te dhenash",
    "PostgreSQL",
    "Supabase",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "UI/UX",
    "optimizim performance",
    "faqe e optimizuar per SEO",
    "hostim dhe deploy",
    "mirembajtje dhe support",
    "menu digjitale me QR",
    "menu per restorante me QR",
    "menu per kafene me QR",
    "menu online",
  
    // AL — Local intent
    "zhvillim ueb Maqedonia e Veriut",
    "kompani softueri Shkup",
    "dizajn ueb Shkup",
    "zhvillim aplikacionesh Shkup",
  
    // MK — Core (Македонски)
    "веб развој",
    "развој на софтвер",
    "прилагоден софтвер",
    "веб дизајн",
    "веб страници за бизнис",
    "веб страница за компанија",
    "изработка на веб страници",
    "веб апликации",
    "SaaS развој",
    "мобилни апликации",
    "Android апликации",
    "iOS апликации",
    "крос-платформски апликации",
    "админ панел",
    "контролна табла",
    "внатрешни алатки",
    "автоматизација",
    "API интеграција",
    "системски интеграции",
    "база на податоци",
    "PostgreSQL",
    "Supabase",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "UI/UX",
    "оптимизација на перформанси",
    "SEO оптимизирана веб страница",
    "хостинг и деплој",
    "одржување и поддршка",
    "QR дигитално мени",
    "дигитално мени за ресторан",
    "QR мени за кафуле",
    "онлајн мени",
  
    // MK — Local intent
    "веб развој Северна Македонија",
    "софтверска компанија Скопје",
    "веб дизајн Скопје",
    "развој на апликации Скопје",
  ],

  authors: [{ name: "Flux" }],
  creator: "Flux",
  publisher: "Flux",

  // Canonical / alternates
  alternates: {
    canonical: "/",
  },

  // Crawling / indexing rules
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // Open Graph
  openGraph: {
    title: TITLE,
    description:
      "Websites, mobile apps, dashboards, QR menus, and custom software built for speed, clarity, and growth.",
    url: SITE_DOMAIN,
    siteName: SITE_NAME,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Flux Websites & Apps for Business",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "We build websites and apps that move businesses forward.",
    images: ["/og.png"],
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico" },
      //{ url: "/icon.png", type: "image/png" }, // optional if you add it
    ],
    //apple: [{ url: "/apple-touch-icon.png" }], // optional if you add it
  },

  // Optional verification (only if you actually use these)
  verification: {
    // google: "YOUR_GOOGLE_SITE_VERIFICATION_CODE",
    // other: {
    //   "facebook-domain-verification": ["YOUR_FACEBOOK_DOMAIN_VERIFICATION"],
    // },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StructuredData />
        <Navbar />
        {children}
      </body>
    </html>
  );
}