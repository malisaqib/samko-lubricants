import { NextResponse } from "next/server";
import { supabase, mapRowToCategory } from "@/lib/supabase";

// GET - Retrieve all categories
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("blog_categories")
      .select("*")
      .order("name");

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }

    const categories = (data ?? []).map(mapRowToCategory);
    return NextResponse.json({ success: true, data: categories, total: categories.length });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
