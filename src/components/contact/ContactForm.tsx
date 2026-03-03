"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

const OPTIONS = [
  "Business website",
  "QR digital menu",
  "Admin dashboard",
  "Android / iOS app",
  "Desktop tool",
  "Custom integration",
  "Other",
] as const;

type Option = (typeof OPTIONS)[number];

function normalize(input: string) {
  return input.trim().toLowerCase();
}

function pickOption(serviceParam: string | null): Option | null {
  if (!serviceParam) return null;
  const q = normalize(serviceParam);

  // Exact-ish mapping + synonyms
  const map: Array<[string[], Option]> = [
    [["business website", "website", "web", "web site", "landing page"], "Business website"],
    [["qr digital menu", "digital menu", "menu", "qr menu", "restaurant menu"], "QR digital menu"],
    [["admin dashboard", "dashboard", "admin", "panel"], "Admin dashboard"],
    [["android / ios app", "mobile app", "app", "ios", "android"], "Android / iOS app"],
    [["desktop tool", "desktop", "windows app", "tool"], "Desktop tool"],
    [["custom integration", "integration", "api", "automation", "sync"], "Custom integration"],
    [["other"], "Other"],
  ];

  for (const [keys, value] of map) {
    if (keys.some((k) => q.includes(k))) return value;
  }

  // If they passed an exact option
  const exact = OPTIONS.find((o) => normalize(o) === q);
  return exact ?? null;
}

export default function ContactForm() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");

  const preferred = useMemo(() => pickOption(serviceParam), [serviceParam]);
  const [service, setService] = useState<Option>("Business website");

  useEffect(() => {
    if (preferred) setService(preferred);
  }, [preferred]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
      <h3 className="text-xl font-semibold text-white">Project inquiry</h3>
      <p className="mt-2 text-sm text-white/60">Fill this out and we’ll get back to you.</p>

      <form
        action="https://formspree.io/f/mjgelnbg"
        method="POST"
        className="mt-6 space-y-4"
      >
        {/* Honeypot (spam trap) */}
        <input type="text" name="_gotcha" className="hidden" />

        <div>
          <label htmlFor="name" className="mb-2 block text-sm text-white/80">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/40"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-white/80">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/40"
          />
        </div>

        <div>
          <label htmlFor="serviceType" className="mb-2 block text-sm text-white/80">
            What do you need?
          </label>
          <select
            id="serviceType"
            name="serviceType"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
            value={service}
            onChange={(e) => setService(e.target.value as Option)}
          >
            {OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          {preferred && (
            <p className="mt-2 text-xs text-white/45">
              Preselected based on your click: <span className="text-white/70">{service}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm text-white/80">
            Project details
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="Tell us about your business, what you need, and your goal..."
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/40"
          />
        </div>

        <input type="hidden" name="_subject" value="New Flux inquiry" />
        <input type="hidden" name="_redirect" value="/thank-you" />

        <Button type="submit" variant="primary" size="md" className="w-full">
          Send inquiry
        </Button>

        <p className="text-xs text-white/45">
          By sending, you agree to be contacted about your request.
        </p>
      </form>
    </div>
  );
}