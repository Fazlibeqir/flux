"use client";

import { useEffect, useState } from "react";
import { DEFAULT_SITE_CONTENT } from "@/lib/content/defaults";
import { loadAllSiteContentBlocks, saveSiteContentBlock, seedDefaultSiteContent } from "@/lib/data/site.client";
import type { SiteSettings } from "@/lib/types/site";
import { AdminFormSection, Field } from "@/components/admin/AdminPageHeader";

export default function AdminSettingsForm({ setToast }: { setToast: (m: string) => void }) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_CONTENT.settings);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadAllSiteContentBlocks()
      .then((blocks) => {
        if (blocks.settings) setSettings({ ...DEFAULT_SITE_CONTENT.settings, ...blocks.settings });
      })
      .catch((e) => setToast(e instanceof Error ? e.message : "Failed to load."));
  }, [setToast]);

  const save = async () => {
    setSaving(true);
    try {
      await saveSiteContentBlock("settings", settings);
      setToast("Settings saved.");
    } catch (e) {
      setToast(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl space-y-6">
      <AdminFormSection title="Site settings">
        <Field
          label="Contact email"
          hint="Public contact address. Also used for new message alerts if NOTIFY_EMAIL is not set in server env."
        >
          <input className="input" value={settings.contactEmail} onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })} />
        </Field>
        <Field label="Location">
          <input className="input" value={settings.location} onChange={(e) => setSettings({ ...settings, location: e.target.value })} />
        </Field>
        <Field label="Instagram URL">
          <input className="input" value={settings.instagramUrl} onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })} />
        </Field>
        <Field label="LinkedIn URL">
          <input className="input" value={settings.linkedinUrl} onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })} />
        </Field>
      </AdminFormSection>

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={save} disabled={saving} className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-medium text-black disabled:opacity-60">
          {saving ? "Saving…" : "Save settings"}
        </button>
        <button
          type="button"
          onClick={async () => {
            try {
              await seedDefaultSiteContent();
              setToast("Default site content imported (missing keys only).");
            } catch (e) {
              setToast(e instanceof Error ? e.message : "Import failed.");
            }
          }}
          className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/75 hover:text-white"
        >
          Import default content
        </button>
      </div>
    </div>
  );
}
