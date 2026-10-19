# Home page visitor counter

The home page statistics bar ends with a **Visitors** card. Unlike the other
three cards it is not stored in `site_stat`: its value comes from the site's own
unique-visitor counter, served by `GET`/`POST /api/visits`.

## What is counted

**Distinct unique visitors** — each browser is counted once.

- On the first visit the API (`app/api/visits/route.ts`) generates a random
  UUID and sets it as a first-party, `httpOnly` cookie (`rc_visitor`, one year).
- The id is stored once in `public.site_visitors`. Repeat visits conflict on the
  primary key and change nothing, so the total only moves for a new browser.
- The value shown is `count(*)` over that table.

This is a pragmatic unique-visitor metric, not a count of people: one person on
two browsers counts twice, and clearing cookies counts again. It is documented
as such rather than overclaimed.

## What is *not* stored

No IP address, name, email, user agent, device fingerprint or any other personal
data is written anywhere. The only stored value is a random UUID that has no
meaning on its own.

- Rate limiting keeps a per-process salt hash of the client IP in memory only,
  never persisted, and raw IPs are never logged or stored.
- The counter table has RLS enabled with **no** policies, so the anon key cannot
  read or write it directly. All access goes through two `SECURITY DEFINER`
  functions that anon may execute but not inspect.

## Why nothing increments on the server

The counter is only ever moved by `POST /api/visits`, which is called from a
client effect (`components/VisitorProvider.tsx`, mounted once in the root
layout). Server renders, prerenders and the build never call it. A shared
in-flight request absorbs React StrictMode's double-invoked effect in
development while still letting the active effect receive the response. The
server also deduplicates by cookie, so refreshes and repeat calls cannot
inflate the number.

## Bots, abuse and rate limiting

- Known crawlers and clients with no `User-Agent` are detected and receive the
  current total **without** being recorded.
- New callers are rate-limited per client (hashed IP, in-memory, ~30 requests
  per minute per server instance). A throttled caller gets the current total
  rather than a new count.
- The limiter is per-instance and best-effort; the primary guard against
  inflation is the per-browser cookie plus the database's unique constraint.

## Fallbacks

`lib/visitors.ts` returns `null` whenever Supabase is unconfigured or the SQL
below has not been run, and the route answers `{ "visitors": null }`. The card
then shows a dash (`—`) rather than a made-up number, and the rest of the site
is unaffected.

## Setup

Run `supabase/website_visitor_counter.sql` once in the Supabase SQL editor, in
the same project the site already reads (`NEXT_PUBLIC_SUPABASE_URL`). It is
idempotent (`create ... if not exists` / `create or replace`) and creates:

| Object | Purpose |
| --- | --- |
| `public.site_visitors` | one row per unique visitor id (RLS on, no policies) |
| `record_site_visit(uuid) → bigint` | inserts if new, returns the total |
| `site_visitor_count() → bigint` | read-only total for `GET` |

No new environment variables and no service-role key are required: the route
uses the same publishable (anon) key as the rest of the site and only calls
these two functions.

## Files

| File | Role |
| --- | --- |
| `supabase/website_visitor_counter.sql` | table + RPC functions to run in Supabase |
| `lib/visitors.ts` | server-side record/read helpers (anon key, server only) |
| `app/api/visits/route.ts` | `GET` read, `POST` record; bot + rate-limit + cookie dedup |
| `components/VisitorProvider.tsx` | client context, one `POST` per document load |
| `components/VisitorStat.tsx` | the card, with loading and unavailable states |
| `lib/siteContent.ts` → `getStats()` | swaps the "Faculty mentors" row for "Visitors" |
| `components/HomePage.tsx` | renders `VisitorStat` for that row |
