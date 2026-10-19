"use client";

import { AlertTriangle } from "lucide-react";

export default function StudentZoneError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="content ip szp">
      <section className="ip-section">
        <div className="container ip-narrow">
          <div className="sz-empty" role="alert">
            <div className="sz-empty-icon" aria-hidden="true">
              <AlertTriangle size={20} strokeWidth={2} />
            </div>
            <h2>This page could not be loaded</h2>
            <p className="muted">
              Something went wrong while loading this Student Zone page. Please
              try again, or go back to the Student Zone.
            </p>
            <button className="btn" type="button" onClick={reset}>
              Try again
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
