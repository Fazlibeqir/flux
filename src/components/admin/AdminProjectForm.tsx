"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PROJECT_CATEGORIES, formatTags, parseTags, slugifyTitle } from "@/lib/constants/projects";
import {
  createProject,
  deleteProject,
  getNextSortOrder,
  updateProject,
} from "@/lib/data/projects.client";
import {
  uploadProjectLogo,
  uploadProjectPreview,
  previewPublicUrl,
  logoPublicUrl,
} from "@/lib/storage/projects.client";
import type { Project, ProjectCreateInput, ProjectStatus } from "@/lib/types/project";

type FormState = ProjectCreateInput;

const emptyForm = (): FormState => ({
  title: "",
  slug: null,
  category: PROJECT_CATEGORIES[0],
  short_description: null,
  problem: null,
  built: null,
  result: null,
  tags: null,
  url: null,
  is_featured: true,
  sort_order: 0,
  status: "published",
});

function projectToForm(p: Project): FormState {
  return {
    title: p.title,
    slug: p.slug,
    category: p.category,
    short_description: p.short_description,
    problem: p.problem,
    built: p.built,
    result: p.result,
    tags: p.tags,
    url: p.url,
    is_featured: p.is_featured,
    sort_order: p.sort_order,
    status: (p.status as ProjectStatus) || "published",
  };
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/80">{label}</label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-white/40">{hint}</p>}
    </div>
  );
}

