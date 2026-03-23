"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import Toast from "@/components/admin/Toast";
import type { ProductPageContent } from "@/content/products";
import {
  buildAdminEditableProducts,
  listProductRows,
  seedProductsFromDefaults,
  upsertProductContent,
} from "@/lib/data/products.client";
import { signOutAndRedirect } from "@/lib/data/projects.client";
import { uploadProductPreviewImage } from "@/lib/storage/products.client";

function toLines(items: string[]) {
  return items.join("\n");
}

function fromLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function emptyFeature() {
  return { title: "", description: "" };
}

function emptyStep() {
  return { title: "", description: "" };
}

function emptyPreview() {
  return { title: "", description: "", imagePlaceholder: "", imageUrl: "" };
}

function emptyTier() {
  return { name: "", priceLabel: "", description: "", highlights: [] as string[] };
}

function emptyFaq() {
  return { question: "", answer: "" };
}

type EditTab =
  | "basic"
  | "hero"
  | "value"
  | "preview"
  | "features"
  | "steps"
  | "pricing"
  | "caseStudy"
  | "faq";

const EDIT_TABS: Array<{ id: EditTab; label: string }> = [
  { id: "basic", label: "Basic Info" },
  { id: "hero", label: "Hero" },
  { id: "value", label: "Value & Audience" },
  { id: "preview", label: "Preview Blocks" },
  { id: "features", label: "Features" },
  { id: "steps", label: "How It Works" },
  { id: "pricing", label: "Pricing Tiers" },
  { id: "caseStudy", label: "Live Example" },
  { id: "faq", label: "FAQ" },
];

