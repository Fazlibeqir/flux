"use client";

import { useEffect, useState } from "react";
import { deleteInquiry, listInquiries, updateInquiryStatus } from "@/lib/data/site.client";
import type { InquiryRecord } from "@/lib/types/site";

export default function AdminInquiriesList({ setToast }: { setToast: (m: string) => void }) {
  const [items, setItems] = useState<InquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | InquiryRecord["status"]>("all");

  const refresh = async () => {
    const data = await listInquiries();
    setItems(data);
  };

  useEffect(() => {
    refresh()
      .catch((e) => setToast(e instanceof Error ? e.message : "Failed to load."))
      .finally(() => setLoading(false));
  }, [setToast]);

  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter);

  if (loading) return <p className="text-white/55">Loading messages…</p>;

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {(["all", "new", "read", "archived"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={[
              "rounded-lg border px-3 py-1 text-sm capitalize",
              filter === f ? "border-cyan-300/40 bg-cyan-400/10 text-cyan-100" : "border-white/10 text-white/60",
            ].join(" ")}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-white/10 bg-white/[0.02] px-6 py-12 text-center text-white/55">
          No messages yet. Submissions from the contact form appear here.
        </p>
      ) : (
        <ul className="space-y-3">
          {filtered.map((item) => (
            <li key={item.id} className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-white">{item.name}</p>
                  <a href={`mailto:${item.email}`} className="text-sm text-cyan-300/90 hover:text-cyan-200">
                    {item.email}
                  </a>
                  {item.service_type && (
                    <p className="mt-1 text-xs text-white/45">{item.service_type}</p>
                  )}
                  <p className="mt-1 text-xs text-white/35">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>
                <span
                  className={[
                    "rounded-full px-2 py-0.5 text-xs capitalize",
                    item.status === "new" ? "bg-cyan-400/10 text-cyan-200" : "bg-white/10 text-white/50",
                  ].join(" ")}
                >
                  {item.status}
                </span>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-white/70">{item.message}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.status !== "read" && (
                  <button
                    type="button"
                    onClick={async () => {
                      await updateInquiryStatus(item.id, "read");
                      await refresh();
                    }}
                    className="rounded border border-white/15 px-2 py-1 text-xs text-white/75 hover:text-white"
                  >
                    Mark read
                  </button>
                )}
                {item.status !== "archived" && (
                  <button
                    type="button"
                    onClick={async () => {
                      await updateInquiryStatus(item.id, "archived");
                      await refresh();
                    }}
                    className="rounded border border-white/15 px-2 py-1 text-xs text-white/75 hover:text-white"
                  >
                    Archive
                  </button>
                )}
                <button
                  type="button"
                  onClick={async () => {
                    if (!confirm("Delete this message?")) return;
                    await deleteInquiry(item.id);
                    await refresh();
                    setToast("Deleted.");
                  }}
                  className="rounded border border-red-500/30 px-2 py-1 text-xs text-red-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
