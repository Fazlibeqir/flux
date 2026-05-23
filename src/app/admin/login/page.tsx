"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ADMIN_EMAIL } from "@/lib/config";

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 60_000; // 1 minute

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const failedAttempts = useRef(0);
  const lockedUntil = useRef<number>(0);
  const [lockSeconds, setLockSeconds] = useState(0);

  // Countdown timer while locked out
  useEffect(() => {
    if (lockSeconds <= 0) return;
    const id = setInterval(() => {
      const remaining = Math.ceil((lockedUntil.current - Date.now()) / 1000);
      if (remaining <= 0) {
        setLockSeconds(0);
        clearInterval(id);
      } else {
        setLockSeconds(remaining);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [lockSeconds]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      setSessionEmail(data.session?.user?.email ?? null);
      setLoading(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionEmail(session?.user?.email ?? null);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    if (submitting) return;

    if (Date.now() < lockedUntil.current) {
      const remaining = Math.ceil((lockedUntil.current - Date.now()) / 1000);
      alert(`Too many failed attempts. Please wait ${remaining} second(s).`);
      return;
    }

    if (!password.trim()) {
      alert("Enter password.");
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password,
    });

    setSubmitting(false);

    if (error) {
      failedAttempts.current += 1;
      if (failedAttempts.current >= MAX_ATTEMPTS) {
        lockedUntil.current = Date.now() + LOCKOUT_MS;
        failedAttempts.current = 0;
        setLockSeconds(Math.ceil(LOCKOUT_MS / 1000));
        alert(`Too many failed attempts. Login locked for ${LOCKOUT_MS / 1000} seconds.`);
      } else {
        alert(error.message);
      }
      return;
    }

    failedAttempts.current = 0;
    // go admin
    window.location.href = "/admin/dashboard";
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSessionEmail(null);
    setPassword("");
  };

  if (loading) {
    return <main className="min-h-screen bg-black text-white p-8">Loading…</main>;
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-md px-6 py-24">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-cyan-300">
          Flux Admin
        </p>

        <h1 className="text-3xl font-semibold">Sign in</h1>
        <p className="mt-3 text-white/70">
          Admin access is restricted to <span className="text-white">{ADMIN_EMAIL}</span>.
        </p>

        {sessionEmail ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-white/80 text-sm">Signed in as</p>
            <p className="mt-1 text-white font-medium">{sessionEmail}</p>

            <div className="mt-6 flex gap-3">
              <a
                href="/admin/dashboard"
                className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-medium text-black"
              >
                Go to dashboard
              </a>
              <button
                onClick={signOut}
                className="rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/80 hover:text-white"
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <label className="mb-2 block text-sm text-white/80">Email</label>
            <input
              value={ADMIN_EMAIL}
              disabled
              className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white/70 outline-none"
            />

            <label className="mb-2 mt-4 block text-sm text-white/80">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your admin password"
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/40"
              onKeyDown={(e) => {
                if (e.key === "Enter") signIn();
              }}
            />

            <button
              onClick={signIn}
              disabled={submitting || lockSeconds > 0}
              className="mt-4 w-full rounded-xl bg-cyan-400 px-4 py-3 text-sm font-medium text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Signing in…" : lockSeconds > 0 ? `Locked — wait ${lockSeconds}s` : "Sign in"}
            </button>

            <p className="mt-3 text-xs text-white/45">
              If you don’t have a password user yet: Supabase Dashboard → Authentication → Users → Add user.
            </p>
          </div>
        )}

        <p className="mt-6 text-xs text-white/45">
          If you sign in but still can’t add/edit projects, your email isn’t allowed by the RLS policy.
        </p>
      </div>
    </main>
  );
}