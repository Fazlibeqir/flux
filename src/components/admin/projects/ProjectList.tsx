"use client";

import type { Project } from "@/lib/types/project";
import ProjectCard from "@/components/admin/projects/ProjectCard";

export default function ProjectList(props: {
  projects: Project[];
  uploadingId: string | null;
  onToggleFeatured: (p: Project) => void;
  onUploadLogo: (id: string, file: File) => void;
  onUploadPreview: (id: string, file: File) => void;
  onDelete: (id: string) => void;
}) {
  const { projects, uploadingId, onToggleFeatured, onUploadLogo, onUploadPreview, onDelete } = props;

  if (projects.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-white/60">
        No projects found.
      </div>
    );
  }

  return (
    <div className="mt-4 grid gap-4 md:grid-cols-2">
      {projects.map((p) => (
        <ProjectCard
          key={p.id}
          project={p}
          uploading={uploadingId === p.id}
          onToggleFeatured={onToggleFeatured}
          onUploadLogo={onUploadLogo}
          onUploadPreview={onUploadPreview}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}