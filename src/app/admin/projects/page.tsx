"use client";

import { useEffect, useMemo, useState } from "react";

import AdminGuard from "@/components/admin/AdminGuard";
import Toast from "@/components/admin/Toast";
import ProjectsToolbar from "@/components/admin/projects/ProjectsToolbar";
import ProjectCreateForm from "@/components/admin/projects/ProjectCreateForm";
import ProjectList from "@/components/admin/projects/ProjectList";

import type { Project, SortMode } from "@/lib/types/project";
import { deleteProject, listProjects, signOutAndRedirect, toggleFeatured } from "@/lib/data/projects.client";
import { uploadProjectLogo, uploadProjectPreview } from "@/lib/storage/projects.client";

export default function AdminProjectsPage() {
  const [toast, setToast] = useState<string | null>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("sort_order");

  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  const refresh = async () => {
    try {
      const data = await listProjects(sortMode);
      setProjects(data);
    } catch (e) {
      setToast(e instanceof Error ? e.message : "Failed to load projects.");
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;

    return projects.filter((p) => {
      const hay = [p.title, p.category, p.problem ?? "", p.built ?? "", p.result ?? "", p.url ?? ""]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [projects, query]);

  return (
    <AdminGuard>
      {(sessionEmail) => (
        <main className="min-h-screen bg-black text-white">
          <div className="mx-auto max-w-6xl px-6 py-8">
            <Toast message={toast} onClear={() => setToast(null)} />

            {/* Controls */}
            <div className="mx-auto max-w-4xl p-6">
              <ProjectsToolbar
                query={query}
                setQuery={setQuery}
                sortMode={sortMode}
                setSortMode={setSortMode}
              />
            </div>

            {/* Session / actions */}
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
                    href="/admin/products"
                    className="rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/80 hover:text-white"
                  >
                    Products
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
                    {signingOut ? "Signing out…" : "Sign out"}
                  </button>
                </div>
              </div>
            </section>

            {/* Data load */}
            <AdminProjectsDataBootstrap sortMode={sortMode} refresh={refresh} setToast={setToast} />

            {/* Create */}
            <ProjectCreateForm
              onCreated={refresh}
              setToast={(m) => setToast(m)}
            />

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

              <ProjectList
                projects={filtered}
                uploadingId={uploadingId}
                onToggleFeatured={async (p) => {
                  try {
                    await toggleFeatured(p.id, !p.is_featured);
                    setToast(p.is_featured ? "Removed from featured." : "Marked as featured.");
                    await refresh();
                  } catch (e) {
                    setToast(e instanceof Error ? e.message : "Failed to update.");
                  }
                }}
                onUploadLogo={async (id, file) => {
                  setUploadingId(id);
                  try {
                    await uploadProjectLogo(id, file);
                    setToast("Logo uploaded.");
                    await refresh();
                  } catch (e) {
                    setToast(e instanceof Error ? e.message : "Upload failed.");
                  } finally {
                    setUploadingId(null);
                  }
                }}
                onUploadPreview={async (id, file) => {
                  setUploadingId(id);
                  try {
                    await uploadProjectPreview(id, file);
                    setToast("Preview uploaded.");
                    await refresh();
                  } catch (e) {
                    setToast(e instanceof Error ? e.message : "Upload failed.");
                  } finally {
                    setUploadingId(null);
                  }
                }}
                onDelete={async (id) => {
                  const ok = confirm("Delete this project? This cannot be undone.");
                  if (!ok) return;

                  try {
                    await deleteProject(id);
                    setToast("Project deleted.");
                    await refresh();
                  } catch (e) {
                    setToast(e instanceof Error ? e.message : "Delete failed.");
                  }
                }}
              />
            </section>
          </div>
        </main>
      )}
    </AdminGuard>
  );
}

/**
 * Keeps the main file clean while still loading data on mount + on sort change.
 */
function AdminProjectsDataBootstrap(props: {
  sortMode: SortMode;
  refresh: () => Promise<void>;
  setToast: (m: string) => void;
}) {
  const { sortMode, refresh, setToast } = props;

  useEffect(() => {
    refresh().catch((e) => setToast(e instanceof Error ? e.message : "Failed to load projects."));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortMode]);

  return null;
}