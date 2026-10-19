"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";

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
  const [selected, setSelected] = useState<SiteGalleryItem | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!selected) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      openerRef.current?.focus();
    };
  }, [selected]);

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
              {item.instagramEmbedUrl ? (
                <span className="mg-instagram-viewport" aria-label={`${item.title} image preview`}>
                  <iframe
                    src={`${item.instagramEmbedUrl}?hidecaption=1`}
                    title={`${item.title} image preview`}
                    className="mg-tile-instagram"
                    loading="lazy"
                    scrolling="no"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  <span className="mg-tile-scrim" aria-hidden="true" />
                  <span className="mg-tile-meta">
                    <span className="mg-tile-cat">{item.category}</span>
                    <span className="mg-tile-caption">{item.title}</span>
                    {item.description ? (
                      <span className="mg-tile-text">{item.description}</span>
                    ) : null}
                  </span>
                </span>
              ) : (
                <>
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="mg-tile-media"
                    loading={position < 3 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  {!item.isInstagramSource && (
                    <>
                      <span className="mg-tile-scrim" aria-hidden="true" />
                      <span className="mg-tile-meta">
                        <span className="mg-tile-cat">{item.category}</span>
                        <span className="mg-tile-caption">{item.title}</span>
                        {item.description ? (
                          <span className="mg-tile-text">{item.description}</span>
                        ) : null}
                      </span>
                    </>
                  )}
                </>
              )}
            </>
          );

          const instagramTileClass = item.instagramEmbedUrl ? " mg-tile--instagram" : "";
          const className = `mg-tile${instagramTileClass} reveal reveal-delay-${(position % 4) + 1}`;

          return (
            <button
              key={item.id}
              type="button"
              className={className}
              aria-label={`Preview ${item.title}`}
              aria-haspopup="dialog"
              onClick={(event) => {
                openerRef.current = event.currentTarget;
                setSelected(item);
              }}
            >
              {body}
            </button>
          );
        })}
      </div>

      {selected ? (
        <div
          className="mg-preview-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <div
            className="mg-preview-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mg-preview-title"
            ref={dialogRef}
            tabIndex={-1}
          >
            <button
              type="button"
              className="mg-preview-close"
              aria-label="Close image preview"
              onClick={() => setSelected(null)}
            >
              <X size={20} aria-hidden="true" />
            </button>
            {selected.instagramEmbedUrl ? (
              <div className="mg-preview-instagram">
                <iframe
                  src={`${selected.instagramEmbedUrl}?hidecaption=1`}
                  title={`${selected.title} image preview`}
                  loading="eager"
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                className="mg-preview-image"
                src={selected.image}
                alt={selected.imageAlt}
              />
            )}
            <div className="mg-preview-copy">
              <span className="mg-preview-category">{selected.category}</span>
              <h2 id="mg-preview-title">{selected.title}</h2>
              {selected.description ? <p>{selected.description}</p> : null}
              {selected.linkUrl ? (
                <Link
                  className="mg-preview-link"
                  href={selected.linkUrl}
                  target={/^https?:\/\//.test(selected.linkUrl) ? "_blank" : undefined}
                  rel={/^https?:\/\//.test(selected.linkUrl) ? "noreferrer noopener" : undefined}
                >
                  Open link
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
