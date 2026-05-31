import { NextRequest, NextResponse } from "next/server";
import { generateSlug, calculateReadTime } from "@/lib/blog";
import { supabase, mapRowToPost } from "@/lib/supabase";

// GET - Get a single post by ID
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: mapRowToPost(data) });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

// PUT - Update a post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { data: existing, error: fetchError } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const now = new Date().toISOString();

    // Regenerate slug if title changed
    let newSlug = existing.slug;
    if (body.title && body.title !== existing.title) {
      newSlug = generateSlug(body.title);
      const { data: duplicate } = await supabase
        .from("blog_posts")
        .select("id")
        .eq("slug", newSlug)
        .neq("id", id)
        .single();

      if (duplicate) {
        return NextResponse.json({ error: "A post with this title already exists" }, { status: 400 });
      }
    }

    const updates: Record<string, unknown> = {
      updated_at: now,
      slug: newSlug,
    };

    if (body.title) updates.title = body.title;
    if (body.excerpt) updates.excerpt = body.excerpt;
    if (body.content) {
      updates.content = body.content;
      updates.read_time = calculateReadTime(body.content);
    }
    if (body.category) updates.category = body.category;
    if (body.author) updates.author = body.author;
    if (body.authorRole) updates.author_role = body.authorRole;
    if (body.image) updates.image = body.image;
    if (body.featured !== undefined) updates.featured = body.featured;
    if (body.published !== undefined) updates.published = body.published;
    if (body.tags) updates.tags = body.tags;

    const { data, error } = await supabase
      .from("blog_posts")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: mapRowToPost(data),
      message: "Post updated successfully",
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

// DELETE - Delete a post
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data, error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: mapRowToPost(data),
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
