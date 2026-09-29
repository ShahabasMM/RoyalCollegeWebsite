/**
 * Only allow URLs that are safe to put in an href.
 *
 * Content in the CMS is editable by staff, but a stored `javascript:` URL would
 * execute in the visitor's browser if it were rendered as a link. Anything that
 * is not a site-relative path or an http(s) URL is rejected.
 *
 * Shared by the server fetchers and the browser realtime layer so both apply
 * exactly the same rule.
 */
export function safeHref(value: string | null | undefined): string | null {
  if (!value) return null;

  const trimmed = value.trim();

  if (!trimmed) return null;
  if (trimmed.startsWith("/")) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  return null;
}
