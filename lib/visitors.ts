import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/* ==========================================================================
   Visitor counter (server use only).

   The counter lives in Supabase behind two functions (see
   supabase/website_visitor_counter.sql). This module is imported only by
   app/api/visits/route.ts, runs on the server, and uses the same publishable
   (anon) key as the rest of the site. No service-role key is involved, so
   nothing privileged can leak into the browser bundle.

   Every call degrades to null when Supabase is unconfigured or the SQL has not
   been run yet, and the UI treats null as "unavailable" rather than inventing
   a number.
   ========================================================================== */

let cached: SupabaseClient | null | undefined;

function getClient(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    cached = null;
    return cached;
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    // The count must be live, never a cached fetch.
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });

  return cached;
}

/** True when the site has enough configuration to attempt a count at all. */
export const VISITOR_COUNT_READY = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

/** postgres bigint arrives as a number or a string depending on size. */
function toCount(value: unknown): number | null {
  const count = typeof value === "number" ? value : Number(value);

  return Number.isFinite(count) && count >= 0 ? Math.floor(count) : null;
}

/**
 * Records a unique visitor id and returns the new total.
 *
 * Idempotent: a returning visitor conflicts on the primary key and the total is
 * unchanged. Throws only on a transport/query error, which the route turns into
 * an "unavailable" response.
 */
export async function recordSiteVisit(visitorId: string): Promise<number | null> {
  const supabase = getClient();

  if (!supabase) return null;

  const { data, error } = await supabase.rpc("record_site_visit", {
    p_visitor_id: visitorId,
  });

  if (error) throw error;

  return toCount(data);
}

/** Reads the total without recording anything. */
export async function getSiteVisitorCount(): Promise<number | null> {
  const supabase = getClient();

  if (!supabase) return null;

  const { data, error } = await supabase.rpc("site_visitor_count");

  if (error) throw error;

  return toCount(data);
}
