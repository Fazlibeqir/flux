"use client";

import { AdminPageWithToast } from "@/components/admin/AdminPageFrame";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import AdminInquiriesList from "@/components/admin/AdminInquiriesList";

export default function AdminMessagesPage() {
  return (
    <AdminPageWithToast>
      {({ setToast }) => (
        <>
          <AdminPageHeader
            title="Messages"
            description="Contact form submissions from the public site. Set up email alerts in .env.local — see supabase/README.md (Resend, Gmail SMTP, or webhook)."
          />
          <AdminInquiriesList setToast={setToast} />
        </>
      )}
    </AdminPageWithToast>
  );
}
