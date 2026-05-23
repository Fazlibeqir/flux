"use client";

import { useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminShell from "@/components/admin/AdminShell";
import Toast from "@/components/admin/Toast";
import { signOutAndRedirect } from "@/lib/data/projects.client";

export function AdminPageWithToast({
  children,
}: {
  children: (ctx: { setToast: (m: string) => void }) => React.ReactNode;
}) {
  const [toast, setToast] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  return (
    <AdminGuard>
      {(sessionEmail) => (
        <>
          <Toast message={toast} onClear={() => setToast(null)} />
          <AdminShell
            sessionEmail={sessionEmail}
            signingOut={signingOut}
            onSignOut={async () => {
              if (signingOut) return;
              setSigningOut(true);
              try {
                await signOutAndRedirect();
              } catch (e) {
                setToast(e instanceof Error ? e.message : "Sign out failed.");
                setSigningOut(false);
              }
            }}
          >
            {children({ setToast })}
          </AdminShell>
        </>
      )}
    </AdminGuard>
  );
}
