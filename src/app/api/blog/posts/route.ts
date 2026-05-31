import { NextRequest, NextResponse } from "next/server";
import { generateSlug, calculateReadTime, generateId } from "@/lib/blog";
import { supabase, mapRowToPost } from "@/lib/supabase";

// GET - Retrieve posts with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const published = searchParams.get("published");
    const slug = searchParams.get("slug");
    const limit = searchParams.get("limit");

    // Single post by slug
    if (slug) {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error || !data) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: mapRowToPost(data) });
    }

    let query = supabase.from("blog_posts").select("*");

    if (category) {
      query = query.ilike("category", category);
    }

    if (featured === "true") {
      query = query.eq("featured", true);
    }

    if (published === "true" || published === "false") {
      query = query.eq("published", published === "true");
    } else if (published === null) {
      query = query.eq("published", true);
    }
    // published=all → no filter, return every post

    query = query.order("published_at", { ascending: false });

    if (limit) {
      query = query.limit(parseInt(limit, 10));
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }

    const posts = (data ?? []).map(mapRowToPost);
    return NextResponse.json({ success: true, data: posts, total: posts.length });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

// POST - Create a new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const requiredFields = ["title", "excerpt", "content", "category", "author", "authorRole"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const now = new Date().toISOString();
    const slug = generateSlug(body.title);

    // Check for duplicate slug
    const { data: existing } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existing) {
      return NextResponse.json({ error: "A post with this title already exists" }, { status: 400 });
    }

    const newPost = {
      id: generateId(),
      title: body.title,
      slug,
      excerpt: body.excerpt,
      content: body.content,
      category: body.category,
      author: body.author,
      author_role: body.authorRole,
      published_at: body.publishedAt || now,
      updated_at: now,
      read_time: calculateReadTime(body.content),
      image: body.image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800",
      featured: body.featured || false,
      published: body.published !== undefined ? body.published : true,
      tags: body.tags || [],
    };

    const { data, error } = await supabase
      .from("blog_posts")
      .insert(newPost)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }

    return NextResponse.json(
      { success: true, data: mapRowToPost(data), message: "Post created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
