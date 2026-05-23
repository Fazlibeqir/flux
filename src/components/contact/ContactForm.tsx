"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import type { ContactContent } from "@/lib/types/site";

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
  return OPTIONS.find((o) => normalize(o) === q) ?? null;
}

export default function ContactForm({ contact }: { contact: ContactContent }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");
  const preferred = useMemo(() => pickOption(serviceParam), [serviceParam]);
  const [service, setService] = useState<Option>("Business website");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (preferred) setService(preferred);
  }, [preferred]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          serviceType: fd.get("serviceType"),
          message: fd.get("message"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to send.");
      router.push("/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send.");
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
      <h3 className="text-xl font-semibold text-white">{contact.formTitle}</h3>
      <p className="mt-2 text-sm text-white/60">{contact.formSubtitle}</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
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
            className="input"
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
            className="input"
          />
        </div>

        <div>
          <label htmlFor="serviceType" className="mb-2 block text-sm text-white/80">
            What do you need?
          </label>
          <select
            id="serviceType"
            name="serviceType"
            className="input-select"
            value={service}
            onChange={(e) => setService(e.target.value as Option)}
          >
            {OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
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
            placeholder="What you need, who it's for, and any deadline…"
            className="input min-h-[120px]"
          />
        </div>

        {error && <p className="text-sm text-red-300">{error}</p>}

        <Button type="submit" variant="primary" size="md" className="w-full" disabled={submitting}>
          {submitting ? "Sending…" : "Send message"}
        </Button>

        <p className="text-xs text-white/45">
          By sending, you agree to be contacted about your request.
        </p>
      </form>
    </div>
  );
}
