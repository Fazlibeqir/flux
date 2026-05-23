"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminPageWithToast } from "@/components/admin/AdminPageFrame";
import { listProjects } from "@/lib/data/projects.client";

export default function AdminDashboardPage() {
  return (
    <AdminPageWithToast>
      {({ setToast }) => <DashboardContent setToast={setToast} />}
    </AdminPageWithToast>
  );
}

function DashboardContent({ setToast }: { setToast: (m: string) => void }) {
  const [stats, setStats] = useState({ total: 0, featured: 0, published: 0, draft: 0 });

  useEffect(() => {
    listProjects("sort_order")
      .then((projects) => {
        setStats({
          total: projects.length,
          featured: projects.filter((p) => p.is_featured).length,
          published: projects.filter((p) => !p.status || p.status === "published").length,
          draft: projects.filter((p) => p.status === "draft").length,
        });
      })
      .catch((e) => setToast(e instanceof Error ? e.message : "Failed to load stats."));
  }, [setToast]);

  return (
    <>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-1 text-sm text-white/55">Quick overview of your Flux portfolio.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total projects", value: stats.total },
          { label: "Featured", value: stats.featured },
          { label: "Published", value: stats.published },
          { label: "Drafts", value: stats.draft },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-white/45">{item.label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/admin/projects/new"
          className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-medium text-black hover:bg-cyan-300"
        >
          Add project
        </Link>
        <Link
          href="/admin/projects"
          className="rounded-xl border border-white/15 px-4 py-2 text-sm text-white/80 hover:text-white"
        >
          View all projects
        </Link>
        <Link href="/work" className="rounded-xl border border-white/15 px-4 py-2 text-sm text-white/80 hover:text-white">
          View public /work
        </Link>
      </div>
    </>
  );
}
