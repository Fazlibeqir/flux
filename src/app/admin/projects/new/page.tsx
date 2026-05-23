"use client";

import { AdminPageWithToast } from "@/components/admin/AdminPageFrame";
import AdminProjectForm from "@/components/admin/AdminProjectForm";

export default function AdminNewProjectPage() {
  return (
    <AdminPageWithToast>
      {({ setToast }) => (
        <AdminProjectForm mode="create" setToast={setToast} onSaved={() => {}} />
      )}
    </AdminPageWithToast>
  );
}
