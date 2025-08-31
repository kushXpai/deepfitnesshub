// app/api/admin/add-blog/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPool } from "@/lib/db";
import type { ResultSetHeader } from "mysql2/promise";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
function nv(v: unknown) {
  if (typeof v === "string") {
    const t = v.trim();
    return t.length ? t : "Not Available";
  }
  return v ?? "Not Available";
}

export async function POST(req: Request) {
  // Protect route
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth")?.value;
  if (auth !== "1") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));

  let {
    title = "",
    slug = "",
    excerpt = "",
    content = "",
    category = "",
    image = "",
    author = "",
    date = "",       // e.g. "2025-06-12"
    read_time = "",
    publish = true,  // optional flag; default true
  } = body || {};

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  if (!slug) slug = slugify(title);

  const pool = getPool();
  const sql = `
    INSERT INTO blogs
      (title, slug, excerpt, content, category, image, author, date,
       read_time, published_at, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ${publish ? "NOW()" : "NULL"}, NOW(), NOW())
  `;

  const params = [
    nv(title),
    nv(slug),
    nv(excerpt),
    nv(content),
    nv(category),
    nv(image),
    nv(author),
    nv(date),
    nv(read_time),
  ];

  try {
    const [res] = await pool.execute<ResultSetHeader>(sql, params);
    return NextResponse.json({ ok: true, id: res.insertId });
  } catch (e: any) {
    console.error("add-blog error:", e);
    return NextResponse.json(
      { error: "Database error", detail: e?.message },
      { status: 500 }
    );
  }
}