function FormSection({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <h2 className="text-base font-semibold text-white">{title}</h2>
      {description && <p className="mt-1 text-sm text-white/55">{description}</p>}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function WhereItAppears({
  status,
  isFeatured,
  onStatusChange,
  onFeaturedChange,
}: {
  status: ProjectStatus;
  isFeatured: boolean;
  onStatusChange: (s: ProjectStatus) => void;
  onFeaturedChange: (v: boolean) => void;
}) {
  const published = status === "published";

  return (
    <section className="rounded-2xl border border-cyan-400/35 bg-gradient-to-br from-cyan-400/[0.08] to-white/[0.03] p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-300">Where it appears</p>
          <h2 className="mt-1 text-lg font-semibold text-white">Homepage &amp; portfolio</h2>
          <p className="mt-1 max-w-xl text-sm text-white/60">
            Published projects show on <span className="text-white/85">/work</span>. Featured projects are
            prioritized in the homepage &ldquo;Selected work&rdquo; section (up to 4).
          </p>
        </div>
        <ul className="flex flex-wrap gap-2 text-xs">
          <li
            className={`rounded-full border px-3 py-1.5 ${
              published ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200" : "border-white/15 text-white/45"
            }`}
          >
            /work {published ? "✓" : "— draft hidden"}
          </li>
          <li
            className={`rounded-full border px-3 py-1.5 ${
              published ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200" : "border-white/15 text-white/45"
            }`}
          >
            Homepage {published ? (isFeatured ? "✓ featured" : "✓ listed") : "—"}
          </li>
        </ul>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Status *" hint="Draft projects are hidden from the public site.">
          <select
            className="input-select"
            value={status}
            onChange={(e) => onStatusChange(e.target.value as ProjectStatus)}
          >
            <option value="published">Published — visible on site</option>
            <option value="draft">Draft — admin only</option>
          </select>
        </Field>

        <div className="flex flex-col justify-end">
          <p className="mb-2 block text-sm text-white/80">Homepage priority</p>
          <button
            type="button"
            role="switch"
            aria-checked={isFeatured ? "true" : "false"}
            aria-label="Featured on homepage"
            disabled={!published}
            onClick={() => published && onFeaturedChange(!isFeatured)}
            className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition ${
              !published
                ? "cursor-not-allowed border-white/10 bg-white/[0.02] opacity-50"
                : isFeatured
                  ? "border-cyan-400/50 bg-cyan-400/15"
                  : "border-white/15 bg-white/[0.04] hover:border-white/25"
            }`}
          >
            <span>
              <span className="block text-sm font-medium text-white">Featured on homepage</span>
              <span className="mt-0.5 block text-xs text-white/50">
                {published
                  ? isFeatured
                    ? "Shows first in Selected work"
                    : "Still on homepage if there’s room"
                  : "Publish first to enable"}
              </span>
            </span>
            <span
              className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                isFeatured && published ? "bg-cyan-400" : "bg-white/20"
              }`}
            >
              <span
                className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition ${
                  isFeatured && published ? "left-[22px]" : "left-0.5"
                }`}
              />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default function AdminProjectForm({
  mode,
  project,
  onSaved,
  setToast,
}: {
  mode: "create" | "edit";
  project?: Project;
  onSaved: () => void;
  setToast: (m: string) => void;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(() => !!project?.slug);
  const [form, setForm] = useState<FormState>(project ? projectToForm(project) : emptyForm());
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null);

  useEffect(() => {
    if (project) {
      setForm(projectToForm(project));
      setSlugTouched(!!project.slug);
    }
  }, [project]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const buildPayload = (): ProjectCreateInput => {
    const title = form.title.trim();
    const category = form.category.trim();
    const slug =
      (form.slug ?? "").trim() ||
      slugifyTitle(title) ||
      null;

    return {
      title,
      slug,
      category,
      short_description: (form.short_description ?? "").trim() || null,
      problem: (form.problem ?? "").trim() || null,
      built: (form.built ?? "").trim() || null,
      result: (form.result ?? "").trim() || null,
      tags: (form.tags ?? "").trim() || null,
      url: (form.url ?? "").trim() || null,
      is_featured: form.is_featured,
      sort_order: mode === "edit" && project ? project.sort_order : 0,
      status: form.status,
    };
  };

  const save = async () => {
    if (saving) return;
    const payload = buildPayload();
    if (!payload.title) {
      setToast("Title is required.");
      return;
    }
    if (!payload.category) {
      setToast("Category is required.");
      return;
    }

    setSaving(true);
    let createdProjectId: string | null = null;
    try {
      let projectId = project?.id;

      if (mode === "create") {
        const created = await createProject({
          ...payload,
          sort_order: await getNextSortOrder(),
        });
        projectId = created.id;
        createdProjectId = created.id;
        setToast("Project created.");
      } else if (projectId) {
        await updateProject(projectId, payload);
        setToast("Project saved.");
      }

      if (projectId) {
        if (logoFile) await uploadProjectLogo(projectId, logoFile);
        if (previewFile) await uploadProjectPreview(projectId, previewFile);
      }

      onSaved();
      if (mode === "create" && projectId) {
        router.replace(`/admin/projects/${projectId}`);
      }
    } catch (e) {
      if (createdProjectId) {
        try {
          await deleteProject(createdProjectId);
        } catch (rollbackError) {
          console.error("project rollback failed:", rollbackError);
        }
      }
      setToast(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const previewUrl = project ? previewPublicUrl(project.preview_path) : null;
  const logoUrl = project ? logoPublicUrl(project.logo_path) : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-white/45">
            {mode === "create" ? "New project" : "Edit project"}
          </p>
          <h1 className="mt-1 text-2xl font-semibold">
            {mode === "create" ? "Add project" : form.title || "Edit project"}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/projects"
            className="rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/80 hover:text-white"
          >
            Back to list
          </Link>
          {project?.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/80 hover:text-white"
            >
              Preview live
            </a>
          )}
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-medium text-black hover:bg-cyan-300 disabled:opacity-60"
          >
            {saving ? "Saving…" : mode === "create" ? "Create project" : "Save changes"}
          </button>
        </div>
      </div>

      <WhereItAppears
        status={form.status}
        isFeatured={form.is_featured}
        onStatusChange={(s) => set("status", s)}
        onFeaturedChange={(v) => set("is_featured", v)}
      />

      <FormSection title="Basic info" description="What visitors see on cards and listings.">
        <div className="sm:col-span-2">
          <Field label="Title *">
            <input
              className="input"
              value={form.title}
              onChange={(e) => {
                const title = e.target.value;
                set("title", title);
                if (!slugTouched) set("slug", slugifyTitle(title) || null);
              }}
              placeholder="e.g. White Angel"
            />
          </Field>
        </div>

        <Field label="Slug" hint="Used for future detail URLs. Auto-generated from title if empty.">
          <input
            className="input"
            value={form.slug ?? ""}
            onChange={(e) => {
              setSlugTouched(true);
              set("slug", e.target.value.trim() || null);
            }}
            placeholder="white-angel"
          />
        </Field>

        <Field label="Category *">
          <select
            className="input-select"
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
          >
            {PROJECT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field label="Short description" hint="Shown on project cards. Keep it to 1–2 sentences.">
            <textarea
              className="input min-h-[72px]"
              rows={2}
              value={form.short_description ?? ""}
              onChange={(e) => set("short_description", e.target.value)}
              placeholder="Brief summary for the portfolio grid…"
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Live URL">
            <input
              className="input"
              value={form.url ?? ""}
              onChange={(e) => set("url", e.target.value)}
              placeholder="https://…"
            />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Case study content" description="Optional depth for credibility.">
        <div className="sm:col-span-2">
          <Field label="Problem">
            <textarea
              className="input min-h-[80px]"
              rows={3}
              value={form.problem ?? ""}
              onChange={(e) => set("problem", e.target.value)}
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Built / solution">
            <textarea
              className="input min-h-[80px]"
              rows={3}
              value={form.built ?? ""}
              onChange={(e) => set("built", e.target.value)}
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Result">
            <textarea
              className="input min-h-[80px]"
              rows={3}
              value={form.result ?? ""}
              onChange={(e) => set("result", e.target.value)}
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Technologies / tags" hint="Comma-separated, e.g. Next.js, Supabase, Tailwind">
            <input
              className="input"
              value={form.tags ?? ""}
              onChange={(e) => set("tags", e.target.value)}
              onBlur={(e) => set("tags", formatTags(parseTags(e.target.value)))}
              placeholder="Next.js, TypeScript, Supabase"
            />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Media" description="Preview appears on public cards; logo powers the work section background.">
        <div className="sm:col-span-2">
          <Field label="Preview image">
            {previewUrl && !previewFile && (
              <div className="mb-3 overflow-hidden rounded-xl border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="" className="max-h-40 w-full object-cover" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="text-sm text-white/70"
              onChange={(e) => setPreviewFile(e.target.files?.[0] ?? null)}
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Logo image">
            {logoUrl && !logoFile && (
              <div className="mb-3 h-16 w-16 overflow-hidden rounded-xl border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logoUrl} alt="" className="h-full w-full object-cover" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="text-sm text-white/70"
              onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
            />
          </Field>
        </div>
      </FormSection>

    </div>
  );
}
