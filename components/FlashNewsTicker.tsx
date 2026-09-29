"use client";

import { useFlashNews } from "./SiteLiveProvider";
import type { LiveFlashNotice } from "@/lib/liveData";

/** Rough reading-speed pacing, so a long notice is not a blur. */
function scrollDuration(notices: LiveFlashNotice[]) {
  const chars = notices.reduce((total, item) => total + item.message.length, 0);
  const seconds = 18 + chars * 0.055;

  return Math.min(70, Math.max(24, Math.round(seconds)));
}

/**
 * Scrolling flash bar shown above the header.
 *
 * The notice list is rendered twice and the track is translated by exactly
 * -50%, so when the animation restarts the second copy is pixel-identical to
 * where the first one started. That makes the loop seamless with no JS, no
 * layout thrash and no layout shift while it moves.
 */
export default function FlashNewsTicker() {
  const notices = useFlashNews();

  if (!notices.length) return null;

  const duration = scrollDuration(notices);

  const items = notices.map((notice, index) => {
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
  });

  return (
    <aside className="flash" aria-label="Flash news">
      <div className="flashInner">
        <p className="flashTag">
          <span className="flashDot" aria-hidden="true" />
          Flash
        </p>

        <div className="flashViewport">
          <div
            className="flashTrack"
            style={{ "--flash-duration": `${duration}s` } as React.CSSProperties}
          >
            <ul className="flashGroup">{items}</ul>
            {/* Duplicate for the seamless loop. Hidden from screen readers. */}
            <ul className="flashGroup" aria-hidden="true">
              {items}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}
