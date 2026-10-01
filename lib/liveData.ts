"use client";

import { getBrowserClient } from "./browserClient";
import { safeHref } from "./safeHref";

export type LiveFlashNotice = {
  message: string;
  linkUrl: string | null;
};

const SETTINGS_ID = "00000000-0000-0000-0000-0000000000ff";

/**
 * Re-reads the Apply now switch after a realtime change.
 *
 * Returns null when the read fails, so the caller keeps its current value
 * rather than defaulting to a state the admin may not have chosen. Defaulting
 * to false here would strip every apply button off a live admissions site.
 */
export async function fetchLiveApplyEnabled(): Promise<boolean | null> {
  const supabase = getBrowserClient();

  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("apply_enabled")
      .eq("id", SETTINGS_ID)
      .maybeSingle();

    if (error || !data) return null;

    return typeof data.apply_enabled === "boolean" ? data.apply_enabled : null;
  } catch {
    return null;
  }
}

/** Re-reads the published flash notices after a realtime change. */
export async function fetchLiveFlashNews(): Promise<LiveFlashNotice[] | null> {
  const supabase = getBrowserClient();

  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from("site_flash_news")
      .select("message, link_url")
      .eq("is_published", true)
      .order("display_order", { ascending: true, nullsFirst: false });

    if (error || !Array.isArray(data)) return null;

    return data
      .filter(
        (row) =>
          typeof row.message === "string" && row.message.trim() !== "",
      )
      .map((row) => ({
        message: row.message.trim(),
        linkUrl: safeHref(row.link_url),
      }));
  } catch {
    return null;
  }
}

/* ==========================================================================
   Content stamp

   One small request that says whether any published content changed. The site
   polls this instead of re-reading every table, so the fallback costs one
   request per interval rather than eight.

   Shape returned by the site_content_stamp() SQL function:
     { "apply": true, "content": { "site_news": "<maxUpdated>:<count>", ... } }
   ========================================================================== */

export type ContentStamp = {
  /** null when the database did not report a value. */
  apply: boolean | null;
  content: Record<string, string>;
};

/** Tables whose stamp change should re-render the current page. */
const PAGE_STAMP_KEYS = [
  "site_departments",
  "site_faculty",
  "site_programmes",
  "site_academic_calendar",
  "site_addon_courses",
  "site_news",
  "site_pages",
  // Gallery edits replace the whole photo list, so they are a page-level change
  // rather than a chrome-level one.
  "site_gallery",
];

const FLASH_KEY = "site_flash_news";

/**
 * Returns the current stamp, or null if the helper function is not installed
 * yet. Callers fall back to reading the settings table directly.
 */
export async function fetchContentStamp(): Promise<ContentStamp | null> {
  const supabase = getBrowserClient();

  if (!supabase) return null;

  try {
    const { data, error } = await supabase.rpc("site_content_stamp");

    if (error || !data || typeof data !== "object") return null;

    const raw = data as { apply?: unknown; content?: unknown };
    const content: Record<string, string> = {};

    if (raw.content && typeof raw.content === "object") {
      for (const [key, value] of Object.entries(
        raw.content as Record<string, unknown>,
      )) {
        if (typeof value === "string") content[key] = value;
      }
    }

    return {
      apply: typeof raw.apply === "boolean" ? raw.apply : null,
      content,
    };
  } catch {
    return null;
  }
}

/** Compares only the keys both stamps actually report. */
function changed(a: ContentStamp, b: ContentStamp, keys: string[]) {
  return keys.some((key) => key in a.content && a.content[key] !== b.content[key]);
}

export function pageContentChanged(a: ContentStamp, b: ContentStamp) {
  return changed(a, b, PAGE_STAMP_KEYS);
}

export function flashContentChanged(a: ContentStamp, b: ContentStamp) {
  return changed(a, b, [FLASH_KEY]);
}
