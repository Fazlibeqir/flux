"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AdminPageWithToast } from "@/components/admin/AdminPageFrame";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import AdminProjectList from "@/components/admin/projects/AdminProjectList";
import { PROJECT_FILTER_CHIPS, type ProjectFilterId } from "@/lib/constants/projects";
import {
  deleteProject,
  listProjects,
  reorderProjects,
  toggleFeatured,
} from "@/lib/data/projects.client";
import type { Project, SortMode } from "@/lib/types/project";

export default function AdminProjectsPage() {
  return (
    <AdminPageWithToast>
      {({ setToast }) => <AdminProjectsContent setToast={setToast} />}
    </AdminPageWithToast>
  );
}

function AdminProjectsContent({ setToast }: { setToast: (m: string) => void }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("sort_order");
  const [categoryFilter, setCategoryFilter] = useState<ProjectFilterId>("all");
  const [reordering, setReordering] = useState(false);

  const canReorder =
    sortMode === "sort_order" && categoryFilter === "all" && !query.trim();

  const refresh = async () => {
    try {
      const data = await listProjects(sortMode);
      setProjects(data);
    } catch (e) {
      setToast(e instanceof Error ? e.message : "Failed to load projects.");
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortMode]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((p) => {
      const hay = [
        p.title,
        p.category,
        p.slug ?? "",
        p.short_description ?? "",
        p.problem ?? "",
        p.built ?? "",
        p.result ?? "",
        p.tags ?? "",
        p.url ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [projects, query]);

  return (
    <>
      <AdminPageHeader
        title="Projects"
        description="Manage portfolio items on the homepage and /work."
        action={
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center justify-center rounded-lg bg-cyan-400 px-4 py-2 text-sm font-medium text-black hover:bg-cyan-300"
          >
            Add project
          </Link>
        }
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          className="input max-w-md"
          placeholder="Search projects…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="input-select w-full max-w-[200px]"
          value={sortMode}
          onChange={(e) => setSortMode(e.target.value as SortMode)}
        >
          <option value="sort_order">Sort order</option>
          <option value="newest">Newest first</option>
        </select>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {PROJECT_FILTER_CHIPS.map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() => setCategoryFilter(chip.id)}
            className={[
              "rounded-full border px-3 py-1 text-xs transition",
              categoryFilter === chip.id
                ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100"
                : "border-white/10 text-white/60 hover:text-white",
            ].join(" ")}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {!canReorder && projects.length > 1 && (
        <p className="mt-3 text-xs text-white/45">
          To reorder by drag: select <span className="text-white/65">All</span>, clear search, and use{" "}
          <span className="text-white/65">Sort order</span> view.
        </p>
      )}

      <AdminProjectList
        projects={canReorder ? projects : filtered}
        categoryFilter={categoryFilter}
        canReorder={canReorder}
        reordering={reordering}
        onReorder={async (orderedIds) => {
          const map = new Map(projects.map((p) => [p.id, p]));
          const next = orderedIds
            .map((id, i) => {
              const p = map.get(id);
              return p ? { ...p, sort_order: (i + 1) * 10 } : null;
            })
            .filter((p): p is Project => p !== null);
          setProjects(next);
          setReordering(true);
          try {
            await reorderProjects(orderedIds);
            setToast("Order saved.");
          } catch (e) {
            setToast(e instanceof Error ? e.message : "Failed to save order.");
            await refresh();
          } finally {
            setReordering(false);
          }
        }}
        onToggleFeatured={async (p) => {
          try {
            await toggleFeatured(p.id, !p.is_featured);
            setToast(p.is_featured ? "Removed from featured." : "Marked as featured.");
            await refresh();
          } catch (e) {
            setToast(e instanceof Error ? e.message : "Update failed.");
          }
        }}
        onDelete={async (id) => {
          if (!confirm("Delete this project? This cannot be undone.")) return;
          try {
            await deleteProject(id);
            setToast("Project deleted.");
            await refresh();
          } catch (e) {
            setToast(e instanceof Error ? e.message : "Delete failed.");
          }
        }}
      />
    </>
  );
}
