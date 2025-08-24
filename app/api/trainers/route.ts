// app/api/trainers/route.ts
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
  const s = val.trim();
  // Try JSON array first
  if (s.startsWith("[") && s.endsWith("]")) {
    try {
      const arr = JSON.parse(s);
      if (Array.isArray(arr)) return arr.map((x: any) => String(x).trim()).filter(Boolean);
    } catch {}
  }
  // Fallback CSV
  return s.split(",").map((x) => x.trim()).filter(Boolean);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit") || 60);

  const search = (searchParams.get("search") || "").trim();
  const type = (searchParams.get("type") || "").trim();
  const onlineOnly = (searchParams.get("online_only") || "").toLowerCase() === "on";

  const pool = getPool();

  // Keep this robust: select * so we don't break if columns differ
  let sql = `SELECT * FROM fitness_trainers WHERE 1=1`;
  const params: any[] = [];

  if (search) {
    sql += ` AND (COALESCE(trainer_name,'') LIKE ? OR COALESCE(gym_name,'') LIKE ?)`;
    params.push(`%${search}%`, `%${search}%`);
  }

  if (type) {
    // Filter via services_offered CSV/JSON (works even without a join table)
    sql += ` AND COALESCE(services_offered,'') LIKE ?`;
    params.push(`%${type}%`);
  }

  if (onlineOnly) {
    sql += ` AND (COALESCE(is_online,0)=1 OR COALESCE(is_online,'0')='1')`;
  }

  sql += ` ORDER BY id DESC LIMIT ?`;
  params.push(limit);

  const [rows] = await pool.execute(sql, params);

  const data = (rows as Row[]).map((r) => {
    const trainerName = r.trainer_name && r.trainer_name !== "Not Available" ? r.trainer_name : null;
    const gymName = r.gym_name && r.gym_name !== "Not Available" ? r.gym_name : null;

    const name = trainerName ?? gymName ?? "Not Available";
    const isGym =
      !!gymName &&
      (!trainerName || trainerName === "Not Available" || /\b(GYM|FITNESS)\b/i.test(String(name)));

    const specializations = parseList(r.services_offered);
    const badges = parseList(r.badges); // if you have a column "badges" CSV/JSON; else stays []

    return {
      id: r.id,
      name,
      image: r.image ?? "Not Available",
      location: cleanLocation(r.location),
      rating: r.rating ?? "N/A",
      is_online: r.is_online === 1 || r.is_online === "1" || r.is_online === true,
      badges,
      specializations,
      is_gym: isGym,
    };
  });

  return NextResponse.json(data);
}
