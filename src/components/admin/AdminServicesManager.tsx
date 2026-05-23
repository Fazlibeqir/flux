"use client";

import { useEffect, useState } from "react";
import {
  deleteService,
  listAllServices,
  seedDefaultServices,
  upsertService,
} from "@/lib/data/site.client";
import type { ServiceRecord } from "@/lib/types/site";
import { AdminFormSection, Field } from "@/components/admin/AdminPageHeader";

const emptyService = (): Omit<ServiceRecord, "id" | "created_at"> => ({
  label: "",
  target_id: "",
  icon: "/icons/service-websites.png",
  description: "",
  bullets: [],
  sort_order: 100,
  is_active: true,
});

export default function AdminServicesManager({ setToast }: { setToast: (m: string) => void }) {
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [editing, setEditing] = useState<ServiceRecord | null>(null);
  const [form, setForm] = useState(emptyService());
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const data = await listAllServices();
    setServices(data);
  };

  useEffect(() => {
    refresh()
      .catch((e) => setToast(e instanceof Error ? e.message : "Failed to load."))
      .finally(() => setLoading(false));
  }, [setToast]);

  const startNew = () => {
    setEditing(null);
    setForm(emptyService());
  };

  const startEdit = (s: ServiceRecord) => {
    setEditing(s);
    setForm({
      label: s.label,
      target_id: s.target_id,
      icon: s.icon,
      description: s.description,
      bullets: s.bullets ?? [],
      sort_order: s.sort_order,
      is_active: s.is_active,
    });
  };

  const save = async () => {
    try {
      await upsertService(editing?.id ?? null, {
        ...form,
        bullets: form.bullets,
      });
      setToast(editing ? "Service updated." : "Service created.");
      await refresh();
      startNew();
    } catch (e) {
      setToast(e instanceof Error ? e.message : "Save failed.");
    }
  };

  if (loading) return <p className="text-white/55">Loading services…</p>;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div>
        <div className="mb-4 flex flex-wrap gap-2">
          <button type="button" onClick={startNew} className="rounded-lg bg-cyan-400 px-3 py-1.5 text-sm font-medium text-black">
            Add service
          </button>
          <button
            type="button"
            onClick={async () => {
              try {
                await seedDefaultServices();
                await refresh();
                setToast("Default services imported.");
              } catch (e) {
                setToast(e instanceof Error ? e.message : "Import failed.");
              }
            }}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-white/75 hover:text-white"
          >
            Import defaults
          </button>
        </div>

        {services.length === 0 ? (
          <p className="text-white/55">No services yet. Add one or import defaults.</p>
        ) : (
          <ul className="space-y-2">
            {services.map((s) => (
              <li key={s.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3">
                <div>
                  <p className="font-medium text-white">{s.label}</p>
                  <p className="text-xs text-white/45">#{s.target_id} · order {s.sort_order}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => startEdit(s)} className="text-sm text-cyan-300 hover:text-cyan-200">
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      if (!confirm("Delete this service?")) return;
                      await deleteService(s.id);
                      await refresh();
                      setToast("Deleted.");
                    }}
                    className="text-sm text-red-300 hover:text-red-200"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <AdminFormSection title={editing ? "Edit service" : "New service"}>
        <Field label="Label"><input className="input" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} /></Field>
        <Field label="Anchor ID (target_id)"><input className="input" value={form.target_id} onChange={(e) => setForm({ ...form, target_id: e.target.value })} placeholder="service-websites" /></Field>
        <Field label="Icon path"><input className="input" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} /></Field>
        <Field label="Description"><textarea className="input min-h-[72px]" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></Field>
        <Field label="Bullets (one per line)">
          <textarea
            className="input min-h-[100px]"
            value={(form.bullets ?? []).join("\n")}
            onChange={(e) => setForm({ ...form, bullets: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
          />
        </Field>
        <Field label="Sort order"><input className="input" type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} /></Field>
        <label className="flex items-center gap-2 text-sm text-white/80">
          <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
          Active on site
        </label>
        <button type="button" onClick={save} className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-medium text-black">
          Save service
        </button>
      </AdminFormSection>
    </div>
  );
}
