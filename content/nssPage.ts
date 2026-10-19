/**
 * Royal NSS — typed local configuration.
 *
 * This file holds the Royal NSS page's media sources, focus-area labels and the
 * fallback copy that keeps the page honest until staff publish real content.
 * Nothing here is a claim about completed activities: the Instagram entries are
 * *source references* to the college's own posts, not downloaded media.
 *
 * CMS conventions (no new tables, see docs/student-zone-cms-contract.md):
 *   - Leadership     `site_page_sections` rows (page_path = '/student-zone/nss')
 *                    with heading "Programme Officer" or "Student Leader" —
 *                    first body paragraph is the name; see NssLeadership.
 *   - Photographs    `site_gallery` rows with category = 'NSS'. Published rows
 *                    replace the Instagram placeholder cards in the scrapbook.
 *   - Reels / posts this file, until the schema grows a media table. The
 *                    smallest future change would be a `site_media_items` table
 *                    (kind: 'photo' | 'reel', source_url, page_path); it is
 *                    deliberately not proposed as a migration yet because the
 *                    scrapbook works with gallery rows and typed sources.
 */

export type NssPhotoSource = {
  id: string;
  /** Instagram shortcode, used for the official embed URL. */
  code: string;
  /** Original Instagram post — linked as the fallback action. */
  instagramUrl: string;
  /** Honest alt text: the card is a link to a post, not the photo itself. */
  alt: string;
  /** Short caption shown on the polaroid. Neutral by design. */
  caption: string;
  /** Pin rotation preset: a | b | c | d → -4deg | 2deg | -2deg | 5deg. */
  tilt: "a" | "b" | "c" | "d";
};

/**
 * One card on the scrapbook board, resolved by the page: a direct printed
 * photograph (CMS) or the official Instagram embed for a post.
 */
export type NssBoardPhoto =
  | {
      id: string;
      kind: "image";
      image: string;
      alt: string;
      title: string;
      linkUrl?: string;
    }
  | { id: string; kind: "embed"; code: string; title: string };

export type NssReel = {
  id: string;
  /** Instagram shortcode, used for the official embed URL. */
  code: string;
  /** Neutral label — no invented description of the reel's contents. */
  title: string;
  /** Original reel URL, used by the "Open on Instagram" action. */
  url: string;
};

export const NSS_TITLE = "ROYAL NSS";
export const NSS_FULL_FORM = "National Service Scheme";
export const NSS_PROFILE_URL = "https://www.instagram.com/royal_college_thrithala/";

/**
 * The four supplied Instagram posts. Instagram does not expose the original
 * media files, so the board renders the official `/p/{code}/embed/` iframe in
 * each polaroid — the real post preview, lazy-loaded — with a plain link back
 * to the post as the fallback. Staff photographs published in site_gallery
 * (category 'NSS') replace these with direct images.
 */
export const NSS_PHOTOS: NssPhotoSource[] = [
  {
    id: "post-1",
    code: "Ddy_uWxzJFa",
    instagramUrl: "https://www.instagram.com/p/Ddy_uWxzJFa/",
    alt: "Royal NSS post on Instagram (opens on Instagram)",
    caption: "Royal NSS · post 1",
    tilt: "a",
  },
  {
    id: "post-2",
    code: "DTIZwNREnyr",
    instagramUrl: "https://www.instagram.com/p/DTIZwNREnyr/",
    alt: "Royal NSS post on Instagram (opens on Instagram)",
    caption: "Royal NSS · post 2",
    tilt: "b",
  },
  {
    id: "post-3",
    code: "DS7LclmE-zM",
    instagramUrl: "https://www.instagram.com/p/DS7LclmE-zM/",
    alt: "Royal NSS post on Instagram (opens on Instagram)",
    caption: "Royal NSS · post 3",
    tilt: "c",
  },
  {
    id: "post-4",
    code: "DEMxaA6TyQn",
    instagramUrl: "https://www.instagram.com/p/DEMxaA6TyQn/",
    alt: "Royal NSS post on Instagram (opens on Instagram)",
    caption: "Royal NSS · post 4",
    tilt: "d",
  },
];

/** The four supplied reels. Embeds load only when a visitor presses play. */
export const NSS_REELS: NssReel[] = [
  {
    id: "reel-1",
    code: "DdssD4SzTdv",
    title: "Royal NSS reel",
    url: "https://www.instagram.com/reel/DdssD4SzTdv/",
  },
  {
    id: "reel-2",
    code: "DSr_mwYE-tM",
    title: "Royal NSS reel",
    url: "https://www.instagram.com/reel/DSr_mwYE-tM/",
  },
  {
    id: "reel-3",
    code: "DRhYwbvk2gS",
    title: "Royal NSS reel",
    url: "https://www.instagram.com/reel/DRhYwbvk2gS/",
  },
  {
    id: "reel-4",
    code: "DP4Eo6bE8xf",
    title: "Royal NSS reel",
    url: "https://www.instagram.com/reel/DP4Eo6bE8xf/",
  },
];

/** General focus-area labels — not a record of completed activities. */
export const NSS_ACTIVITIES = [
  { id: "community", label: "Community Service", icon: "heart-handshake" },
  { id: "environment", label: "Environmental Awareness", icon: "leaf" },
  { id: "health", label: "Health & Hygiene Awareness", icon: "stethoscope" },
  { id: "outreach", label: "Social Outreach", icon: "share-2" },
  { id: "campus", label: "Campus Volunteering", icon: "hand-heart" },
  { id: "leadership", label: "Leadership & Teamwork", icon: "users" },
] as const;

export type NssActivityIcon = (typeof NSS_ACTIVITIES)[number]["icon"];
