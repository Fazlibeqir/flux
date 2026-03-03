export type Project = {
    id: string;
    title: string;
    category: string;
    problem: string | null;
    built: string | null;
    result: string | null;
    url: string | null;
    logo_path: string | null;
    preview_path: string | null;
    is_featured: boolean;
    sort_order: number;
    created_at?: string;
  };
  
  export type ProjectCreateInput = {
    title: string;
    category: string;
    problem: string | null;
    built: string | null;
    result: string | null;
    url: string | null;
    is_featured: boolean;
    sort_order: number;
  };
  
  export type SortMode = "sort_order" | "newest";