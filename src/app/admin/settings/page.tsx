"use client";

import { AdminPageWithToast } from "@/components/admin/AdminPageFrame";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import AdminSettingsForm from "@/components/admin/AdminSettingsForm";

export default function AdminSettingsPage() {
  return (
    <AdminPageWithToast>
      {({ setToast }) => (
        <>
          <AdminPageHeader
            title="Settings"
            description="Contact details and social links used across the site."
          />
          <AdminSettingsForm setToast={setToast} />
        </>
      )}
    </AdminPageWithToast>
  );
}
