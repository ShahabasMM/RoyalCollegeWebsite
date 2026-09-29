"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GalleryCategory, GalleryItem } from "@/content/gallery";

const SWIPE_THRESHOLD = 48;

export default function MediaGallery({ items }: { items: GalleryItem[] }) {
  const categories = useMemo(() => {
    const found: GalleryCategory[] = [];
    for (const item of items) {
      if (!found.includes(item.category)) {
        found.push(item.category);
      }
    }
    return found;
  }, [items]);

  const [filter, setFilter] = useState<GalleryCategory | "All">("All");
  const [active, setActive] = useState<number | null>(null);
  const [muted, setMuted] = useState(true);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const touchStart = useRef<number | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? items : items.filter((item) => item.category === filter)),
    [filter, items],
  );

  const isOpen = active !== null;
  const current = isOpen ? visible[active] : undefined;

  const close = useCallback(() => setActive(null), []);

  const step = useCallback(
    (delta: number) =>
      setActive((value) =>
        value === null ? value : (value + delta + visible.length) % visible.length,
      ),
    [visible.length],
  );

  useEffect(() => {
    setActive(null);
  }, [filter]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
      if (event.key === "ArrowRight") {
        step(1);
      }
      if (event.key === "ArrowLeft") {
        step(-1);
      }
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [isOpen, close, step]);

  useEffect(() => {
    if (isOpen) {
      closeRef.current?.focus();
      return;
    }
    triggerRef.current?.focus();
  }, [isOpen]);

  return (
    <div className="mg">
      <div className="mg-filters" role="group" aria-label="Filter gallery">
        {(["All", ...categories] as const).map((name) => (
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

      <div className="mg-grid">
        {visible.map((item, position) => (
          <button
            type="button"
            key={item.id}
            className={`mg-tile mg-tile-${item.ratio} reveal reveal-delay-${(position % 4) + 1}`}
            onClick={(event) => {
              triggerRef.current = event.currentTarget;
              setActive(position);
            }}
            aria-label={`Open ${item.caption}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 30vw"
              className="mg-tile-media"
            />
            <span className="mg-tile-scrim" />
            {item.kind === "reel" ? (
              <span className="mg-play" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M8 5.5v13l11-6.5z" />
                </svg>
              </span>
            ) : null}
            <span className="mg-tile-meta">
              <span className="mg-tile-cat">{item.category}</span>
              <span className="mg-tile-caption">{item.caption}</span>
            </span>
          </button>
        ))}
      </div>

      {isOpen && current ? (
        <div
          className="mg-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              close();
            }
          }}
          onTouchStart={(event) => {
            touchStart.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const start = touchStart.current;
            const end = event.changedTouches[0]?.clientX;
            touchStart.current = null;
            if (start === null || end === undefined) {
              return;
            }
            const delta = end - start;
            if (Math.abs(delta) < SWIPE_THRESHOLD) {
              return;
            }
            step(delta < 0 ? 1 : -1);
          }}
        >
          <button
            type="button"
            ref={closeRef}
            className="mg-lb-close"
            onClick={close}
            aria-label="Close gallery"
          >
            <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <button
            type="button"
            className="mg-lb-nav mg-lb-prev"
            onClick={() => step(-1)}
            aria-label="Previous item"
          >
            <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>

          <figure className="mg-lb-figure" key={current.id}>
            <div className="mg-lb-stage">
              {current.video ? (
                <video
                  key={current.id}
                  className="mg-lb-media"
                  src={current.video}
                  poster={current.src}
                  controls
                  autoPlay
                  muted={muted}
                  playsInline
                  preload="metadata"
                />
              ) : (
                <Image
                  key={current.id}
                  className="mg-lb-media"
                  src={current.src}
                  alt={current.alt}
                  width={current.width}
                  height={current.height}
                  sizes="100vw"
                  priority
                />
              )}
            </div>

            {current.kind === "reel" && !current.video ? (
              <a
                className="mg-lb-cta"
                href={current.permalink}
                target="_blank"
                rel="noreferrer noopener"
              >
                <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.4A6.4 6.4 0 1 0 18.4 12 6.4 6.4 0 0 0 12 5.6zm0 10.6A4.2 4.2 0 1 1 16.2 12 4.2 4.2 0 0 1 12 16.2zm6.6-10.9a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5z" />
                </svg>
                {current.kind === "reel" ? "Watch the reel on Instagram" : "Open on Instagram"}
              </a>
            ) : null}

            <figcaption className="mg-lb-caption">
              <div className="mg-lb-text">
                <span className="mg-lb-cat">{current.category}</span>
              </div>
              <div className="mg-lb-actions">
                {current.video ? (
                  <button
                    type="button"
                    className="mg-lb-ghost"
                    onClick={() => setMuted((value) => !value)}
                  >
                    {muted ? "Unmute" : "Mute"}
                  </button>
                ) : null}
                {current.kind === "image" ? (
                  <a
                    className="mg-lb-ghost"
                    href={current.permalink}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    View on Instagram
                  </a>
                ) : null}
              </div>
            </figcaption>
          </figure>

          <button
            type="button"
            className="mg-lb-nav mg-lb-next"
            onClick={() => step(1)}
            aria-label="Next item"
          >
            <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="mg-lb-strip">
            {visible.map((item, position) => (
              <button
                type="button"
                key={item.id}
                className={`mg-lb-thumb${position === active ? " is-active" : ""}`}
                onClick={() => setActive(position)}
                aria-label={item.caption}
                aria-current={position === active}
              >
                <Image src={item.src} alt="" fill sizes="120px" />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
