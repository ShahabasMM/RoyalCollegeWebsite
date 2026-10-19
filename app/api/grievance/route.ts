import { createHash, randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

import { validateGrievance } from "@/lib/grievance";
import { getPublicClient } from "@/lib/siteContent";

export const dynamic = "force-dynamic";

/* ==========================================================================
   /api/grievance — records a student grievance.

   The browser form posts here rather than writing to Supabase directly, so the
   submission is validated on the server (the client check is only a courtesy)
   and a script cannot bypass the field rules. The row goes into
   `site_contact_submissions`, the same table the public contact form uses,
   which has an insert-only public policy and no public read policy: submitted
   grievances are never exposed on the site.

   No grievance content is logged, and the client's IP is only ever held as a
   salted, in-memory hash for rate limiting.
   ========================================================================== */

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 8;
const hits = new Map<string, number[]>();

const RATE_LIMIT_SALT = randomUUID();

function clientKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  return createHash("sha256")
    .update(`${RATE_LIMIT_SALT}:${ip}`)
    .digest("hex")
    .slice(0, 16);
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );

  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5000) {
    for (const [otherKey, times] of hits) {
      if (times.every((time) => now - time >= RATE_LIMIT_WINDOW_MS)) {
        hits.delete(otherKey);
      }
    }
  }

  return recent.length > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  if (isRateLimited(clientKey(request))) {
    return NextResponse.json(
      { error: "Too many submissions just now. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Could not read the submitted form." },
      { status: 400 },
    );
  }

  const result = validateGrievance(body);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const supabase = getPublicClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "The grievance form is not available right now." },
      { status: 503 },
    );
  }

  // Only visitor-supplied fields are sent. `is_handled` is deliberately never
  // included, so a submission cannot mark itself as dealt with.
  const { error } = await supabase.from("site_contact_submissions").insert({
    name: result.value.name,
    email: result.value.email,
    phone: result.value.phone,
    subject: `Grievance — ${result.value.category}`,
    message: result.value.message,
  });

  if (error) {
    return NextResponse.json(
      { error: "We could not submit that just now. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
