"use client";

import type { SortMode } from "@/lib/types/project";

export default function ProjectsToolbar(props: {
  query: string;
  setQuery: (v: string) => void;
  sortMode: SortMode;
  setSortMode: (v: SortMode) => void;
}) {
  const { query, setQuery, sortMode, setSortMode } = props;

  return (
    <div className="mt-4 grid gap-3 md:grid-cols-[1fr_220px]">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search projects…"
        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/40"
      />

      <select
        value={sortMode}
        onChange={(e) => setSortMode(e.target.value as SortMode)}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
      >
        <option value="sort_order">Sort: sort_order</option>
        <option value="newest">Sort: newest</option>
      </select>
    </div>
  );
}