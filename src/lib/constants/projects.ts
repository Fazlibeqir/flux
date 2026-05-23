export const PROJECT_CATEGORIES = [
  "Websites",
  "Digital Menus",
  "Admin Dashboards",
  "Mobile Apps",
  "Desktop Tools",
  "Integrations",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export const PROJECT_STATUS_LABELS = [
  "Live project",
  "Client project",
  "Demo",
  "Internal tool",
] as const;

export type ProjectStatusLabel = (typeof PROJECT_STATUS_LABELS)[number];

export const PROJECT_FILTER_CHIPS = [
  { id: "all", label: "All" },
  { id: "websites", label: "Websites" },
  { id: "digital-menus", label: "Digital Menus" },
  { id: "admin-dashboards", label: "Admin Dashboards" },
  { id: "mobile-apps", label: "Mobile Apps" },
  { id: "desktop-tools", label: "Desktop Tools" },
  { id: "integrations", label: "Integrations" },
] as const;

export type ProjectFilterId = (typeof PROJECT_FILTER_CHIPS)[number]["id"];

const FILTER_PATTERNS: Record<Exclude<ProjectFilterId, "all">, RegExp[]> = {
  websites: [/website/i, /\bweb\b/i, /business site/i],
  "digital-menus": [/menu/i, /hospitality/i, /caf[eé]/i, /restaurant/i, /qr/i],
  "admin-dashboards": [/admin/i, /dashboard/i, /internal/i, /panel/i],
  "mobile-apps": [/mobile/i, /android/i, /ios/i, /app\b/i],
  "desktop-tools": [/desktop/i, /tool/i],
  integrations: [/integrat/i, /api/i, /automation/i, /connector/i],
};

export function categoryMatchesFilter(category: string, filterId: ProjectFilterId): boolean {
  if (filterId === "all") return true;
  const patterns = FILTER_PATTERNS[filterId];
  return patterns.some((re) => re.test(category));
}

export function slugifyTitle(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function parseTags(tags: string | null | undefined): string[] {
  if (!tags?.trim()) return [];
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export function formatTags(tags: string[]): string {
  return tags.filter(Boolean).join(", ");
}
