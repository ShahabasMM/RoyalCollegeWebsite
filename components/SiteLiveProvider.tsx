"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { getBrowserClient, REALTIME_READY } from "@/lib/browserClient";
import {
  fetchContentStamp,
  fetchLiveApplyEnabled,
  fetchLiveFlashNews,
  flashContentChanged,
  pageContentChanged,
  type ContentStamp,
  type LiveFlashNotice,
} from "@/lib/liveData";

/**
 * Tables the public site subscribes to.
 *
 * `site_contact_submissions` is deliberately absent: anon has no SELECT policy
 * on it, so it could never deliver an event, and a public page has no business
 * holding a subscription to visitor enquiries.
 */
const CHROME_TABLES = ["site_settings", "site_flash_news"] as const;

const PAGE_TABLES = [
  "site_programmes",
  "site_departments",
  "site_faculty",
  "site_academic_calendar",
  "site_addon_courses",
  "site_news",
  "site_pages",
  // A `router.refresh()` re-renders the home page with the new popup. It still
  // only appears to visitors who have not dismissed this popup's id yet.
  "site_welcome_popup",
  // Gallery photos are read by the /campus/gallery server component, so a
  // refresh is what swaps a newly added photograph into the page.
  "site_gallery",
] as const;

/** Admin edits come in bursts, so collapse them into one refresh. */
const REFRESH_DEBOUNCE_MS = 1200;
/** Floor between refreshes, so a chatty table cannot loop the server. */
const REFRESH_MIN_GAP_MS = 2500;

/**
 * How often to poll for changes.
 *
 * Realtime covers the common case in under a second. This poll is the safety
 * net for when it is unavailable, which is the default state of most Supabase
 * projects: a table missing from the supabase_realtime publication still
 * reports a SUBSCRIBED channel and simply never fires, so "no events" cannot be
 * told apart from "no publication" from the client.
 *
 * It only runs while the tab is visible, and each tick is one small request.
 */
const POLL_MS = 45000;

/** Programme names for the footer, kept here so the footer stays in step. */
export type LiveProgram = {
  name: string;
  shortName: string;
  slug: string | null;
};

type SiteLiveValue = {
  /** False when the admin has switched "Apply now" off. */
  applyEnabled: boolean;
  flashNews: LiveFlashNotice[];
  programs: LiveProgram[];
};

const SiteLiveContext = createContext<SiteLiveValue>({
  applyEnabled: true,
  flashNews: [],
  programs: [],
});

/**
 * Keeps the public site in step with the CMS while it is open.
 *
 * The server render is the baseline, so search engines and visitors without
 * JavaScript still get real content. On top of that:
 *
 *   - the Apply now switch and the flash bar are held in client state and
 *     change immediately, with no server round trip and no dependence on
 *     whether `router.refresh()` re-renders the root layout;
 *   - page content (programmes, faculty, news, ...) is refreshed by asking
 *     Next to re-run the server components.
 *
 * If Realtime is not configured or the tables are not in the publication, this
 * silently does nothing and the site falls back to its `revalidate` window.
 */
