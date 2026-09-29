"use client";

import { ArrowRight, BadgeCheck, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { SiteAddOnCourse } from "@/lib/siteContent";
import { useApplyEnabled } from "./SiteLiveProvider";

const APPLY_URL = "https://royalcollege.vercel.app/apply";
const APPROVAL_BADGE = "Kerala Govt Approved";

export default function AddOnCourses({ courses }: { courses: SiteAddOnCourse[] }) {
  const [active, setActive] = useState<SiteAddOnCourse | null>(null);
  const applyEnabled = useApplyEnabled();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!active) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(null);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [active]);

  useEffect(() => {
    if (active) {
      return;
    }
    triggerRef.current?.focus();
  }, [active]);

  return (
    <>
      <div className="ac-grid">
        {courses.map((course) => (
          <button
            className="ac-card"
            type="button"
            key={course.code}
            aria-haspopup="dialog"
            onClick={(event) => {
              triggerRef.current = event.currentTarget;
              setActive(course);
            }}
          >
            <span className="ac-card-code">{course.code}</span>
            <h3 className="ac-card-title">{course.title}</h3>
            <span className="ac-card-badge">
              <BadgeCheck size={14} strokeWidth={2.2} aria-hidden="true" />
              {APPROVAL_BADGE}
            </span>
            <dl className="ac-card-meta">
              <div>
                <dt>Duration</dt>
                <dd>{course.duration}</dd>
              </div>
              <div>
                <dt>Mode</dt>
                <dd>{course.mode}</dd>
              </div>
            </dl>
            <span className="ac-card-cta">
              View details
              <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>

      {active
        ? createPortal(
            <div
              className="ac-overlay"
              onClick={() => setActive(null)}
              role="presentation"
            >
              <div
                className="ac-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="ac-modal-title"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  className="ac-close"
                  type="button"
                  ref={closeRef}
                  aria-label="Close course details"
                  onClick={() => setActive(null)}
                >
                  <X size={18} strokeWidth={2.2} aria-hidden="true" />
                </button>
                <span className="ac-modal-code">Course {active.code}</span>
                <h2 className="ac-modal-title" id="ac-modal-title">
                  {active.title}
                </h2>
                <table className="ac-table">
                  <caption className="visually-hidden">
                    Duration and mode for {active.title}
                  </caption>
                  <tbody>
                    <tr>
                      <th scope="row">Duration</th>
                      <td>{active.duration}</td>
                    </tr>
                    <tr>
                      <th scope="row">Mode</th>
                      <td>{active.mode}</td>
                    </tr>
                    <tr>
                      <th scope="row">Certificate</th>
                      <td>{active.approvalNote}</td>
                    </tr>
                  </tbody>
                </table>
                {applyEnabled ? (
                  <a className="ac-apply" href={APPLY_URL}>
                    Apply now
                  </a>
                ) : null}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
