export type ProjectStatus = "draft" | "published";

export type Project = {
  id: string;
  title: string;
  slug: string | null;
  category: string;
  short_description: string | null;
  problem: string | null;
  built: string | null;
  result: string | null;
  tags: string | null;
  url: string | null;
  logo_path: string | null;
  preview_path: string | null;
  is_featured: boolean;
  sort_order: number;
  status?: ProjectStatus | null;
  created_at?: string;
};

export type ProjectCreateInput = {
  title: string;
  slug: string | null;
  category: string;
  short_description: string | null;
  problem: string | null;
  built: string | null;
  result: string | null;
  tags: string | null;
  url: string | null;
  is_featured: boolean;
  sort_order: number;
  status: ProjectStatus;
};

export type ProjectUpdateInput = Partial<ProjectCreateInput>;

export type SortMode = "sort_order" | "newest";
