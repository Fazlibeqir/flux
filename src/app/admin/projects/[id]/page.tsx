"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AdminPageWithToast } from "@/components/admin/AdminPageFrame";
import AdminProjectForm from "@/components/admin/AdminProjectForm";
import { getProject } from "@/lib/data/projects.client";
import type { Project } from "@/lib/types/project";

export default function AdminEditProjectPage() {
  return (
    <AdminPageWithToast>
      {({ setToast }) => <EditProjectContent setToast={setToast} />}
    </AdminPageWithToast>
  );
}

function EditProjectContent({ setToast }: { setToast: (m: string) => void }) {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await getProject(id);
      setProject(data);
      if (!data) setToast("Project not found.");
    } catch (e) {
      setToast(e instanceof Error ? e.message : "Failed to load project.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <p className="text-white/55">Loading project…</p>;
  }

  if (!project) {
    return <p className="text-white/55">Project not found.</p>;
  }

  return (
    <AdminProjectForm
      mode="edit"
      project={project}
      setToast={setToast}
      onSaved={load}
    />
  );
}
