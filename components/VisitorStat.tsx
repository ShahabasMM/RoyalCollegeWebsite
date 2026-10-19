"use client";

import { Eye } from "lucide-react";

import { useVisitorCount } from "./VisitorProvider";

/**
 * The "Visitors" statistic on the home page.
 *
 * Unlike the other cards, its value is not stored in the CMS: it comes from the
 * site's own unique-visitor counter (see lib/visitors.ts). That is why it owns
 * its loading and unavailable states here. When the counter cannot be read the
 * card shows a dash rather than a made-up number.
 */
export default function VisitorStat({ index = 0 }: { index?: number }) {
  const { visitors, status } = useVisitorCount();

  return (
    <div className={`stat reveal reveal-delay-${Math.min(index + 1, 4)}`}>
      <span className="stat-icon">
        <Eye size={18} />
      </span>
      <strong>
        {status === "loading" ? (
          <span className="stat-skeleton" aria-hidden="true" />
        ) : visitors === null ? (
          <span aria-hidden="true">—</span>
        ) : (
          visitors.toLocaleString("en-US")
        )}
      </strong>
      <span className="stat-label">Visitors</span>
    </div>
  );
}
