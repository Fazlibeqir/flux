import "./globals.css";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flux — Websites & Apps for Business",
  description:
    "Flux builds high-performance websites, mobile apps, dashboards, QR menus, and custom software for real business workflows.",
  metadataBase: new URL("https://your-domain.com"),
  openGraph: {
    title: "Flux — Websites & Apps for Business",
    description:
      "Websites, mobile apps, dashboards, QR menus, and custom software — built for speed, clarity, and growth.",
    url: "https://your-domain.com",
    siteName: "Flux",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flux — Websites & Apps for Business",
    description:
      "We build websites and apps that move businesses forward.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
