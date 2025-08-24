export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

type BlogRow = {
  id: number;
  title: string | null;
  slug: string | null;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  image: string | null;
  author: string | null;
  date: string | null;       // stored as YYYY-MM-DD?
  read_time: string | null;  // e.g. "5 min read"
  published_at: string | null;
  created_at: string | null;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category"); // optional
  const limit = Number(searchParams.get("limit") || 24);

  const pool = getPool();
  let sql = `
    SELECT id, title, slug, excerpt, content, category, image, author, date, read_time
    FROM blogs
    WHERE published_at IS NOT NULL
  `;
  const params: any[] = [];

  if (category && category !== "All Categories") {
    sql += " AND category = ?";
    params.push(category);
  }

  sql += " ORDER BY date DESC, created_at DESC LIMIT ?";
  params.push(limit);

  const [rows] = await pool.execute(sql, params);

  const blogRows = Array.isArray(rows) ? (rows as BlogRow[]) : [];
  const data = blogRows.map((r) => ({
    id: r.id,
    title: r.title ?? "Untitled",
    category: r.category ?? "General",
    date: r.date ?? "",
    readTime: r.read_time ?? "5 min read",
    image: r.image ?? "/images/default-blog.jpg",
    description: r.excerpt ?? "",
    content: r.content ?? "",
  }));

  return NextResponse.json(data);
}
