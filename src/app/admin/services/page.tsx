"use client";

import { AdminPageWithToast } from "@/components/admin/AdminPageFrame";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import AdminServicesManager from "@/components/admin/AdminServicesManager";

export default function AdminServicesPage() {
  return (
    <AdminPageWithToast>
      {({ setToast }) => (
        <>
          <AdminPageHeader
            title="Services"
            description="Manage service cards and detail sections on the homepage."
          />
          <AdminServicesManager setToast={setToast} />
        </>
      )}
    </AdminPageWithToast>
  );
}
