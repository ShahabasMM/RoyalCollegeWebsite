"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { SiteGalleryItem } from "@/lib/siteContent";

/**
 * The photo grid on /campus/gallery.
 *
 * Details are revealed on hover rather than behind a click: the tile is not a
 * button and does nothing on click. A black gradient rises from the bottom of
 * the photo carrying the title and description.
 *
 * Keyboard and touch both work without hover:
 *   - the tile is a link when the photo has one, so it stays focusable and the
 *     overlay is pinned open on :focus-visible the same way :hover pins it
 *   - on a touch screen there is no hover to wait for, so the overlay is always
 *     shown. That is the CSS half of this, in app/globals.css.
 */
export default function MediaGallery({ items }: { items: SiteGalleryItem[] }) {
  const [filter, setFilter] = useState<string>("All");

  // Built from the data rather than a fixed list, so a category added in the
  // admin produces a tab without a deploy.
  const categories = useMemo(() => {
    const found: string[] = [];

    for (const item of items) {
      if (!found.includes(item.category)) found.push(item.category);
    }

    return found;
  }, [items]);

  const visible = useMemo(
    () => (filter === "All" ? items : items.filter((item) => item.category === filter)),
    [filter, items],
  );

  // Filters have only ever shown this subset, so a filter that no longer
  // matches anything must fall back rather than leave the page blank.
  const tabs = filter === "All" || categories.includes(filter) ? ["All", ...categories] : ["All"];

  return (
    <div className="mg">
      {tabs.length > 1 ? (
        <div className="mg-filters" role="group" aria-label="Filter gallery">
          {tabs.map((name) => (
            <button
              type="button"
              key={name}
              className={`mg-filter${filter === name ? " is-active" : ""}`}
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
            >
              {name}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mg-grid">
        {visible.map((item, position) => {
          const body = (
            <>
              {/* A plain <img>, not next/image, and that is the point.
                  next/image only serves hosts on an allowlist, which would cap
                  the gallery at Drive and Unsplash. A plain tag has no
                  allowlist, so any image URL staff paste loads: their own
                  domain, a CDN, an S3 or Cloudinary link, anywhere. Drive links
                  are still rewritten by normaliseImageUrl before they get here.
                  Matches how ProgrammeCards and WelcomePopup render CMS images. */}
              <img
                src={item.image}
                alt={item.imageAlt}
                className="mg-tile-media"
                loading={position < 3 ? "eager" : "lazy"}
                decoding="async"
              />
              <span className="mg-tile-scrim" aria-hidden="true" />
              <span className="mg-tile-meta">
                <span className="mg-tile-cat">{item.category}</span>
                <span className="mg-tile-caption">{item.title}</span>
                {item.description ? (
                  <span className="mg-tile-text">{item.description}</span>
                ) : null}
              </span>
            </>
          );

          const className = `mg-tile reveal reveal-delay-${(position % 4) + 1}`;

          // The whole tile is the link only when staff gave the photo one.
          // Otherwise it is a plain div, so nothing on the page pretends to be
          // clickable when it is not.
          return item.linkUrl ? (
            <Link
              key={item.id}
              className={className}
              href={item.linkUrl}
              {...(/^https?:\/\//.test(item.linkUrl)
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
            >
              {body}
            </Link>
          ) : (
            <div key={item.id} className={className}>
              {body}
            </div>
          );
        })}
      </div>
    </div>
  );
}