"use client";

import { useEffect, useState } from "react";
import { DEFAULT_SITE_CONTENT } from "@/lib/content/defaults";
import { loadAllSiteContentBlocks, saveSiteContentBlock } from "@/lib/data/site.client";
import type { SiteContentKey, SiteContentMap } from "@/lib/types/site";
import { AdminFormSection, Field } from "@/components/admin/AdminPageHeader";

const SECTIONS: { key: SiteContentKey; label: string }[] = [
  { key: "hero", label: "Hero" },
  { key: "services_overview", label: "Services overview" },
  { key: "work", label: "Work section" },
  { key: "about", label: "About" },
  { key: "process", label: "Process" },
  { key: "why_flux", label: "Why Flux" },
  { key: "contact", label: "Contact" },
  { key: "footer", label: "Footer" },
];

function mergeContent(): SiteContentMap {
  return { ...DEFAULT_SITE_CONTENT };
}

export default function AdminContentEditor({ setToast }: { setToast: (m: string) => void }) {
  const [active, setActive] = useState<SiteContentKey>("hero");
  const [draft, setDraft] = useState<SiteContentMap>(mergeContent());
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllSiteContentBlocks()
      .then((blocks) => {
        setDraft((prev) => ({
          ...prev,
          ...blocks,
          hero: { ...prev.hero, ...(blocks.hero ?? {}) },
          services_overview: { ...prev.services_overview, ...(blocks.services_overview ?? {}) },
          work: { ...prev.work, ...(blocks.work ?? {}) },
          about: { ...prev.about, ...(blocks.about ?? {}) },
          process: { ...prev.process, ...(blocks.process ?? {}) },
          why_flux: { ...prev.why_flux, ...(blocks.why_flux ?? {}) },
          contact: { ...prev.contact, ...(blocks.contact ?? {}) },
          footer: { ...prev.footer, ...(blocks.footer ?? {}) },
        }));
      })
      .catch((e) => setToast(e instanceof Error ? e.message : "Failed to load content."))
      .finally(() => setLoading(false));
  }, [setToast]);

  const save = async () => {
    setSaving(true);
    try {
      await saveSiteContentBlock(active, draft[active]);
      setToast("Section saved.");
    } catch (e) {
      setToast(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-white/55">Loading content…</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setActive(s.key)}
            className={[
              "rounded-lg border px-3 py-1.5 text-sm",
              active === s.key
                ? "border-cyan-300/40 bg-cyan-400/10 text-cyan-100"
                : "border-white/10 text-white/60 hover:text-white",
            ].join(" ")}
          >
            {s.label}
          </button>
        ))}
      </div>

      {active === "hero" && (
        <AdminFormSection title="Hero">
          <Field label="Eyebrow"><input className="input" value={draft.hero.eyebrow} onChange={(e) => setDraft({ ...draft, hero: { ...draft.hero, eyebrow: e.target.value } })} /></Field>
          <Field label="Title"><textarea className="input min-h-[80px]" value={draft.hero.title} onChange={(e) => setDraft({ ...draft, hero: { ...draft.hero, title: e.target.value } })} /></Field>
          <Field label="Subtitle"><textarea className="input min-h-[80px]" value={draft.hero.subtitle} onChange={(e) => setDraft({ ...draft, hero: { ...draft.hero, subtitle: e.target.value } })} /></Field>
        </AdminFormSection>
      )}

      {(active === "services_overview" || active === "work") && (
        <AdminFormSection title={active === "work" ? "Work" : "Services overview"}>
          <Field label="Eyebrow"><input className="input" value={draft[active].eyebrow} onChange={(e) => setDraft({ ...draft, [active]: { ...draft[active], eyebrow: e.target.value } })} /></Field>
          <Field label="Title"><input className="input" value={draft[active].title} onChange={(e) => setDraft({ ...draft, [active]: { ...draft[active], title: e.target.value } })} /></Field>
          <Field label="Description"><textarea className="input min-h-[72px]" value={draft[active].description ?? ""} onChange={(e) => setDraft({ ...draft, [active]: { ...draft[active], description: e.target.value } })} /></Field>
        </AdminFormSection>
      )}

      {active === "about" && (
        <AdminFormSection title="About">
          <Field label="Title"><input className="input" value={draft.about.title} onChange={(e) => setDraft({ ...draft, about: { ...draft.about, title: e.target.value } })} /></Field>
          <Field label="Paragraph 1"><textarea className="input min-h-[72px]" value={draft.about.paragraph1} onChange={(e) => setDraft({ ...draft, about: { ...draft.about, paragraph1: e.target.value } })} /></Field>
          <Field label="Paragraph 2"><textarea className="input min-h-[72px]" value={draft.about.paragraph2} onChange={(e) => setDraft({ ...draft, about: { ...draft.about, paragraph2: e.target.value } })} /></Field>
          <Field label="Points cards (title|text per line)">
            <textarea
              className="input min-h-[120px]"
              value={draft.about.cards.map((c) => `${c.title}|${c.text}`).join("\n")}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  about: {
                    ...draft.about,
                    cards: e.target.value
                      .split("\n")
                      .map((line) => {
                        const [title, ...rest] = line.split("|");
                        return { title: title?.trim() ?? "", text: rest.join("|").trim() };
                      })
                      .filter((c) => c.title),
                  },
                })
              }
            />
          </Field>
        </AdminFormSection>
      )}

      {active === "process" && (
        <AdminFormSection title="Process">
          <Field label="Title"><input className="input" value={draft.process.title} onChange={(e) => setDraft({ ...draft, process: { ...draft.process, title: e.target.value } })} /></Field>
          <Field label="Steps (step|title|text per line)">
            <textarea
              className="input min-h-[120px]"
              value={draft.process.steps.map((s) => `${s.step}|${s.title}|${s.text}`).join("\n")}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  process: {
                    ...draft.process,
                    steps: e.target.value
                      .split("\n")
                      .map((line) => {
                        const [step, title, ...rest] = line.split("|");
                        return { step: step?.trim() ?? "", title: title?.trim() ?? "", text: rest.join("|").trim() };
                      })
                      .filter((s) => s.step),
                  },
                })
              }
            />
          </Field>
        </AdminFormSection>
      )}

      {active === "why_flux" && (
        <AdminFormSection title="Why Flux">
          <Field label="Title"><input className="input" value={draft.why_flux.title} onChange={(e) => setDraft({ ...draft, why_flux: { ...draft.why_flux, title: e.target.value } })} /></Field>
          <Field label="Points (one per line)">
            <textarea className="input min-h-[120px]" value={draft.why_flux.points.join("\n")} onChange={(e) => setDraft({ ...draft, why_flux: { ...draft.why_flux, points: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) } })} />
          </Field>
        </AdminFormSection>
      )}

      {active === "contact" && (
        <AdminFormSection title="Contact">
          <Field label="Title"><input className="input" value={draft.contact.title} onChange={(e) => setDraft({ ...draft, contact: { ...draft.contact, title: e.target.value } })} /></Field>
          <Field label="Description"><textarea className="input min-h-[72px]" value={draft.contact.description} onChange={(e) => setDraft({ ...draft, contact: { ...draft.contact, description: e.target.value } })} /></Field>
          <Field label="Form title"><input className="input" value={draft.contact.formTitle} onChange={(e) => setDraft({ ...draft, contact: { ...draft.contact, formTitle: e.target.value } })} /></Field>
        </AdminFormSection>
      )}

      {active === "footer" && (
        <AdminFormSection title="Footer">
          <Field label="Tagline"><textarea className="input min-h-[72px]" value={draft.footer.tagline} onChange={(e) => setDraft({ ...draft, footer: { tagline: e.target.value } })} /></Field>
        </AdminFormSection>
      )}

      <button type="button" onClick={save} disabled={saving} className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-medium text-black disabled:opacity-60">
        {saving ? "Saving…" : "Save section"}
      </button>
    </div>
  );
}
