/**
 * Normalise CMS image URLs, with support for Google Drive links.
 *
 * Staff routinely paste whatever the browser address bar shows them. For Drive
 * that is nearly always a *page* URL rather than an image:
 *
 *   https://drive.google.com/file/d/1AbC.../view?usp=sharing
 *   https://drive.google.com/open?id=1AbC...
 *   https://drive.google.com/uc?export=view&id=1AbC...
 *
 * None of those work in an <img> or next/image: they return an HTML page, so
 * the image silently fails to load. Only the file id matters, and it can be
 * turned into a direct image URL on lh3.googleusercontent.com, which is the
 * host Google serves image bytes from.
 *
 * A file shared as "Restricted" or "Private" is NOT reachable this way: the
 * fetch is anonymous, so Google answers 403 and the image stays blank. It has
 * to be shared as "Anyone with the link".
 */

/** Hosts that serve image bytes directly, so no rewriting is needed. */
const DIRECT_HOSTS = [
  "googleusercontent.com",
  "drive.google.com",
  "docs.google.com",
];

/** Pull the file id out of whichever Drive link format was pasted. */
function driveFileId(value: string): string | null {
  // /file/d/<id>/view and the other /d/<id> path forms
  const byPath = /\/d\/([a-zA-Z0-9_-]{10,})/.exec(value);
  if (byPath) return byPath[1];

  // ?id=<id>, used by /open, /uc, /thumbnail and the share dialog
  const byQuery = /[?&]id=([a-zA-Z0-9_-]{10,})/.exec(value);
  if (byQuery) return byQuery[1];

  return null;
}

function hostnameOf(value: string): string {
  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function isDriveHost(host: string): boolean {
  return (
    host.endsWith("googleusercontent.com") ||
    host === "drive.google.com" ||
    host === "docs.google.com"
  );
}

/**
 * Hosts that serve an image at a predictable path, so a shared *page* URL can be
 * turned into the image itself.
 *
 * Pinterest and Facebook links pasted from the address bar are HTML pages, not
 * images, so an <img> would fail on them exactly as it does on Drive. Both have
 * a documented image path built from the id already present in the shared URL,
 * so the id is all that is needed.
 */
function socialImageUrl(host: string, trimmed: string): string | null {
  // https://www.pinterest.com/pin/1234567890/  and  /pin/1234567890/
  if (host === "pinterest.com" || host.endsWith(".pinterest.com")) {
    const id = /\/pin\/(\d+)/.exec(trimmed)?.[1];

    // The /pin/<id>/ path is the pin's own page. i.pinimg.com serves the bytes,
    // and /originals/ keeps full resolution rather than the scaled copy.
    return id ? `https://i.pinimg.com/originals/${id}.jpg` : null;
  }

  // Facebook photo URLs put the photo id in the path, e.g.
  // https://www.facebook.com/photo/?fref=...&id=1234567890
  if (host === "facebook.com" || host.endsWith(".facebook.com")) {
    const id = /[?&]id=(\d{6,})/.exec(trimmed)?.[1];

    return id ? `https://graph.facebook.com/${id}/picture?width=1200` : null;
  }

  return null;
}

/**
 * True when the URL needs rewriting before a browser can render it. Anything
 * else is treated as a direct image URL and passed through untouched, which is
 * what lets an arbitrary host work.
 */
function needsRewrite(host: string): boolean {
  return (
    isDriveHost(host) ||
    SHARE_PAGE_HOSTS.has(host) ||
    host === "pinterest.com" ||
    host.endsWith(".pinterest.com") ||
    host === "facebook.com" ||
    host.endsWith(".facebook.com")
  );
}

/**
 * Additional hosts that hand out page URLs.
 *
 * Unsplash and most CDNs put the image itself in the URL staff copy, so they
 * are deliberately absent. Google Images links are the exception staff hit
 * often: the address bar shows a /imgres search page, which is not an image.
 */
const SHARE_PAGE_HOSTS = new Set([
  "images.google.com",
  "google.com",
  "www.google.com",
  "lens.google.com",
]);

/**
 * Returns an image URL a browser can actually load, or null when the value is
 * unusable. Never throws, and never returns a non-http(s) URL.
 */
export function normaliseImageUrl(value: string | null | undefined): string | null {
  if (!value) return null;

  let trimmed = value.trim();

  if (!trimmed) return null;

  // Site-relative paths (/images/foo.jpg) are already usable.
  if (trimmed.startsWith("/")) return trimmed;

  // A bare "drive.google.com/..." with no scheme, which staff do paste.
  if (/^[\w-]+(\.[\w-]+)+\//.test(trimmed)) {
    trimmed = `https://${trimmed}`;
  }

  if (!/^https?:\/\//i.test(trimmed)) return null;

  const host = hostnameOf(trimmed);

  if (!host) return null;

  // Pinterest and Facebook share links are pages; rewrite them to image bytes.
  const social = socialImageUrl(host, trimmed);
  if (social) return social;

  // Anything that is not a share page is assumed to be a direct image URL and
  // is handed back untouched. That is deliberate: there is no allowlist, so an
  // image on any host works, including your own domain and unknown CDNs.
  if (!needsRewrite(host)) return trimmed;

  // A Google Images search link has no single image behind it. Refusing it is
  // better than pointing at a page, which renders as a broken image either way.
  if (SHARE_PAGE_HOSTS.has(host)) return null;

  // Already a direct image host, so pass it through as-is.
  if (host.endsWith("googleusercontent.com")) return trimmed;

  const id = driveFileId(trimmed);

  if (!id) return null;

  // w2000 is wide enough for a hero crop and still a sane download size.
  return `https://lh3.googleusercontent.com/d/${id}=w2000`;
}

/** True when the URL is served by Google, for the next/image allowlist. */
export function isGoogleImageHost(value: string | null | undefined): boolean {
  if (!value) return false;

  const host = hostnameOf(value.trim().startsWith("/") ? `https://x${value}` : value);

  return DIRECT_HOSTS.some((entry) => host === entry || host.endsWith(`.${entry}`));
}
