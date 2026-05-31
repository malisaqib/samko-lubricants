import { createClient } from "@supabase/supabase-js";
import { BlogPost, BlogCategory } from "./blog";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Map database snake_case rows to BlogPost camelCase interface
export function mapRowToPost(row: Record<string, unknown>): BlogPost {
  return {
    id: row.id as string,
    title: row.title as string,
    slug: row.slug as string,
    excerpt: row.excerpt as string,
    content: row.content as string,
    category: row.category as string,
    author: row.author as string,
    authorRole: row.author_role as string,
    publishedAt: row.published_at as string,
    updatedAt: row.updated_at as string,
    readTime: row.read_time as string,
    image: row.image as string,
    featured: row.featured as boolean,
    published: row.published as boolean,
    tags: row.tags as string[],
  };
}

// Map database snake_case rows to BlogCategory interface
export function mapRowToCategory(row: Record<string, unknown>): BlogCategory {
  return {
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    description: row.description as string,
  };
}
