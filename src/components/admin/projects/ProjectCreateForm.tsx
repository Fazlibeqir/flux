"use client";

import { useState } from "react";
import type { ProjectCreateInput } from "@/lib/types/project";
import { createProject } from "@/lib/data/projects.client";
import { uploadProjectLogo, uploadProjectPreview } from "@/lib/storage/projects.client";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/80">{label}</label>
      {children}
    </div>
  );
}

export default function ProjectCreateForm(props: {
  onCreated: () => Promise<void>;
  setToast: (m: string) => void;
}) {
  const { onCreated, setToast } = props;

  const [creating, setCreating] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null);

  const [form, setForm] = useState<ProjectCreateInput>({
    title: "",
    category: "Web",
    problem: null,
    built: null,
    result: null,
    url: null,
    is_featured: true,
    sort_order: 100,
  });

  const addProject = async () => {
    if (creating) return;

    const title = form.title.trim();
    const category = form.category.trim();
    if (!title) return alert("Title is required.");
    if (!category) return alert("Category is required.");

    setCreating(true);
    try {
      const payload: ProjectCreateInput = {
        title,
        category,
        problem: (form.problem ?? "").trim() || null,
        built: (form.built ?? "").trim() || null,
        result: (form.result ?? "").trim() || null,
        url: (form.url ?? "").trim() || null,
        is_featured: form.is_featured,
        sort_order: Number.isFinite(form.sort_order) ? form.sort_order : 100,
      };

      const created = await createProject(payload);

      if (logoFile) await uploadProjectLogo(created.id, logoFile);
      if (previewFile) await uploadProjectPreview(created.id, previewFile);

      setForm({
        title: "",
        category: "Web",
        problem: null,
        built: null,
        result: null,
        url: null,
        is_featured: true,
        sort_order: 100,
      });
      setLogoFile(null);
      setPreviewFile(null);

      setToast("Project created.");
      await onCreated();
    } catch (e) {
      setToast(e instanceof Error ? e.message : "Failed to create project.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Add a project</h2>
          <p className="mt-1 text-sm text-white/60">
            Keep it short. Use Problem / Built / Result for better portfolio credibility.
          </p>
        </div>

        <button
          onClick={addProject}
          disabled={creating}
          className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-medium text-black transition hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {creating ? "Creating…" : "Add project"}
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Field label="Title *">
          <input
            className="input"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. Restaurant QR Menu"
          />
        </Field>

        <Field label="Category *">
          <input
            className="input"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            placeholder="Web / Mobile / Internal"
          />
        </Field>

        <Field label="Problem">
          <textarea
            className="input min-h-[44px]"
            rows={2}
            value={form.problem ?? ""}
            onChange={(e) => setForm({ ...form, problem: e.target.value })}
            placeholder="What was broken or missing?"
          />
        </Field>

        <Field label="Built">
          <textarea
            className="input min-h-[44px]"
            rows={2}
            value={form.built ?? ""}
            onChange={(e) => setForm({ ...form, built: e.target.value })}
            placeholder="What did you build/implement?"
          />
        </Field>

        <Field label="Result">
          <textarea
            className="input min-h-[44px]"
            rows={2}
            value={form.result ?? ""}
            onChange={(e) => setForm({ ...form, result: e.target.value })}
            placeholder="What improved? (speed, bookings, clarity, etc.)"
          />
        </Field>

        <Field label="URL (optional)">
          <input
            className="input"
            value={form.url ?? ""}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            placeholder="https://…"
          />
        </Field>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-white/80">Logo (optional)</label>
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-4 py-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
              className="text-sm text-white/70"
            />
            {logoFile && (
              <span className="text-xs text-white/60">
                Selected: <span className="text-white/80">{logoFile.name}</span>
              </span>
            )}
            {logoFile && (
              <button
                type="button"
                onClick={() => setLogoFile(null)}
                className="ml-auto rounded-lg border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs text-white/75 hover:text-white"
              >
                Remove
              </button>
            )}
          </div>
          <p className="mt-2 text-xs text-white/45">
            Uploading a logo here will automatically power the “Selected work” background animation.
          </p>
        </div>

        <Field label="Sort order">
          <input
            className="input"
            type="number"
            value={form.sort_order}
            onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value || 0) })}
          />
        </Field>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-white/80">Preview image (optional)</label>
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-4 py-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPreviewFile(e.target.files?.[0] ?? null)}
              className="text-sm text-white/70"
            />
            {previewFile && (
              <span className="text-xs text-white/60">
                Selected: <span className="text-white/80">{previewFile.name}</span>
              </span>
            )}
            {previewFile && (
              <button
                type="button"
                onClick={() => setPreviewFile(null)}
                className="ml-auto rounded-lg border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs text-white/75 hover:text-white"
              >
                Remove
              </button>
            )}
          </div>
          <p className="mt-2 text-xs text-white/45">
            This screenshot will be shown on the public “Selected work” card.
          </p>
        </div>

        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm text-white/80">
            <input
              type="checkbox"
              checked={form.is_featured}
              onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
            />
            Featured
          </label>
        </div>
      </div>
    </section>
  );
}