export default function AdminProductsPage() {
  const [toast, setToast] = useState<string | null>(null);
  const [items, setItems] = useState<ProductPageContent[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [draft, setDraft] = useState<ProductPageContent | null>(null);
  const [advancedJsonMode, setAdvancedJsonMode] = useState(false);
  const [advancedJsonValue, setAdvancedJsonValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingPreviewIndex, setUploadingPreviewIndex] = useState<number | null>(null);
  const [previewFiles, setPreviewFiles] = useState<Record<number, File | null>>({});
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [activeTab, setActiveTab] = useState<EditTab>("basic");

  const selectedProduct = useMemo(
    () => items.find((item) => item.slug === selectedSlug),
    [items, selectedSlug]
  );

  const refresh = async () => {
    setLoading(true);
    try {
      const rows = await listProductRows();
      const merged = buildAdminEditableProducts(rows);
      setItems(merged);

      const nextSlug = selectedSlug || merged[0]?.slug || "";
      setSelectedSlug(nextSlug);

      const nextProduct = merged.find((item) => item.slug === nextSlug);
      setDraft(nextProduct ?? null);
      setAdvancedJsonValue(nextProduct ? JSON.stringify(nextProduct, null, 2) : "");
    } catch (e) {
      setToast(e instanceof Error ? e.message : "Failed to load product configs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh().catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const next = items.find((item) => item.slug === selectedSlug);
    if (!next) return;
    setDraft(next);
    setAdvancedJsonValue(JSON.stringify(next, null, 2));
    setActiveTab("basic");
    setPreviewFiles({});
  }, [items, selectedSlug]);

  const setField = <K extends keyof ProductPageContent>(key: K, value: ProductPageContent[K]) => {
    setDraft((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const saveDraft = async () => {
    if (!selectedSlug || saving) return;
    if (!draft) {
      setToast("Nothing to save.");
      return;
    }

    if (draft.slug !== selectedSlug) {
      setToast("Slug cannot be changed here. Select a different product instead.");
      return;
    }

    setSaving(true);
    try {
      await upsertProductContent(selectedSlug, draft);
      setToast("Product config saved.");
      await refresh();
    } catch (e) {
      setToast(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminGuard>
      {(sessionEmail) => (
        <main className="min-h-screen bg-black text-white">
          <div className="mx-auto max-w-7xl px-6 py-8">
            <Toast message={toast} onClear={() => setToast(null)} />

            <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-white/50">Admin session</p>
                  <p className="mt-1 text-sm text-white/75">
                    Signed in as <span className="text-white">{sessionEmail}</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="/admin/projects"
                    className="rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/80 hover:text-white"
                  >
                    Projects
                  </a>
                  <button
                    onClick={async () => {
                      if (signingOut) return;
                      setSigningOut(true);
                      try {
                        await signOutAndRedirect();
                      } catch (e) {
                        setToast(e instanceof Error ? e.message : "Sign out failed.");
                        setSigningOut(false);
                      }
                    }}
                    disabled={signingOut}
                    className="rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/80 hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {signingOut ? "Signing out..." : "Sign out"}
                  </button>
                </div>
              </div>
            </section>

            <section className="mb-6 rounded-2xl border border-cyan-300/20 bg-cyan-400/[0.06] p-5">
              <h1 className="text-xl font-semibold">Products Configuration</h1>
              <p className="mt-2 text-sm text-white/70">
                Edit with guided fields. You can still switch to Advanced JSON mode if needed.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={async () => {
                    if (seeding) return;
                    setSeeding(true);
                    try {
                      await seedProductsFromDefaults();
                      setToast("Seeded default product configs.");
                      await refresh();
                    } catch (e) {
                      setToast(e instanceof Error ? e.message : "Seeding failed.");
                    } finally {
                      setSeeding(false);
                    }
                  }}
                  disabled={seeding}
                  className="rounded-xl border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {seeding ? "Seeding..." : "Seed defaults to database"}
                </button>
                <button
                  onClick={() => {
                    if (!selectedProduct) return;
                    setDraft(selectedProduct);
                    setAdvancedJsonValue(JSON.stringify(selectedProduct, null, 2));
                  }}
                  className="rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/80 hover:text-white"
                >
                  Reset unsaved changes
                </button>
                <button
                  onClick={() => setAdvancedJsonMode((v) => !v)}
                  className="rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/80 hover:text-white"
                >
                  {advancedJsonMode ? "Use Guided Editor" : "Use Advanced JSON"}
                </button>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[300px_1fr]">
              <aside className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-white/50">Products</p>
                {loading ? (
                  <p className="mt-3 text-sm text-white/60">Loading...</p>
                ) : (
                  <div className="mt-3 space-y-2">
                    {items.map((item) => {
                      const active = item.slug === selectedSlug;
                      return (
                        <button
                          key={item.slug}
                          onClick={() => setSelectedSlug(item.slug)}
                          className={[
                            "w-full rounded-xl border px-3 py-2 text-left text-sm transition",
                            active
                              ? "border-cyan-300/40 bg-cyan-400/10 text-cyan-100"
                              : "border-white/10 bg-black/40 text-white/75 hover:text-white",
                          ].join(" ")}
                        >
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-white/50">{item.slug}</p>
                        </button>
                      );
                    })}
                  </div>
                )}
              </aside>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-white/70">Editing slug</p>
                    <p className="font-medium text-white">{selectedSlug || "-"}</p>
                  </div>
                  <button
                    onClick={saveDraft}
                    disabled={!selectedSlug || saving || !draft}
                    className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-medium text-black hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {saving ? "Saving..." : "Save to database"}
                  </button>
                </div>

                {!draft ? (
                  <p className="text-sm text-white/60">Select a product to start editing.</p>
                ) : advancedJsonMode ? (
                  <div>
                    <p className="mb-2 text-xs text-white/50">
                      Advanced mode: edit JSON directly. Slug must stay the same.
                    </p>
                    <textarea
                      value={advancedJsonValue}
                      onChange={(e) => setAdvancedJsonValue(e.target.value)}
                      spellCheck={false}
                      className="h-[620px] w-full rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-xs text-white outline-none transition focus:border-cyan-300/40"
                    />
                    <button
                      onClick={() => {
                        try {
                          const parsed = JSON.parse(advancedJsonValue) as ProductPageContent;
                          if (parsed.slug !== selectedSlug) {
                            setToast("Slug in JSON must match selected product.");
                            return;
                          }
                          setDraft(parsed);
                          setToast("JSON applied to form. Click Save to persist.");
                        } catch {
                          setToast("Invalid JSON.");
                        }
                      }}
                      className="mt-3 rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/80 hover:text-white"
                    >
                      Apply JSON to form
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4 flex flex-wrap gap-2 border-b border-white/10 pb-4">
                      {EDIT_TABS.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={[
                              "rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.14em] transition",
                              isActive
                                ? "border-cyan-300/40 bg-cyan-400/12 text-cyan-100"
                                : "border-white/15 bg-black/40 text-white/65 hover:text-white",
                            ].join(" ")}
                          >
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>

                    {activeTab === "basic" ? (
                    <section className="rounded-xl border border-white/10 bg-black/30 p-4">
                      <h2 className="text-sm font-semibold text-white">Basic Info</h2>
                      <div className="mt-3 grid gap-3 md:grid-cols-2">
                        <LabeledInput
                          label="Slug"
                          value={draft.slug}
                          disabled
                          onChange={() => undefined}
                          note="Slug is locked from this editor."
                        />
                        <LabeledInput
                          label="Status"
                          value={draft.status}
                          onChange={(v) => setField("status", v as ProductPageContent["status"])}
                          asSelect
                          options={[
                            { value: "live", label: "live" },
                            { value: "coming-soon", label: "coming-soon" },
                          ]}
                        />
                        <LabeledInput
                          label="Name"
                          value={draft.name}
                          onChange={(v) => setField("name", v)}
                        />
                        <LabeledInput
                          label="Category"
                          value={draft.category}
                          onChange={(v) => setField("category", v)}
                        />
                      </div>
                      <div className="mt-3">
                        <LabeledTextarea
                          label="Short Description"
                          value={draft.shortDescription}
                          onChange={(v) => setField("shortDescription", v)}
                        />
                      </div>
                    </section>
                    ) : null}

                    {activeTab === "hero" ? (
                    <section className="rounded-xl border border-white/10 bg-black/30 p-4">
                      <h2 className="text-sm font-semibold text-white">Hero</h2>
                      <div className="mt-3 grid gap-3 md:grid-cols-2">
                        <LabeledInput
                          label="Headline"
                          value={draft.hero.headline}
                          onChange={(v) => setField("hero", { ...draft.hero, headline: v })}
                        />
                        <LabeledTextarea
                          label="Supporting text"
                          value={draft.hero.supportingText}
                          onChange={(v) => setField("hero", { ...draft.hero, supportingText: v })}
                        />
                        <LabeledInput
                          label="Primary CTA label"
                          value={draft.hero.primaryCtaLabel}
                          onChange={(v) => setField("hero", { ...draft.hero, primaryCtaLabel: v })}
                        />
                        <LabeledInput
                          label="Primary CTA href"
                          value={draft.hero.primaryCtaHref}
                          onChange={(v) => setField("hero", { ...draft.hero, primaryCtaHref: v })}
                        />
                        <LabeledInput
                          label="Secondary CTA label"
                          value={draft.hero.secondaryCtaLabel}
                          onChange={(v) => setField("hero", { ...draft.hero, secondaryCtaLabel: v })}
                        />
                        <LabeledInput
                          label="Secondary CTA href"
                          value={draft.hero.secondaryCtaHref}
                          onChange={(v) => setField("hero", { ...draft.hero, secondaryCtaHref: v })}
                        />
                      </div>
                    </section>
                    ) : null}

                    {activeTab === "value" ? (
                    <section className="rounded-xl border border-white/10 bg-black/30 p-4">
                      <h2 className="text-sm font-semibold text-white">Value & Audience</h2>
                      <div className="mt-3 grid gap-3 md:grid-cols-2">
                        <LabeledTextarea
                          label="Value points (one per line)"
                          value={toLines(draft.valuePoints)}
                          onChange={(v) => setField("valuePoints", fromLines(v))}
                        />
                        <LabeledTextarea
                          label="Audience cards (one per line)"
                          value={toLines(draft.audiences)}
                          onChange={(v) => setField("audiences", fromLines(v))}
                        />
                      </div>
                    </section>
                    ) : null}

                    {activeTab === "preview" ? (
                    <section className="rounded-xl border border-white/10 bg-black/30 p-4">
                      <h2 className="text-sm font-semibold text-white">Preview Blocks</h2>
                      <p className="mt-1 text-xs text-white/55">
                        Upload an image for each block. If no image is uploaded, placeholder text is shown.
                      </p>
                      <ArrayEditor
                        items={draft.previews}
                        onAdd={() => setField("previews", [...draft.previews, emptyPreview()])}
                        onRemove={(idx) =>
                          setField(
                            "previews",
                            draft.previews.filter((_, i) => i !== idx)
                          )
                        }
                        renderItem={(item, idx) => (
                          <div className="grid gap-2 md:grid-cols-2">
                            <LabeledInput
                              label="Title"
                              value={item.title}
                              onChange={(v) =>
                                setField(
                                  "previews",
                                  draft.previews.map((x, i) => (i === idx ? { ...x, title: v } : x))
                                )
                              }
                            />
                            <LabeledInput
                              label="Description"
                              value={item.description}
                              onChange={(v) =>
                                setField(
                                  "previews",
                                  draft.previews.map((x, i) =>
                                    i === idx ? { ...x, description: v } : x
                                  )
                                )
                              }
                            />
                            <LabeledInput
                              label="Image URL"
                              value={item.imageUrl ?? ""}
                              onChange={() => undefined}
                              disabled
                              note="Auto-filled after upload."
                            />
                            <LabeledInput
                              label="Placeholder text"
                              value={item.imagePlaceholder}
                              onChange={(v) =>
                                setField(
                                  "previews",
                                  draft.previews.map((x, i) =>
                                    i === idx ? { ...x, imagePlaceholder: v } : x
                                  )
                                )
                              }
                            />
                            <div className="md:col-span-2">
                              <label className="mb-2 block text-xs uppercase tracking-[0.12em] text-white/55">
                                Upload image
                              </label>
                              <div className="flex flex-wrap items-center gap-2">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0] ?? null;
                                    setPreviewFiles((prev) => ({ ...prev, [idx]: file }));
                                  }}
                                  className="w-full max-w-sm rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white file:mr-3 file:rounded-lg file:border-0 file:bg-cyan-400 file:px-3 file:py-1 file:text-xs file:font-medium file:text-black"
                                />
                                <button
                                  onClick={async () => {
                                    const file = previewFiles[idx];
                                    if (!file) {
                                      setToast("Pick an image first.");
                                      return;
                                    }
                                    if (!selectedSlug) {
                                      setToast("Select a product first.");
                                      return;
                                    }

                                    setUploadingPreviewIndex(idx);
                                    try {
                                      const url = await uploadProductPreviewImage(selectedSlug, idx, file);
                                      setField(
                                        "previews",
                                        draft.previews.map((x, i) =>
                                          i === idx ? { ...x, imageUrl: url } : x
                                        )
                                      );
                                      setToast("Image uploaded. Click Save to persist the product config.");
                                    } catch (e) {
                                      setToast(e instanceof Error ? e.message : "Upload failed.");
                                    } finally {
                                      setUploadingPreviewIndex(null);
                                    }
                                  }}
                                  disabled={uploadingPreviewIndex === idx}
                                  className="rounded-xl border border-cyan-300/30 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-100 hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                  {uploadingPreviewIndex === idx ? "Uploading..." : "Upload"}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      />
                    </section>
                    ) : null}

                    {activeTab === "features" ? (
                    <section className="rounded-xl border border-white/10 bg-black/30 p-4">
                      <h2 className="text-sm font-semibold text-white">Features</h2>
                      <ArrayEditor
                        items={draft.features}
                        onAdd={() => setField("features", [...draft.features, emptyFeature()])}
                        onRemove={(idx) =>
                          setField(
                            "features",
                            draft.features.filter((_, i) => i !== idx)
                          )
                        }
                        renderItem={(item, idx) => (
                          <div className="grid gap-2 md:grid-cols-2">
                            <LabeledInput
                              label="Feature title"
                              value={item.title}
                              onChange={(v) =>
                                setField(
                                  "features",
                                  draft.features.map((x, i) => (i === idx ? { ...x, title: v } : x))
                                )
                              }
                            />
                            <LabeledInput
                              label="Feature description"
                              value={item.description}
                              onChange={(v) =>
                                setField(
                                  "features",
                                  draft.features.map((x, i) =>
                                    i === idx ? { ...x, description: v } : x
                                  )
                                )
                              }
                            />
                          </div>
                        )}
                      />
                    </section>
                    ) : null}

                    {activeTab === "steps" ? (
                    <section className="rounded-xl border border-white/10 bg-black/30 p-4">
                      <h2 className="text-sm font-semibold text-white">How It Works</h2>
                      <ArrayEditor
                        items={draft.steps}
                        onAdd={() => setField("steps", [...draft.steps, emptyStep()])}
                        onRemove={(idx) =>
                          setField(
                            "steps",
                            draft.steps.filter((_, i) => i !== idx)
                          )
                        }
                        renderItem={(item, idx) => (
                          <div className="grid gap-2 md:grid-cols-2">
                            <LabeledInput
                              label="Step title"
                              value={item.title}
                              onChange={(v) =>
                                setField(
                                  "steps",
                                  draft.steps.map((x, i) => (i === idx ? { ...x, title: v } : x))
                                )
                              }
                            />
                            <LabeledInput
                              label="Step description"
                              value={item.description}
                              onChange={(v) =>
                                setField(
                                  "steps",
                                  draft.steps.map((x, i) =>
                                    i === idx ? { ...x, description: v } : x
                                  )
                                )
                              }
                            />
                          </div>
                        )}
                      />
                    </section>
                    ) : null}

                    {activeTab === "pricing" ? (
                    <section className="rounded-xl border border-white/10 bg-black/30 p-4">
                      <h2 className="text-sm font-semibold text-white">Pricing Tiers</h2>
                      <ArrayEditor
                        items={draft.pricing}
                        onAdd={() => setField("pricing", [...draft.pricing, emptyTier()])}
                        onRemove={(idx) =>
                          setField(
                            "pricing",
                            draft.pricing.filter((_, i) => i !== idx)
                          )
                        }
                        renderItem={(item, idx) => (
                          <div className="grid gap-2 md:grid-cols-2">
                            <LabeledInput
                              label="Tier name"
                              value={item.name}
                              onChange={(v) =>
                                setField(
                                  "pricing",
                                  draft.pricing.map((x, i) => (i === idx ? { ...x, name: v } : x))
                                )
                              }
                            />
                            <LabeledInput
                              label="Price label"
                              value={item.priceLabel}
                              onChange={(v) =>
                                setField(
                                  "pricing",
                                  draft.pricing.map((x, i) =>
                                    i === idx ? { ...x, priceLabel: v } : x
                                  )
                                )
                              }
                            />
                            <LabeledTextarea
                              label="Description"
                              value={item.description}
                              onChange={(v) =>
                                setField(
                                  "pricing",
                                  draft.pricing.map((x, i) =>
                                    i === idx ? { ...x, description: v } : x
                                  )
                                )
                              }
                            />
                            <LabeledTextarea
                              label="Highlights (one per line)"
                              value={toLines(item.highlights)}
                              onChange={(v) =>
                                setField(
                                  "pricing",
                                  draft.pricing.map((x, i) =>
                                    i === idx ? { ...x, highlights: fromLines(v) } : x
                                  )
                                )
                              }
                            />
                          </div>
                        )}
                      />
                    </section>
                    ) : null}

                    {activeTab === "caseStudy" ? (
                    <section className="rounded-xl border border-white/10 bg-black/30 p-4">
                      <h2 className="text-sm font-semibold text-white">Live Example / Case Study</h2>
                      <div className="mt-3">
                        <label className="mb-2 block text-sm text-white/80">
                          <input
                            type="checkbox"
                            checked={Boolean(draft.caseStudy)}
                            onChange={(e) => setField("caseStudy", e.target.checked ? {
                              title: "",
                              summary: "",
                              bullets: [],
                              ctaLabel: "",
                              ctaHref: "",
                            } : undefined)}
                            className="mr-2"
                          />
                          Enable case study section
                        </label>
                        {draft.caseStudy ? (
                          <div className="grid gap-2 md:grid-cols-2">
                            <LabeledInput
                              label="Case study title"
                              value={draft.caseStudy.title}
                              onChange={(v) =>
                                setField("caseStudy", { ...draft.caseStudy!, title: v })
                              }
                            />
                            <LabeledInput
                              label="CTA label"
                              value={draft.caseStudy.ctaLabel}
                              onChange={(v) =>
                                setField("caseStudy", { ...draft.caseStudy!, ctaLabel: v })
                              }
                            />
                            <LabeledInput
                              label="CTA href"
                              value={draft.caseStudy.ctaHref}
                              onChange={(v) =>
                                setField("caseStudy", { ...draft.caseStudy!, ctaHref: v })
                              }
                            />
                            <LabeledTextarea
                              label="Summary"
                              value={draft.caseStudy.summary}
                              onChange={(v) =>
                                setField("caseStudy", { ...draft.caseStudy!, summary: v })
                              }
                            />
                            <LabeledTextarea
                              label="Bullets (one per line)"
                              value={toLines(draft.caseStudy.bullets)}
                              onChange={(v) =>
                                setField("caseStudy", {
                                  ...draft.caseStudy!,
                                  bullets: fromLines(v),
                                })
                              }
                            />
                          </div>
                        ) : null}
                      </div>
                    </section>
                    ) : null}

                    {activeTab === "faq" ? (
                    <section className="rounded-xl border border-white/10 bg-black/30 p-4">
                      <h2 className="text-sm font-semibold text-white">FAQ</h2>
                      <ArrayEditor
                        items={draft.faqs}
                        onAdd={() => setField("faqs", [...draft.faqs, emptyFaq()])}
                        onRemove={(idx) =>
                          setField(
                            "faqs",
                            draft.faqs.filter((_, i) => i !== idx)
                          )
                        }
                        renderItem={(item, idx) => (
                          <div className="grid gap-2 md:grid-cols-2">
                            <LabeledInput
                              label="Question"
                              value={item.question}
                              onChange={(v) =>
                                setField(
                                  "faqs",
                                  draft.faqs.map((x, i) => (i === idx ? { ...x, question: v } : x))
                                )
                              }
                            />
                            <LabeledTextarea
                              label="Answer"
                              value={item.answer}
                              onChange={(v) =>
                                setField(
                                  "faqs",
                                  draft.faqs.map((x, i) => (i === idx ? { ...x, answer: v } : x))
                                )
                              }
                            />
                          </div>
                        )}
                      />
                    </section>
                    ) : null}
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      )}
    </AdminGuard>
  );
}

function LabeledInput(props: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  note?: string;
  asSelect?: boolean;
  options?: Array<{ value: string; label: string }>;
}) {
  const { label, value, onChange, disabled, note, asSelect, options } = props;
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.12em] text-white/55">{label}</label>
      {asSelect ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300/40"
        >
          {(options ?? []).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300/40 disabled:opacity-60"
        />
      )}
      {note ? <p className="mt-1 text-xs text-white/45">{note}</p> : null}
    </div>
  );
}

function LabeledTextarea(props: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const { label, value, onChange } = props;
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.12em] text-white/55">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300/40"
      />
    </div>
  );
}

function ArrayEditor<T>(props: {
  items: T[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  renderItem: (item: T, index: number) => ReactNode;
}) {
  const { items, onAdd, onRemove, renderItem } = props;
  const useScrollContainer = items.length > 5;
  return (
    <div className="mt-3 space-y-3">
      <div
        className={
          useScrollContainer
            ? "max-h-[560px] space-y-3 overflow-y-auto pr-1"
            : "space-y-3"
        }
      >
        {items.map((item, idx) => (
          <div key={idx} className="rounded-xl border border-white/10 bg-black/40 p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.12em] text-white/45">Item {idx + 1}</p>
              <button
                onClick={() => onRemove(idx)}
                className="rounded-lg border border-red-400/40 px-2 py-1 text-xs text-red-200 hover:bg-red-500/10"
              >
                Remove
              </button>
            </div>
            {renderItem(item, idx)}
          </div>
        ))}
      </div>
      <button
        onClick={onAdd}
        className="rounded-xl border border-white/15 bg-white/[0.03] px-3 py-2 text-sm text-white/80 hover:text-white"
      >
        + Add item
      </button>
    </div>
  );
}
