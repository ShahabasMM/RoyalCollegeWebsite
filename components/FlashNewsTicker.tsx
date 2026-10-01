"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useFlashNews } from "./SiteLiveProvider";
import type { LiveFlashNotice } from "@/lib/liveData";

/**
 * Copies of the notice list rendered before the browser has measured anything.
 *
 * Only on screen for the single frame before the effect below runs, and it is
 * already the correct count for the usual case: a set of notices wider than the
 * bar needs exactly two copies.
 */
const FALLBACK_REPEATS = 2;

/**
 * Reading-speed pacing, so a long notice is not a blur.
 *
 * Shorter per-character time than before: the bar is a headline strip, not
 * body copy, and a notice should be readable in one pass rather than three.
 *
 * Each cycle travels one group's width, so the character count is what the
 * reader actually experiences per pass.
 */
function scrollDuration(notices: LiveFlashNotice[]) {
  const chars = notices.reduce((total, item) => total + item.message.length, 0);
  const seconds = 8 + chars * 0.032;

  return Math.min(34, Math.max(12, Math.round(seconds)));
}

/**
 * Scrolling flash bar, shown directly below the header.
 *
 * Notices travel right to left: each one enters past the right edge of the bar,
 * slides across and disappears off the left, then the next copy arrives from
 * the right to take its place.
 *
 * The track holds the notice list repeated enough times to always be wider than
 * the bar, and one cycle translates it by exactly one group width. Because each
 * group carries its own trailing gap, group N lands precisely on group N-1's
 * start position, so the loop restarts with no seam and the bar is never empty.
 */
export default function FlashNewsTicker() {
  const notices = useFlashNews();

  /*
   * Keep the bar mounted at all times, even with no notices.
   *
   * Returning null used to unmount the whole element. On a slow or failing
   * first paint the server sends an empty list, the bar disappears, and the
   * client only ever fills it in when a *change* arrives - so a plain
   * refresh could leave it missing. Rendering the shell unconditionally
   * means there is always a target to fill, and the notices simply fade in
   * once they arrive.
   */
  const hasNotices = notices.length > 0;

  const viewportRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLUListElement>(null);

  const [repeats, setRepeats] = useState(FALLBACK_REPEATS);
  /* Null until measured; the CSS falls back to -50% for that first frame. */
  const [shift, setShift] = useState<string | null>(null);

  /*
   * Two things have to be measured, and only the browser knows them.
   *
   * How many copies are needed: a short notice can be narrower than the bar, in
   * which case a fixed two copies would scroll off the left and reappear on the
   * left instead of coming in from the right.
   *
   * How far to travel: a percentage of the track is not one group, so the loop
   * used to land a fraction of a gap short and jump on every restart. An exact
   * pixel measurement is what makes the repeat land back on the start position.
   */
  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;

    if (!viewport || !group) return;

    const groupWidth = group.getBoundingClientRect().width;
    const visibleWidth = viewport.clientWidth;

    if (groupWidth <= 0 || visibleWidth <= 0) return;

    // One copy more than the bar can show, so a group is always waiting off the
    // right edge to scroll in once the group on the left has gone.
    setRepeats(Math.ceil(visibleWidth / groupWidth) + 1);
    // Exactly one group per cycle. The gap between groups lives at the end of
    // each group, which is what makes this the right distance to travel.
    setShift(`-${Math.round(groupWidth)}px`);
  }, []);

  useEffect(() => {
    if (!hasNotices) return;

    measure();

    // A web font swapping in after first paint changes the measured width, and
    // an off-by-a-fraction would show as a seam at every loop restart.
    if (typeof document !== "undefined") void document.fonts?.ready.then(measure);

    const viewport = viewportRef.current;
    const group = groupRef.current;

    if (!viewport || !group || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(group);

    return () => observer.disconnect();
  }, [hasNotices, notices, measure]);

  const duration = scrollDuration(notices);

  const item = (notice: LiveFlashNotice, index: number) => {
    const body = (
      <>
        <span className="flashText">{notice.message}</span>
        {notice.linkUrl ? <span className="flashGo" aria-hidden="true">→</span> : null}
      </>
    );

    return (
      <li className="flashItem" key={`${index}-${notice.message.slice(0, 24)}`}>
        {notice.linkUrl ? (
          <a className="flashLink" href={notice.linkUrl}>
            {body}
          </a>
        ) : (
          <span className="flashLink">{body}</span>
        )}
      </li>
    );
  };

  return (
    <aside
      className="flash"
      data-empty={hasNotices ? undefined : "true"}
      aria-label="Flash news"
    >
      <div className="flashInner">
        <p className="flashTag">
          <span className="flashDot" aria-hidden="true" />
          Flash
        </p>

        <div className="flashViewport" ref={viewportRef}>
          {hasNotices ? (
            <div
              className="flashTrack"
              style={
                {
                  "--flash-duration": `${duration}s`,
                  ...(shift ? { "--flash-shift": shift } : {}),
                } as CSSProperties
              }
            >
              {Array.from({ length: repeats }, (_, copy) => (
                /*
                 * Only the first copy is announced; the rest are the same
                 * notices arriving again on the next pass.
                 */
                <ul
                  className="flashGroup"
                  key={copy}
                  ref={copy === 0 ? groupRef : undefined}
                  aria-hidden={copy === 0 ? undefined : "true"}
                >
                  {notices.map(item)}
                </ul>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}