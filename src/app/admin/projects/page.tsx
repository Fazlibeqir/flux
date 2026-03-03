"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Project = {
    id: string;
    title: string;
    category: string;
    problem: string | null;
    built: string | null;
    result: string | null;
    url: string | null;
    logo_path: string | null;
    is_featured: boolean;
    sort_order: number;
    created_at?: string;
    preview_path: string | null;
};

const LOGO_BUCKET = "project-logos";
const PREVIEW_BUCKET = "project-previews";

function clsx(...v: Array<string | false | undefined>) {
    return v.filter(Boolean).join(" ");
}
const previewUrl = (preview_path: string | null) => {
    if (!preview_path) return null;
    const { data } = supabase.storage.from(PREVIEW_BUCKET).getPublicUrl(preview_path);
    return data.publicUrl;
};

export default function AdminProjectsPage() {
    const [sessionEmail, setSessionEmail] = useState<string | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [signingOut, setSigningOut] = useState(false);
    const [previewFile, setPreviewFile] = useState<File | null>(null);

    const [toast, setToast] = useState<string | null>(null);

    const [query, setQuery] = useState("");
    const [sortMode, setSortMode] = useState<"sort_order" | "newest">("sort_order");

    const [uploadingId, setUploadingId] = useState<string | null>(null);

    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [creating, setCreating] = useState(false);

    const [form, setForm] = useState({
        title: "",
        category: "Web",
        problem: "",
        built: "",
        result: "",
        url: "",
        is_featured: true,
        sort_order: 100,
    });

    useEffect(() => {
        (async () => {
            const { data } = await supabase.auth.getSession();
            setSessionEmail(data.session?.user?.email ?? null);
            setLoading(false);
        })();
    }, []);

    const refresh = async () => {
        const q = supabase.from("projects").select("*");

        if (sortMode === "sort_order") {
            q.order("sort_order", { ascending: true }).order("created_at", { ascending: false });
        } else {
            q.order("created_at", { ascending: false }).order("sort_order", { ascending: true });
        }

        const { data, error } = await q;
        if (error) {
            setToast(error.message);
            return;
        }
        setProjects((data ?? []) as Project[]);
    };

    useEffect(() => {
        if (!sessionEmail) return;
        refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionEmail, sortMode]);

    const canUseAdmin = Boolean(sessionEmail);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return projects;
        return projects.filter((p) => {
            const hay = [
                p.title,
                p.category,
                p.problem ?? "",
                p.built ?? "",
                p.result ?? "",
                p.url ?? "",
            ]
                .join(" ")
                .toLowerCase();
            return hay.includes(q);
        });
    }, [projects, query]);

    const logoUrl = (logo_path: string | null) => {
        if (!logo_path) return null;
        const { data } = supabase.storage.from(LOGO_BUCKET).getPublicUrl(logo_path);
        return data.publicUrl;
    };

    const signOut = async () => {
        if (signingOut) return;

        setSigningOut(true);
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                setToast(error.message);
                setSigningOut(false);
                return;
            }

            // Clear local state (prevents UI flashing old data)
            setSessionEmail(null);
            setProjects([]);
            setQuery("");
            setLogoFile(null);

            // Redirect
            window.location.replace("/admin/login");
        } catch (e) {
            console.error(e);
            setToast("Sign out failed. Check console.");
            setSigningOut(false);
        }
    };

    const deleteProject = async (id: string) => {
        const ok = confirm("Delete this project? This cannot be undone.");
        if (!ok) return;

        const { error } = await supabase.from("projects").delete().eq("id", id);
        if (error) return setToast(error.message);

        setToast("Project deleted.");
        refresh();
    };

    const addProject = async () => {
        if (creating) return;

        const title = form.title.trim();
        const category = form.category.trim();
        if (!title) return alert("Title is required.");
        if (!category) return alert("Category is required.");

        setCreating(true);

        const payload = {
            title,
            category,
            problem: form.problem.trim() || null,
            built: form.built.trim() || null,
            result: form.result.trim() || null,
            url: form.url.trim() || null,
            is_featured: form.is_featured,
            sort_order: Number.isFinite(form.sort_order) ? form.sort_order : 100,
        };

        // IMPORTANT: return the inserted row so we get its id
        const { data: created, error } = await supabase
            .from("projects")
            .insert(payload)
            .select("id")
            .single();

        if (error || !created?.id) {
            setCreating(false);
            return alert(error?.message ?? "Failed to create project.");
        }

        // Upload logo if provided
        // Upload logo if provided (reuse the same reliable function)
        if (logoFile) {
            await uploadLogo(created.id, logoFile);
        }
        if (previewFile) {
            await uploadPreview(created.id, previewFile);
        }

        // reset
        setForm({
            title: "",
            category: "Web",
            problem: "",
            built: "",
            result: "",
            url: "",
            is_featured: true,
            sort_order: 100,
        });
        setLogoFile(null);
        setPreviewFile(null);

        setCreating(false);
        refresh();
    };

    const toggleFeatured = async (p: Project) => {
        const { error } = await supabase
            .from("projects")
            .update({ is_featured: !p.is_featured })
            .eq("id", p.id);

        if (error) return setToast(error.message);
        setToast(p.is_featured ? "Removed from featured." : "Marked as featured.");
        refresh();
    };
    const uploadPreview = async (projectId: string, file: File) => {
        if (!file || file.size === 0) {
            setToast("Pick a valid image.");
            return;
        }

        setUploadingId(projectId);

        const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        const path = `${projectId}/preview.${ext}`;

        try {
            // upsert true is fine if your storage policies allow update
            const { error: upErr } = await supabase.storage
                .from(PREVIEW_BUCKET)
                .upload(path, file, { upsert: true });

            if (upErr) {
                setUploadingId(null);
                setToast("PREVIEW UPLOAD FAILED: " + upErr.message);
                return;
            }

            const { error: dbErr } = await supabase
                .from("projects")
                .update({ preview_path: path })
                .eq("id", projectId);

            setUploadingId(null);

            if (dbErr) {
                setToast("DB UPDATE FAILED: " + dbErr.message);
                return;
            }

            setToast("Preview uploaded.");
            refresh();
        } catch (e) {
            console.error(e);
            setUploadingId(null);
            setToast("Preview upload failed (unexpected).");
        }
    };

    const uploadLogo = async (projectId: string, file: File) => {
        if (!file) return;
        if (file.size === 0) {
            setToast("File is empty.");
            return;
        }

        setUploadingId(projectId);

        const ext = (file.name.split(".").pop() || "png").toLowerCase();
        const path = `${projectId}/logo.${ext}`;

        try {
            // Remove common previous filenames so upload never conflicts
            const removePaths = [
                `${projectId}/logo.png`,
                `${projectId}/logo.jpg`,
                `${projectId}/logo.jpeg`,
                `${projectId}/logo.webp`,
                `${projectId}/logo.svg`,
            ];

            const { error: rmErr } = await supabase.storage
                .from(LOGO_BUCKET)
                .remove(removePaths);

            // rmErr is not fatal (file might not exist), so we only log it
            if (rmErr) console.warn("remove error (ignored):", rmErr.message);

            // Upload WITHOUT upsert/contentType (avoids 400)
            const { error: upErr } = await supabase.storage
                .from(LOGO_BUCKET)
                .upload(path, file);

            if (upErr) {
                console.error("upload error:", upErr);
                setToast("UPLOAD FAILED: " + upErr.message);
                setUploadingId(null);
                return;
            }

            // Update DB with logo_path
            const { error: dbErr } = await supabase
                .from("projects")
                .update({ logo_path: path })
                .eq("id", projectId);

            if (dbErr) {
                console.error("db update error:", dbErr);
                setToast("DB UPDATE FAILED: " + dbErr.message);
                setUploadingId(null);
                return;
            }

            setToast("Logo uploaded.");
            setUploadingId(null);
            refresh();
        } catch (e) {
            console.error(e);
            setToast("Upload failed (unexpected). Check console.");
            setUploadingId(null);
        }
    };

    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 2600);
        return () => clearTimeout(t);
    }, [toast]);

    if (loading) {
        return (
            <main className="min-h-screen bg-black text-white p-8">
                Loading…
            </main>
        );
    }

    if (!canUseAdmin) {
        return (
            <main className="min-h-screen bg-black text-white p-8">
                <h1 className="text-2xl font-semibold">Projects Admin</h1>
                <p className="mt-3 text-white/70">You need to sign in first.</p>
                <a
                    href="/admin/login"
                    className="mt-6 inline-flex rounded-xl bg-cyan-400 px-4 py-2 text-sm font-medium text-black"
                >
                    Go to login →
                </a>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white">
            {/* Top bar */}
            <div className="sticky  z-20 border-b border-white/10 bg-black/60 backdrop-blur">

            </div>


            <div className="mx-auto max-w-6xl px-6 py-8">
                {/* Toast */}
                {toast && (
                    <div className="mb-6 rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-100">
                        {toast}
                    </div>
                )}
                <div className="mx-auto max-w-4xl p-6">


                    {/* Controls */}
                    <div className="mt-4 grid gap-3 md:grid-cols-[1fr_220px]">
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search projects…"
                            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/40"
                        />

                        <select
                            value={sortMode}
                            onChange={(e) => setSortMode(e.target.value as any)}
                            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                        >
                            <option value="sort_order">Sort: sort_order</option>
                            <option value="newest">Sort: newest</option>
                        </select>
                    </div>
                </div>
                {/* Session / account actions (in page, not sticky bar) */}
                <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <p className="text-xs uppercase tracking-[0.16em] text-white/50">
                                Admin session
                            </p>
                            <p className="mt-1 text-sm text-white/75">
                                Signed in as <span className="text-white">{sessionEmail}</span>
                            </p>
                        </div>

                        <button
                            onClick={signOut}
                            disabled={signingOut}
                            className="rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/80 hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {signingOut ? "Signing out…" : "Sign out"}
                        </button>
                    </div>
                </section>

                {/* Add project */}
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
                                value={form.problem}
                                onChange={(e) => setForm({ ...form, problem: e.target.value })}
                                placeholder="What was broken or missing?"
                            />
                        </Field>

                        <Field label="Built">
                            <textarea
                                className="input min-h-[44px]"
                                rows={2}
                                value={form.built}
                                onChange={(e) => setForm({ ...form, built: e.target.value })}
                                placeholder="What did you build/implement?"
                            />
                        </Field>

                        <Field label="Result">
                            <textarea
                                className="input min-h-[44px]"
                                rows={2}
                                value={form.result}
                                onChange={(e) => setForm({ ...form, result: e.target.value })}
                                placeholder="What improved? (speed, bookings, clarity, etc.)"
                            />
                        </Field>

                        <Field label="URL (optional)">
                            <input
                                className="input"
                                value={form.url}
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

                {/* List */}
                <section className="mt-8">
                    <div className="flex items-end justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-semibold">Projects</h2>
                            <p className="text-sm text-white/55">
                                Showing <span className="text-white/80">{filtered.length}</span> projects
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        {filtered.map((p) => {
                            const url = logoUrl(p.logo_path);
                            return (
                                <div
                                    key={p.id}
                                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-300/20"
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Logo preview */}
                                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                                            {url ? (
                                                <Image
                                                    src={url}
                                                    alt=""
                                                    fill
                                                    sizes="56px"
                                                    className="object-cover opacity-90"
                                                />
                                            ) : (
                                                <div className="grid h-full w-full place-items-center text-xs text-white/35">
                                                    No logo
                                                </div>
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs uppercase tracking-[0.16em] text-cyan-300/90">
                                                {p.category}
                                            </p>
                                            <h3 className="mt-1 truncate text-lg font-semibold">{p.title}</h3>

                                            <div className="mt-2 space-y-1 text-sm text-white/60">
                                                {p.problem && <p><span className="text-white/75">Problem:</span> {p.problem}</p>}
                                                {p.built && <p><span className="text-white/75">Built:</span> {p.built}</p>}
                                                {p.result && <p><span className="text-white/75">Result:</span> {p.result}</p>}
                                            </div>

                                            <div className="mt-4 flex flex-wrap items-center gap-2">
                                                <button
                                                    onClick={() => toggleFeatured(p)}
                                                    className={clsx(
                                                        "rounded-xl border px-3 py-2 text-sm transition",
                                                        p.is_featured
                                                            ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-100 hover:bg-cyan-300/15"
                                                            : "border-white/15 bg-white/[0.03] text-white/80 hover:text-white hover:border-cyan-300/20"
                                                    )}
                                                >
                                                    {p.is_featured ? "Featured" : "Not featured"}
                                                </button>

                                                <label className="rounded-xl border border-white/15 bg-white/[0.03] px-3 py-2 text-sm cursor-pointer text-white/80 hover:text-white">
                                                    {uploadingId === p.id ? "Uploading…" : "Upload logo"}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) uploadLogo(p.id, file);
                                                        }}
                                                    />
                                                </label>

                                                <label className="rounded-xl border border-white/15 bg-white/[0.03] px-3 py-2 text-sm cursor-pointer text-white/80 hover:text-white">
                                                    {uploadingId === p.id ? "Uploading…" : "Upload preview"}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) uploadPreview(p.id, file);
                                                        }}
                                                    />
                                                </label>

                                                {p.url && (
                                                    <a
                                                        href={p.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="rounded-xl border border-white/15 bg-white/[0.03] px-3 py-2 text-sm text-white/80 hover:text-white"
                                                    >
                                                        Open ↗
                                                    </a>
                                                )}

                                                <button
                                                    onClick={() => deleteProject(p.id)}
                                                    className="ml-auto rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200 hover:bg-red-500/15"
                                                >
                                                    Delete
                                                </button>
                                            </div>

                                            <p className="mt-3 text-xs text-white/35">
                                                sort_order: {p.sort_order} • logo_path: {p.logo_path ?? "none"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filtered.length === 0 && (
                        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-white/60">
                            No projects found.
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="mb-2 block text-sm text-white/80">{label}</label>
            {children}
        </div>
    );
}