"use client";

import { AdminPageWithToast } from "@/components/admin/AdminPageFrame";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import AdminContentEditor from "@/components/admin/AdminContentEditor";

export default function AdminContentPage() {
  return (
    <AdminPageWithToast>
      {({ setToast }) => (
        <>
          <AdminPageHeader
            title="Content"
            description="Edit homepage sections. Changes appear on the public site after you save each section."
          />
          <AdminContentEditor setToast={setToast} />
        </>
      )}
    </AdminPageWithToast>
  );
}
