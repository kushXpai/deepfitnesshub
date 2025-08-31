// app/api/admin/add-trainer/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPool } from "@/lib/db";
import type { ResultSetHeader } from "mysql2/promise";

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

  const {
    gym_name = "",
    trainer_name = "",
    experience = "",
    location = "",
    services_offered = "",
    mobile_number = "",
    email = "",
    instagram = "",
    caption_snippet = "",
  } = body || {};

  const pool = getPool();
  const sql = `
    INSERT INTO fitness_trainers
      (gym_name, trainer_name, experience, location, services_offered,
       mobile_number, email, instagram, caption_snippet, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
  `;

  const params = [
    nv(gym_name),
    nv(trainer_name),
    nv(experience),
    nv(location),
    nv(services_offered),
    nv(mobile_number),
    nv(email),
    nv(instagram),
    nv(caption_snippet),
  ];

  try {
    const [res] = await pool.execute<ResultSetHeader>(sql, params);
    return NextResponse.json({ ok: true, id: res.insertId });
  } catch (e: any) {
    console.error("add-trainer error:", e);
    return NextResponse.json(
      { error: "Database error", detail: e?.message },
      { status: 500 }
    );
  }
}
