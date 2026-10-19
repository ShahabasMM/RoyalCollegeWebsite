"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/* ==========================================================================
   Visitor counter provider.

   Mounted once in the root layout, so a visit is recorded from whichever page a
   visitor lands on, and the home page "Visitors" card reads the result from
   here instead of making its own request.

   The request is fired from an effect, never during render, so server
   rendering and the build never touch the counter.
   ========================================================================== */

type VisitorCountState = {
  /** Unique-visitor total, or null while loading or when it is unavailable. */
  visitors: number | null;
  status: "loading" | "ready" | "error";
};

const VisitorCountContext = createContext<VisitorCountState>({
  visitors: null,
  status: "loading",
});

export function useVisitorCount() {
  return useContext(VisitorCountContext);
}

/**
 * Share one request between effect mounts. In development, React StrictMode
 * mounts, cleans up and mounts effects again. A boolean "already requested"
 * flag can leave the second effect with no listener after the first listener
 * was cleaned up, keeping the card in its loading state forever.
 *
 * Sharing the promise avoids duplicate POSTs while letting the active effect
 * receive the result. The server also deduplicates visits by cookie.
 */
let visitRequest: Promise<number | null> | null = null;

function requestVisit(): Promise<number | null> {
  if (!visitRequest) {
    visitRequest = fetch("/api/visits", {
      method: "POST",
      credentials: "same-origin",
      cache: "no-store",
      headers: { Accept: "application/json" },
    })
      .then(async (response) => {
        if (!response.ok) return null;
        const data = (await response.json()) as { visitors?: unknown };
        return typeof data.visitors === "number" ? data.visitors : null;
      })
      .catch(() => null);
  }

  return visitRequest;
}

export default function VisitorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<VisitorCountState>({
    visitors: null,
    status: "loading",
  });

  useEffect(() => {
    let active = true;

    requestVisit().then((visitors) => {
      if (!active) return;

      setState({
        visitors,
        status: visitors === null ? "error" : "ready",
      });
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <VisitorCountContext.Provider value={state}>
      {children}
    </VisitorCountContext.Provider>
  );
}
