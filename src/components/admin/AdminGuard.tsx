"use client";

import { useEffect, useState } from "react";
import { getSessionEmail } from "@/lib/data/projects.client";

export default function AdminGuard(props: {
  children: (sessionEmail: string) => React.ReactNode;
}) {
  const { children } = props;

  const [loading, setLoading] = useState(true);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const email = await getSessionEmail();
      setSessionEmail(email);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <main className="min-h-screen bg-black text-white p-8">Loading…</main>;
  }

  if (!sessionEmail) {
    return (
      <main className="min-h-screen bg-black text-white p-8">
        <h1 className="text-2xl font-semibold">Projects Admin</h1>
        <p className="mt-3 text-white/70">You need to sign in first.</p>
        <a
          href="/admin/login"
          className="mt-6 inline-flex rounded-xl bg-cyan-400 px-4 py-2 text-sm font-medium text-black"
        >
          Go to login →
        </a>
      </main>
    );
  }

  return <>{children(sessionEmail)}</>;
}