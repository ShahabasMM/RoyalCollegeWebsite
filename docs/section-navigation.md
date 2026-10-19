# Section (secondary) navigation

The contextual navigation bar that appears under the primary navbar and the
announcement ticker on every main section page — the section name on the left,
a divider, then that section's submenu links in a single row.

## Where it lives

| Concern | File |
| --- | --- |
| Section + item configuration | `content/sectionNav.ts` |
| The bar itself | `components/SectionSubnav.tsx` |
| Mount point (once, site-wide) | `app/layout.tsx`, right after `<FlashNewsTicker />` |
| Styles | `app/globals.css`, block headed "Section secondary navigation" |

A page does **not** opt in or wire anything up. `SectionSubnav` is a client
component rendered once from the root layout; it reads the current route with
`usePathname()` and decides which section (if any) to show.

## How a section is chosen

Each `SectionNav` has a `match` prefix. `findSection(pathname)` returns the
section whose prefix the route is inside (longest prefix wins when they could
overlap). Routes outside every section — home, `/news`, `/contact`, `/privacy`,
`/terms`, `/programs/*` — render nothing, which is why the bar never appears
where it does not belong.

The active pill is chosen by `findActiveItem(section, pathname)`: the most
specific item whose route is an ancestor of the current path, so nested routes
light up their parent. On the section overview itself (e.g. `/academics`) no
item matches and the section name on the left is highlighted instead.

## Adding or changing entries

Edit `content/sectionNav.ts`: add to a section's `items` (label, href, optional
`order` is implicit in array order), or add a whole section object. Every route
must exist under `app/` — the config deliberately contains no placeholder or
`href="#"` links. To add a new main section, give it an `id` (matching the future
CMS `menu_key`), a `label`, the `href` of its overview page, its `match` prefix,
and its `items`.

## Future CMS integration (RoyalAdmins ERP Website module)

The configuration is intentionally local and typed today, so the bar can never
break when the database is unavailable. It is designed to move to the CMS later
without touching the component:

- A section maps to a `menu_key` (the `id` above). The website would read
  `site_menu_items` where `menu_key = <id>` and `is_published = true`, ordered by
  `display_order`, exactly as the header's Student Zone menu already does
  (`lib/studentZoneMenuBuild.ts`, `lib/siteContent.ts`). Those rows would replace
  the section's `items`; the `SectionSubnav` component would not change.
- The planned schema (label, href, external_url, display_order, is_published)
  and its RLS/realtime/seed are described in
  [`student-zone-cms-contract.md`](./student-zone-cms-contract.md). That contract
  already covers the four fields an administrator would manage — title, route,
  order and visibility — so the same table serves every section.
- `findSection` falls back to this local config, so a missing table, an unset
  environment or an empty menu degrades to the current static bar.

No database is created or modified by the website; this document is the
integration point only.
