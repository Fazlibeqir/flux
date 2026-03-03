"use client";

import Image from "next/image";
import type { Project } from "@/lib/types/project";
import { logoPublicUrl } from "@/lib/storage/projects.client";

function clsx(...v: Array<string | false | undefined>) {
  return v.filter(Boolean).join(" ");
}

export default function ProjectCard(props: {
  project: Project;
  uploading: boolean;
  onToggleFeatured: (p: Project) => void;
  onUploadLogo: (id: string, file: File) => void;
  onUploadPreview: (id: string, file: File) => void;
  onDelete: (id: string) => void;
}) {
  const { project: p, uploading, onToggleFeatured, onUploadLogo, onUploadPreview, onDelete } = props;
  const url = logoPublicUrl(p.logo_path);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-300/20">
      <div className="flex items-start gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
          {url ? (
            <Image src={url} alt="" fill sizes="56px" className="object-cover opacity-90" />
          ) : (
            <div className="grid h-full w-full place-items-center text-xs text-white/35">No logo</div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-[0.16em] text-cyan-300/90">{p.category}</p>
          <h3 className="mt-1 truncate text-lg font-semibold">{p.title}</h3>

          <div className="mt-2 space-y-1 text-sm text-white/60">
            {p.problem && (
              <p>
                <span className="text-white/75">Problem:</span> {p.problem}
              </p>
            )}
            {p.built && (
              <p>
                <span className="text-white/75">Built:</span> {p.built}
              </p>
            )}
            {p.result && (
              <p>
                <span className="text-white/75">Result:</span> {p.result}
              </p>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              onClick={() => onToggleFeatured(p)}
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
              {uploading ? "Uploading…" : "Upload logo"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onUploadLogo(p.id, file);
                }}
              />
            </label>

            <label className="rounded-xl border border-white/15 bg-white/[0.03] px-3 py-2 text-sm cursor-pointer text-white/80 hover:text-white">
              {uploading ? "Uploading…" : "Upload preview"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onUploadPreview(p.id, file);
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
                Open
              </a>
            )}

            <button
              onClick={() => onDelete(p.id)}
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
}