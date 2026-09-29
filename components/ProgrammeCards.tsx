"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, X } from "lucide-react";
import type { Programme } from "@/content/programmes";
import { APPLY_URL } from "@/content/innerPageData";
import { useApplyEnabled } from "./SiteLiveProvider";

export default function ProgrammeCards({ programmes }: { programmes: Programme[] }) {
  const [active, setActive] = useState<Programme | null>(null);
  const applyEnabled = useApplyEnabled();
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
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
    if (!active) triggerRef.current?.focus();
  }, [active]);

  return (
    <>
      <div className="pg-grid">
        {programmes.map((programme, index) => (
          <button
            key={programme.name}
            type="button"
            className="pg-card"
            ref={index === 0 ? triggerRef : undefined}
            onClick={() => setActive(programme)}
          >
            <span className="pg-card-media">
              <img src={programme.image} alt="" loading="lazy" />
              <span className="pg-card-tag">{programme.shortName}</span>
            </span>
            <span className="pg-card-body">
              <h2 className="pg-card-name">{programme.name}</h2>
              <span className="pg-card-about">{programme.about}</span>
              <span className="pg-card-cta">
                View details
                <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />
              </span>
            </span>
          </button>
        ))}
      </div>

      {mounted &&
        active &&
        createPortal(
          <div
            className="pg-overlay"
            onClick={(event) => {
              if (event.target === event.currentTarget) setActive(null);
            }}
          >
            <div
              className="pg-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="pg-modal-title"
            >
              <button
                type="button"
                className="pg-close"
                onClick={() => setActive(null)}
                aria-label="Close details"
                ref={closeRef}
              >
                <X size={18} aria-hidden="true" />
              </button>

              <span className="pg-modal-media">
                <img src={active.image} alt="" />
              </span>
              <span className="pg-modal-code">{active.shortName}</span>
              <h2 className="pg-modal-title" id="pg-modal-title">
                {active.name}
              </h2>
              <p className="pg-modal-about">{active.about}</p>

              <table className="pg-table">
                <caption className="visually-hidden">
                  Details for {active.name}
                </caption>
                <tbody>
                  <tr>
                    <th scope="row">Duration</th>
                    <td>{active.duration}</td>
                  </tr>
                  <tr>
                    <th scope="row">Scheme</th>
                    <td>{active.scheme}</td>
                  </tr>
                  <tr>
                    <th scope="row">Department</th>
                    <td>{active.department}</td>
                  </tr>
                </tbody>
              </table>

              {applyEnabled ? (
                <a
                  className="pg-apply"
                  href={APPLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply now
                </a>
              ) : null}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
