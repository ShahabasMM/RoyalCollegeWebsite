"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowRight,
  Briefcase,
  Drama,
  HandHeart,
  HeartHandshake,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  OFFICE_BEARER_PENDING,
  type ClubBody,
  type ClubTone,
} from "@/content/clubs";

const TONE_ICON: Record<ClubTone, LucideIcon> = {
  arts: Drama,
  women: HeartHandshake,
  service: HandHeart,
  placement: Briefcase,
};

export default function ClubsExplorer({ bodies }: { bodies: ClubBody[] }) {
  const [active, setActive] = useState<ClubBody | null>(null);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const lastSlug = useRef<string | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [active]);

  useEffect(() => {
    if (active || !lastSlug.current) return;
    triggerRef.current?.focus();
    lastSlug.current = null;
  }, [active]);

  const open = (body: ClubBody, trigger: HTMLButtonElement) => {
    lastSlug.current = body.slug;
    triggerRef.current = trigger;
    setActive(body);
  };

  const ActiveIcon = active ? TONE_ICON[active.tone] : null;

  return (
    <>
      <div className="cx-grid">
        {bodies.map((body) => {
          const Icon = TONE_ICON[body.tone];
          return (
            <button
              key={body.slug}
              type="button"
              className={`cx-card cx-card-${body.tone}`}
              onClick={(event) => open(body, event.currentTarget)}
            >
              <span className="cx-card-media">
                <img src={body.image} alt="" loading="lazy" />
                <span className="cx-card-icon" aria-hidden="true">
                  <Icon size={18} strokeWidth={2.1} />
                </span>
                <span className="cx-card-tag">{body.shortName}</span>
              </span>
              <span className="cx-card-body">
                <h2 className="cx-card-name">{body.name}</h2>
                <span className="cx-card-tagline">{body.tagline}</span>
                <span className="cx-card-cta">
                  View office-bearers
                  <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {mounted &&
        active &&
        createPortal(
          <div
            className="cx-overlay"
            onClick={(event) => {
              if (event.target === event.currentTarget) setActive(null);
            }}
          >
            <div
              className={`cx-modal cx-modal-${active.tone}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cx-modal-title"
            >
              <button
                type="button"
                className="cx-close"
                onClick={() => setActive(null)}
                aria-label="Close office-bearers"
                ref={closeRef}
              >
                <X size={18} aria-hidden="true" />
              </button>

              <span className="cx-modal-media">
                <img src={active.image} alt="" />
              </span>

              <span className="cx-modal-code">
                {ActiveIcon ? <ActiveIcon size={13} strokeWidth={2.3} /> : null}
                {active.shortName}
              </span>
              <h2 className="cx-modal-title" id="cx-modal-title">
                {active.name}
              </h2>
              <p className="cx-modal-about">{active.about}</p>

              <h3 className="cx-modal-subhead">Office-bearers</h3>
              <ul className="cx-holders">
                {active.holders.map((holder) => (
                  <li className="cx-holder" key={holder.role}>
                    <span className="cx-holder-role">{holder.role}</span>
                    <span
                      className={`cx-holder-name${
                        holder.name === OFFICE_BEARER_PENDING
                          ? " cx-holder-pending"
                          : ""
                      }`}
                    >
                      {holder.name}
                    </span>
                  </li>
                ))}
              </ul>
              {active.holders.some(
                (holder) => holder.name === OFFICE_BEARER_PENDING,
              ) ? (
                <p className="cx-modal-note">
                  Names are published here once the college confirms the
                  current list for this academic year.
                </p>
              ) : null}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