export function SiteLiveProvider({
  applyEnabled: initialApplyEnabled,
  flashNews: initialFlashNews,
  programs: initialPrograms,
  children,
}: SiteLiveValue & { children: ReactNode }) {
  const router = useRouter();
  const [applyEnabled, setApplyEnabled] = useState(initialApplyEnabled);
  const [flashNews, setFlashNews] = useState(initialFlashNews);
  const [programs, setPrograms] = useState(initialPrograms);

  const refreshTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastRefresh = useRef(0);

  // A ref keeps the socket stable while still calling the current router.
  const routerRef = useRef(router);

  routerRef.current = router;

  const requestRefresh = useCallback(() => {
    if (refreshTimer.current) return;

    const wait = Math.max(
      0,
      REFRESH_MIN_GAP_MS - (Date.now() - lastRefresh.current),
    );

    refreshTimer.current = setTimeout(() => {
      refreshTimer.current = null;
      lastRefresh.current = Date.now();
      routerRef.current.refresh();
    }, wait);
  }, []);

  useEffect(() => {
    if (!REALTIME_READY) return;

    const supabase = getBrowserClient();

    if (!supabase) return;

    const channel = supabase.channel(`site-live-${Date.now()}`);

    for (const table of CHROME_TABLES) {
      channel.on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        () => {
          if (table === "site_settings") {
            void fetchLiveApplyEnabled().then((next) => {
              if (next !== null) setApplyEnabled(next);
            });
            return;
          }

          void fetchLiveFlashNews().then((next) => {
            if (next !== null) setFlashNews(next);
          });
        },
      );
    }

    for (const table of PAGE_TABLES) {
      channel.on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        () => {
          requestRefresh();
        },
      );
    }

    channel.subscribe((status) => {
      if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
        // Expected when the tables are not in the supabase_realtime
        // publication. The site keeps working on its revalidate window.
        console.warn(
          `[site-live] realtime unavailable (${status}); falling back to ISR`,
        );
      }
    });

    return () => {
      if (refreshTimer.current) {
        clearTimeout(refreshTimer.current);
        refreshTimer.current = null;
      }

      void supabase.removeChannel(channel);
    };
  }, [requestRefresh]);

  // Mobile browsers freeze background sockets. Catch up when the tab returns.
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") requestRefresh();
    };

    document.addEventListener("visibilitychange", onVisible);

    return () => {
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [requestRefresh]);

  /**
   * Change detection that does not depend on Realtime at all.
   *
   * Runs on an interval and only while the page is visible, so a backgrounded
   * tab costs nothing. If the stamp function is not installed, it degrades to
   * reading the Apply switch directly, so the most important control still
   * works on a database where the SQL has not been run.
   */
  useEffect(() => {
    if (!REALTIME_READY) return;

    let last: ContentStamp | null = null;
    let stopped = false;
    // Set once we learn the stamp function is missing, to stop retrying it.
    let stampUnavailable = false;

    const applyChanged = async () => {
      const next = await fetchLiveApplyEnabled();

      if (!stopped && next !== null) setApplyEnabled(next);
    };

    const tick = async () => {
      if (stopped || document.visibilityState !== "visible") return;

      if (stampUnavailable) {
        await applyChanged();
        return;
      }

      const stamp = await fetchContentStamp();

      if (stopped) return;

      // Helper not installed yet: fall back rather than failing silently.
      if (!stamp) {
        stampUnavailable = true;
        await applyChanged();
        return;
      }

      // First successful read only establishes the baseline. Without this the
      // very first tick would look like a change and refresh on every load.
      if (last === null) {
        last = stamp;

        if (stamp.apply !== null) setApplyEnabled(stamp.apply);

        return;
      }

      const previous = last;

      last = stamp;

      // The stamp carries the switch value, so the apply buttons update from
      // this response alone, with no second request.
      if (stamp.apply !== null && stamp.apply !== previous.apply) {
        setApplyEnabled(stamp.apply);
      }

      if (flashContentChanged(previous, stamp)) {
        void fetchLiveFlashNews().then((next) => {
          if (!stopped && next !== null) setFlashNews(next);
        });
      }

      if (pageContentChanged(previous, stamp)) requestRefresh();
    };

    // Do not wait a full interval before the first check, otherwise a change
    // made moments after load would be missed for the whole period.
    const kickoff = setTimeout(() => void tick(), 3000);
    const interval = setInterval(() => void tick(), POLL_MS);

    const onVisibility = () => {
      if (document.visibilityState === "visible") void tick();
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stopped = true;
      clearTimeout(kickoff);
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [requestRefresh]);

  return (
    <SiteLiveContext.Provider value={{ applyEnabled, flashNews, programs }}>
      {children}
    </SiteLiveContext.Provider>
  );
}

/**
 * Defaults to true so a component rendered outside the provider still shows
 * its apply button rather than vanishing.
 */
export function useApplyEnabled() {
  return useContext(SiteLiveContext).applyEnabled;
}

export function useFlashNews() {
  return useContext(SiteLiveContext).flashNews;
}

/** Programme names for the footer link column. */
export function useLivePrograms() {
  return useContext(SiteLiveContext).programs;
}
