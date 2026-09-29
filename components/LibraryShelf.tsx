"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { X } from "lucide-react";
import { library, type LibraryBook } from "@/content/library";

type Phase = "idle" | "fly" | "open" | "shut" | "back";

const FLY_MS = 640;
const OPEN_MS = 840;
const SHUT_MS = 620;
const BOOK_W = 330;

const availabilityClass = (value: LibraryBook["availability"]) =>
  value === "On shelf" ? "is-onshelf" : value === "Issued" ? "is-issued" : "is-reference";

export default function LibraryShelf() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [flight, setFlight] = useState<{ x: number; y: number; s: number } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const slots = useRef<Record<string, HTMLButtonElement | null>>({});
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<string | null>(null);
  const timers = useRef<number[]>([]);
  const instant = useRef(false);

  openRef.current = openId;

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  useEffect(() => {
    if (typeof window.matchMedia === "function") {
      instant.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return clearTimers;
  }, []);

  const pick = (item: LibraryBook) => {
    const slot = slots.current[item.id];
    const stage = stageRef.current;
    if (!slot || !stage) return;
    clearTimers();

    const box = slot.getBoundingClientRect();
    const area = stage.getBoundingClientRect();
    const width = Math.max(1, box.width - 6);

    setFlight({
      x: box.left + box.width / 2 - (area.left + area.width / 2),
      y: box.top + box.height / 2 - (area.top + area.height / 2),
      s: Math.min(0.42, Math.max(0.1, width / BOOK_W)),
    });
    setOpenId(item.id);
    setPhase("fly");
    later(() => setPhase("open"), instant.current ? 0 : FLY_MS);
  };

  const close = useCallback(() => {
    if (!openRef.current) return;
    clearTimers();
    setPhase("shut");
    later(() => setPhase("back"), instant.current ? 0 : SHUT_MS);
    later(() => {
      const id = openRef.current;
      setPhase("idle");
      setOpenId(null);
      setFlight(null);
      if (id) slots.current[id]?.focus();
    }, instant.current ? 0 : SHUT_MS + FLY_MS);
  }, []);

  useEffect(() => {
    if (!openId) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openId, close]);

  useEffect(() => {
    if (phase === "open") closeRef.current?.focus();
  }, [phase]);

  const active = library.row.books.find((item) => item.id === openId);
  const total = library.row.books.length;

  return (
    <div className="lib-scene" ref={stageRef}>
      <div className="lib-case" aria-label="Library shelves">
        <div className="lib-case-back" aria-hidden="true" />
        <div className="lib-case-light" aria-hidden="true" />

        <div className="lib-case-title">
          <h2>{library.row.title}</h2>
        </div>

        <div className="lib-case-scroll">
          <div className="lib-case-inner">
            <div className="lib-shelf">
              <div className="lib-shelf-books">
                {library.row.books.map((item, index) => {
                  const style = {
                    "--h": `${item.height}px`,
                    "--w": `${item.width}px`,
                    "--c": item.color,
                    "--a": item.accent,
                    "--tilt": item.tilt ? `${item.tilt}deg` : "0deg",
                    "--i": index,
                  } as CSSProperties;

                  return (
                    <button
                      type="button"
                      className={`lib-slot${item.tilt ? " lib-slot-tilt" : ""}${
                        openId && openId !== item.id ? " is-dim" : ""
                      }`}
                      style={style}
                      key={item.id}
                      ref={(node) => {
                        slots.current[item.id] = node;
                      }}
                      onClick={() => pick(item)}
                      aria-label={`${item.title} by ${item.author}. Open the book to see details.`}
                    >
                      <span className="lib-spine" aria-hidden="true">
                        <span className="lib-spine-pages" />
                        <span className="lib-spine-title">{item.title}</span>
                        <span className="lib-spine-mark" />
                        <span className="lib-spine-label">{item.callNumber}</span>
                      </span>
                      <span className="lib-slot-hint" aria-hidden="true">
                        Open
                      </span>
                    </button>
                  );
                })}
                <span className="lib-bookend" aria-hidden="true" />
                <span className="lib-plaque" aria-hidden="true">
                  {library.row.label}
                </span>
              </div>
              <div className="lib-plank" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="lib-case-side lib-case-side-l" aria-hidden="true" />
        <div className="lib-case-side lib-case-side-r" aria-hidden="true" />
        <div className="lib-case-base" aria-hidden="true" />
        <div className="lib-case-floor" aria-hidden="true" />
      </div>

      <p className="lib-hint">
        <span className="lib-hint-key">{total} volumes on show</span>
        {library.shelfNote}
      </p>

      {active ? (
        <div
          className="lib-reader"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} by ${active.author}`}
        >
          <div className="lib-scrim" onClick={close} aria-hidden="true" />

          <div
            className={`lib-fly is-${phase}`}
            style={
              {
                "--bx": `${flight?.x ?? 0}px`,
                "--by": `${flight?.y ?? 0}px`,
                "--bs": flight?.s ?? 1,
              } as CSSProperties
            }
          >
            <div
              className="lib-book"
              style={{ "--c": active.color, "--a": active.accent } as CSSProperties}
            >
              <div className="lib-pages">
                <div className="lib-page">
                  <span className="lib-page-cat">{active.category}</span>
                  <h3 className="lib-page-title">{active.title}</h3>
                  <p className="lib-page-author">{active.author}</p>
                  <span className="lib-page-rule" aria-hidden="true" />
                  <dl className="lib-page-meta">
                    <div>
                      <dt>Published</dt>
                      <dd>{active.year}</dd>
                    </div>
                    {active.edition ? (
                      <div>
                        <dt>Edition</dt>
                        <dd>{active.edition}</dd>
                      </div>
                    ) : null}
                    {active.publisher ? (
                      <div>
                        <dt>Publisher</dt>
                        <dd>{active.publisher}</dd>
                      </div>
                    ) : null}
                    {active.pages ? (
                      <div>
                        <dt>Extent</dt>
                        <dd>{active.pages}</dd>
                      </div>
                    ) : null}
                    {active.isbn ? (
                      <div>
                        <dt>ISBN</dt>
                        <dd>{active.isbn}</dd>
                      </div>
                    ) : null}
                  </dl>
                  <ul className="lib-page-tags">
                    {active.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <span className={`lib-page-avail ${availabilityClass(active.availability)}`}>
                    {active.availability}
                  </span>
                </div>
              </div>

              <div className="lib-cover">
                <div className="lib-cover-face">
                  <span className="lib-cover-band" aria-hidden="true" />
                  <span className="lib-cover-title">{active.title}</span>
                  <span className="lib-cover-author">{active.author}</span>
                  <span className="lib-cover-mark" aria-hidden="true" />
                </div>
                <div className="lib-cover-inside">
                  <span className="lib-endpaper" aria-hidden="true" />
                  <span className="lib-label">
                    <span className="lib-label-college">Royal College of Arts &amp; Science</span>
                    <span className="lib-label-rule" aria-hidden="true" />
                    <span className="lib-label-call">{active.callNumber}</span>
                    <span className="lib-label-bar" aria-hidden="true" />
                    <span className="lib-label-foot">Please return to the shelf after reading</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lib-reader-bar">
            <p className="lib-reader-note">
              <span className="lib-reader-note-title">{active.title}</span>
              {active.author} · {active.location}
            </p>
            <button type="button" className="lib-reader-close" onClick={close} ref={closeRef}>
              <X size={15} strokeWidth={2.4} aria-hidden="true" />
              Back to the shelf
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
