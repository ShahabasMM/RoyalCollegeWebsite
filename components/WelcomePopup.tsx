"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight } from "lucide-react";

export type WelcomePopupContent = {
  id: string;
  eyebrow: string | null;
  title: string;
  description: string | null;
  image: string | null;
  imageAlt: string | null;
  buttonLabel: string | null;
  buttonUrl: string | null;
  /** When true a visitor sees the popup once; when false, on every visit. */
  showOnce: boolean;
};

const DISMISS_KEY_PREFIX = "rc.welcome.dismissed:";

/**
 * A welcome popup for the home page.
 *
 * Two modes, chosen in the admin:
 *
 * Always (showOnce false, the default): the popup reappears on every visit, so
 * refreshing the page brings it back. This is the usual choice for anything
 * time-sensitive, because a visitor who closes a "last date to apply" notice and
 * refreshes should see it again rather than assume they already had their
 * chance.
 *
 * Once only (showOnce true): dismissal is remembered in the visitor's browser,
 * keyed by the popup's `id`. Editing the popup keeps the same id, so a typo fix
 * never re-interrupts somebody who already closed it, while replacing it with a
 * genuinely new popup produces a new id and greets every visitor again.
 *
 * Either way the modal is rendered through a portal to `document.body`, moves
 * focus into the dialog on open, locks background scrolling, and closes on Esc,
 * on the overlay, and on either button.
 *
 * There is deliberately no X in the corner: the only ways out are the visible
 * buttons, so nobody has to hunt for a small icon to dismiss a dialog that sits
 * over the page they came for.
 */
export default function WelcomePopup({
  content,
}: {
  content: WelcomePopupContent;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  /*
   * Focus goes to the dialog itself rather than to a button. The buttons are the
   * only ways out, so landing on the dialog means the very next Tab reaches the
   * first one, instead of focus escaping to the page behind the overlay.
   */
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const storageKey = `${DISMISS_KEY_PREFIX}${content.id}`;

  useEffect(() => {
    setMounted(true);

    // Always-on mode: nothing is remembered, so every visit and every refresh
    // shows the popup again. Reading storage here would be pointless.
    if (!content.showOnce) {
      setOpen(true);
      return;
    }

    try {
      if (typeof window !== "undefined") {
        const dismissed = window.localStorage.getItem(storageKey) === "1";

        if (!dismissed) {
          setOpen(true);
        }
      }
    } catch {
      // Safari private mode and some locked-down browsers throw on localStorage.
      // If storage is not accessible, default to not auto-showing the popup to
      // avoid trapping a visitor with no way to remember the dismissal. The
      // close button will still work for the current session.
      setOpen(false);
    }
  }, [content.showOnce, storageKey]);

  const dismiss = () => {
    setOpen(false);

    // Only once-only mode has anything to remember.
    if (!content.showOnce) return;

    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, "1");
      }
    } catch {
      // Ignore storage failures.
    }
  };

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dismiss();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus();
    };
  }, [open]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="wc-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          dismiss();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="wc-title"
    >
      <div className="wc-modal" ref={dialogRef} tabIndex={-1}>
        {content.image ? (
          <div className="wc-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={content.image} alt={content.imageAlt || ""} />
          </div>
        ) : null}

        <div className="wc-content">
          {content.eyebrow ? (
            <p className="section-kicker wc-eyebrow">{content.eyebrow}</p>
          ) : null}

          <h2 id="wc-title" className="wc-title">
            {content.title}
          </h2>

          {content.description ? (
            <p className="wc-body muted">{content.description}</p>
          ) : null}

          {content.buttonLabel && content.buttonUrl ? (
            <div className="wc-actions">
              <a
                className="btn primary wc-button"
                href={content.buttonUrl}
                onClick={dismiss}
              >
                {content.buttonLabel}
                <ArrowRight size={16} strokeWidth={2.5} />
              </a>

              <button type="button" className="btn wc-secondary" onClick={dismiss}>
                Close
              </button>
            </div>
          ) : (
            <div className="wc-actions">
              <button type="button" className="btn primary wc-button" onClick={dismiss}>
                Got it
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}