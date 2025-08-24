// app/api/trainers/[id]/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

type Row = Record<string, any>;

function cleanLocation(location?: string | null) {
  if (!location || location === "Not Available") return "Location not specified";
  const cities = [
    "Mumbai","Bangalore","Delhi","Hyderabad","Chennai","Kolkata","Pune","Ahmedabad",
    "Jaipur","Navi Mumbai","Nerul","Vashi","Ghansoli","Kharghar","Panvel","Belapur",
    "Airoli","Kopar Khairane","Koramangala","Andheri"
  ];
  const parenMatch = location.match(/\(([^)]+)\)/);
  if (parenMatch) {
    const cand = parenMatch[1];
    for (const c of cities) if (cand.toLowerCase() === c.toLowerCase()) return c;
  }
  for (const c of cities) if (location.toLowerCase().includes(c.toLowerCase())) return c;
  return "Location not specified";
}

function parseList(val?: string | null): string[] {
  if (!val) return [];
  const s = String(val).trim();
  if (s.startsWith("[") && s.endsWith("]")) {
    try {
      const arr = JSON.parse(s);
      if (Array.isArray(arr)) return arr.map((x: any) => String(x).trim()).filter(Boolean);
    } catch {}
  }
  return s.split(",").map((x) => x.trim()).filter(Boolean);
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }   // 👈 params is a Promise
) {
  const { id } = await context.params;            // 👈 await it here

  const numId = Number(id);
  if (!numId || Number.isNaN(numId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const pool = getPool();

  // Base trainer row
  const [rows] = await pool.execute(
    `SELECT * FROM fitness_trainers WHERE id = ? LIMIT 1`,
    [numId]
  );
  const list = rows as Row[];

  if (!list.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const r = list[0];

  const trainerName = r.trainer_name && r.trainer_name !== "Not Available" ? r.trainer_name : null;
  const gymName = r.gym_name && r.gym_name !== "Not Available" ? r.gym_name : null;
  const name = trainerName ?? gymName ?? "Unknown Gym";

  const is_gym =
    /\b(GYM|FITNESS)\b/i.test(String(name)) ||
    (!!gymName && (!trainerName || trainerName === "Not Available"));

  // Defaults/fallbacks
  const base = {
    id: r.id,
    name,
    is_gym,
    image: r.image ?? "Not Available",
    location: cleanLocation(r.location),
    rating: r.rating ?? "N/A",
    caption_snippet: r.caption_snippet ?? "",
    experience: r.experience ?? "Not Available",
    email:
      r.email ??
      `${String(name).replace(/\s+/g, ".").toLowerCase()}@gmail.com`,
    phone: r.mobile_number ?? "Not Available",
    instagram:
      r.instagram ?? `@${String(name).replace(/\s+/g, "_").toLowerCase()}`,
    price_per_session: r.price_per_session ?? null,
    is_online: r.is_online === 1 || r.is_online === "1" || r.is_online === true,
  };

  // Related arrays
  let specializations: Array<{ name: string; description?: string }> = [];
  let badges: Array<{ name: string }> = [];
  let certifications: Array<{ name: string; description?: string }> = [];

  // specializations
  try {
    const [specRows] = await pool.execute(
      `SELECT name, description FROM trainer_specializations WHERE trainer_id = ?`,
      [numId]
    );
    specializations = (specRows as Row[]).map((x) => ({
      name: x.name,
      description: x.description ?? undefined,
    }));
  } catch {
    specializations = parseList(r.services_offered).map((name) => ({ name }));
  }

  // badges
  try {
    const [bRows] = await pool.execute(
      `SELECT name FROM trainer_badges WHERE trainer_id = ?`,
      [numId]
    );
    badges = (bRows as Row[]).map((x) => ({ name: x.name }));
  } catch {
    badges = parseList(r.badges).map((name) => ({ name }));
  }

  // certifications
  try {
    const [cRows] = await pool.execute(
      `SELECT name, description FROM trainer_certifications WHERE trainer_id = ?`,
      [numId]
    );
    certifications = (cRows as Row[]).map((x) => ({
      name: x.name,
      description: x.description ?? undefined,
    }));
  } catch {
    certifications = parseList(r.certifications).map((name) => ({ name }));
  }

  return NextResponse.json({
    ...base,
    specializations,
    badges,
    certifications,
  });
}
