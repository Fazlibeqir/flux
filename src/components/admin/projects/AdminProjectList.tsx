"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { categoryMatchesFilter, type ProjectFilterId } from "@/lib/constants/projects";
import { previewPublicUrl } from "@/lib/storage/projects.client";
import type { Project } from "@/lib/types/project";

function DragHandle({ disabled }: { disabled?: boolean }) {
  return (
    <span
      className={[
        "inline-flex flex-col justify-center gap-0.5 px-1",
        disabled ? "cursor-not-allowed opacity-30" : "cursor-grab active:cursor-grabbing",
      ].join(" ")}
      aria-hidden
    >
      <span className="block h-0.5 w-3.5 rounded-full bg-white/35" />
      <span className="block h-0.5 w-3.5 rounded-full bg-white/35" />
      <span className="block h-0.5 w-3.5 rounded-full bg-white/35" />
    </span>
  );
}

export default function AdminProjectList({
  projects,
  categoryFilter,
  canReorder,
  reordering,
  onToggleFeatured,
  onDelete,
  onReorder,
}: {
  projects: Project[];
  categoryFilter: ProjectFilterId;
  canReorder: boolean;
  reordering?: boolean;
  onToggleFeatured: (p: Project) => void;
  onDelete: (id: string) => void;
  onReorder: (orderedIds: string[]) => void;
}) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const filtered =
    categoryFilter === "all"
      ? projects
      : projects.filter((p) => categoryMatchesFilter(p.category, categoryFilter));

  const applyReorder = (fromId: string, toId: string) => {
    if (!canReorder || fromId === toId) return;
    const ids = projects.map((p) => p.id);
    const from = ids.indexOf(fromId);
    const to = ids.indexOf(toId);
    if (from < 0 || to < 0) return;
    const next = [...ids];
    next.splice(from, 1);
    next.splice(to, 0, fromId);
    onReorder(next);
  };

  if (filtered.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-white/55">
        No projects match your filters.
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
      {canReorder && (
        <p className="border-b border-white/10 bg-cyan-400/[0.06] px-4 py-2.5 text-xs text-cyan-100/80">
          Drag rows by the handle to set order on the homepage and /work. Order saves automatically.
        </p>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-xs uppercase tracking-[0.12em] text-white/45">
              {canReorder && <th className="w-10 px-2 py-3 font-medium" aria-label="Reorder" />}
              <th className="px-4 py-3 font-medium">Project</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Featured</th>
              <th className="w-14 px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, index) => {
              const preview = previewPublicUrl(p.preview_path);
              const status = p.status || "published";
              const isDragging = draggingId === p.id;
              const isOver = overId === p.id && draggingId !== p.id;

              return (
                <tr
                  key={p.id}
                  draggable={canReorder && !reordering}
                  onDragStart={() => canReorder && setDraggingId(p.id)}
                  onDragEnd={() => {
                    setDraggingId(null);
                    setOverId(null);
                  }}
                  onDragOver={(e) => {
                    if (!canReorder || !draggingId) return;
                    e.preventDefault();
                    setOverId(p.id);
                  }}
                  onDragLeave={() => {
                    if (overId === p.id) setOverId(null);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (draggingId) applyReorder(draggingId, p.id);
                    setDraggingId(null);
                    setOverId(null);
                  }}
                  className={[
                    "border-b border-white/5 transition-colors",
                    isDragging ? "opacity-40" : "hover:bg-white/[0.02]",
                    isOver ? "bg-cyan-400/10 ring-1 ring-inset ring-cyan-400/30" : "",
                    reordering ? "pointer-events-none opacity-70" : "",
                  ].join(" ")}
                >
                  {canReorder && (
                    <td className="px-2 py-3 align-middle">
                      <DragHandle />
                    </td>
                  )}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-slate-900">
                        {preview ? (
                          <Image src={preview} alt="" fill sizes="64px" className="object-cover" />
                        ) : (
                          <div className="grid h-full w-full place-items-center text-[10px] text-white/30">
                            —
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-white">{p.title}</p>
                        <p className="truncate text-xs text-white/40">{p.slug || p.id.slice(0, 8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white/65">{p.category}</td>
                  <td className="px-4 py-3">
                    <span
                      className={[
                        "inline-flex rounded-full px-2 py-0.5 text-xs capitalize",
                        status === "published"
                          ? "bg-emerald-500/10 text-emerald-200"
                          : "bg-amber-500/10 text-amber-200",
                      ].join(" ")}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => onToggleFeatured(p)}
                      className={[
                        "rounded-lg border px-2 py-1 text-xs transition",
                        p.is_featured
                          ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-100"
                          : "border-white/10 text-white/50 hover:text-white",
                      ].join(" ")}
                    >
                      {p.is_featured ? "Yes" : "No"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-white/45 tabular-nums">{index + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/projects/${p.id}`}
                        className="rounded-lg border border-white/10 px-2.5 py-1 text-xs text-white/75 hover:text-white"
                      >
                        Edit
                      </Link>
                      {p.url && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-lg border border-white/10 px-2.5 py-1 text-xs text-white/75 hover:text-white"
                        >
                          Preview
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => onDelete(p.id)}
                        className="rounded-lg border border-red-500/25 px-2.5 py-1 text-xs text-red-200 hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
