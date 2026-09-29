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

  // Not Google: hand it back untouched and let next/image decide.
  if (!isDriveHost(host)) return trimmed;

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
