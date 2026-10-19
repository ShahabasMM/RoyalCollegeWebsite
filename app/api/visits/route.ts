import { createHash, randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

import {
  getSiteVisitorCount,
  recordSiteVisit,
  VISITOR_COUNT_READY,
} from "@/lib/visitors";

export const dynamic = "force-dynamic";

/* ==========================================================================
   /api/visits — the public website's own unique-visitor counter.

   GET  reads the total without recording anything.
   POST records the caller once (deduplicated) and returns the total.

   Design notes:
     - Nothing here runs during a server render or a build. The only caller is
       the client VisitorProvider, so the count cannot move from SSR or a
       prerender pass.
     - A visitor is identified by a random first-party id stored in an httpOnly
       cookie. No IP, name, email or fingerprint is stored; the unique-visitor
       metric is "distinct first-party browser ids", which is documented in
       docs/visitor-counter.md rather than overclaimed as people.
     - Known bots and crawlers are detected from the User-Agent and return the
       current total without being recorded.
     - New callers are rate-limited per client (hashed, in-memory, never
       persisted) so a script cannot inflate the number quickly.
   ========================================================================== */

const VISITOR_COOKIE = "rc_visitor";
/** One year — the practical lifetime of a "unique visitor". */
const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Substrings that mark an automated client. Matched case-insensitively. */
const BOT_RE =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|whatsapp|telegram|headless|lighthouse|pagespeed|monitor|uptime|pingdom|curl|wget|libwww|python-requests|python-urllib|go-http-client|java\/|okhttp|axios|node-fetch|undici|phantom|puppeteer|playwright/i;

/**
 * Treat a missing User-Agent as automated. Real browsers always send one, and
 * command-line clients that omit it are exactly what we do not want to count.
 */
function looksLikeBot(userAgent: string | null): boolean {
  if (!userAgent || userAgent.trim() === "") return true;

  return BOT_RE.test(userAgent);
}

/* ---- Rate limiting (best effort, per server instance) -------------------- */

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 30;
const hits = new Map<string, number[]>();

/**
 * A per-process salt keeps the limiter key from being a stored IP address: the
 * map only ever holds a salted hash, and only for the life of the process. Raw
 * IPs are never written down.
 */
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

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [otherKey, times] of hits) {
      if (times.every((time) => now - time >= RATE_LIMIT_WINDOW_MS)) {
        hits.delete(otherKey);
      }
    }
  }

  return recent.length > RATE_LIMIT_MAX;
}

/* ---- Handlers ------------------------------------------------------------ */

/** Reads the total without recording. Safe to call repeatedly. */
export async function GET() {
  if (!VISITOR_COUNT_READY) {
    return NextResponse.json({ visitors: null });
  }

  try {
    return NextResponse.json({ visitors: await getSiteVisitorCount() });
  } catch {
    return NextResponse.json({ visitors: null });
  }
}

/** Records the visitor once and returns the total. */
export async function POST(request: NextRequest) {
  if (!VISITOR_COUNT_READY) {
    return NextResponse.json({ visitors: null });
  }

  const existing = request.cookies.get(VISITOR_COOKIE)?.value;
  const isKnownVisitor = Boolean(existing && UUID_RE.test(existing));

  // Only brand-new callers are rate-limited. A caller that already holds a
  // cookie does not increment anything, so it is never throttled.
  const suppressRecord =
    looksLikeBot(request.headers.get("user-agent")) ||
    (!isKnownVisitor && isRateLimited(clientKey(request)));

  try {
    if (suppressRecord) {
      return NextResponse.json({ visitors: await getSiteVisitorCount() });
    }

    const visitorId = isKnownVisitor ? (existing as string) : randomUUID();
    const visitors = await recordSiteVisit(visitorId);

    const response = NextResponse.json({ visitors });

    if (!isKnownVisitor) {
      response.cookies.set(VISITOR_COOKIE, visitorId, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: VISITOR_COOKIE_MAX_AGE,
      });
    }

    return response;
  } catch {
    // Never fail the page over a counter.
    return NextResponse.json({ visitors: null });
  }
}
