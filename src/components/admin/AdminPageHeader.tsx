import type { ReactNode } from "react";

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-sm text-white/55">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/80">{label}</label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-white/40">{hint}</p>}
    </div>
  );
}

export function AdminFormSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/70">{title}</h2>
      <div className="mt-4 grid gap-4">{children}</div>
    </section>
  );
}

export { Field };
