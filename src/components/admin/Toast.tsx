"use client";

import { useEffect } from "react";

export default function Toast(props: { message: string | null; onClear: () => void }) {
  const { message, onClear } = props;

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClear, 2600);
    return () => clearTimeout(t);
  }, [message, onClear]);

  if (!message) return null;

  return (
    <div className="mb-6 rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-100">
      {message}
    </div>
  );
}