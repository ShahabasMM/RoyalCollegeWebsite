"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser-side Supabase client, used only for Realtime subscriptions.
 *
 * The public site has no signed-in user, so this runs as `anon`. That is not a
 * problem: the RLS policies on the site_* tables only expose published rows to
 * anon, so the subscription can never deliver a draft or an enquiry.
 *
 * Deliberately separate from lib/siteContent.ts, which pulls in the hardcoded
 * fallback content and must not end up in the browser bundle.
 */
let cached: SupabaseClient | null | undefined;

export function getBrowserClient(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    cached = null;
    return cached;
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    realtime: { params: { eventsPerSecond: 10 } },
  });

  return cached;
}

export const REALTIME_READY =
  Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
