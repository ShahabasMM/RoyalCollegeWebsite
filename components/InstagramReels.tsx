"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Instagram, Send } from "lucide-react";

/** Reel shortcodes, taken from the @royal_college_thrithala Instagram links. */
const REELS = [
  "DeJwmGhSDkD",
  "DeCXvNJvssx",
  "DdssD4SzTdv",
  "DZ_79w-Pbit",
  "DZdCgakJ5qk",
];

const PROFILE_URL = "https://www.instagram.com/royal_college_thrithala/";

export default function InstagramReels() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const scroll = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>(".ig-reel-slide");
    const step = slide ? slide.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  const share = useCallback(async (code: string) => {
    const url = `https://www.instagram.com/reel/${code}/`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "Royal College of Arts & Science", url });
        return;
      } catch {
        /* user dismissed the share sheet */
      }
    }
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <section className="section ig-reels-section" aria-label="Instagram reels">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-kicker">03 / Life at Royal</div>
            <h2>Life at Royal, one reel at a time.</h2>
          </div>
          <div className="ig-reels-actions">
            <a
              className="ig-follow"
              href={PROFILE_URL}
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={16} /> Follow @royal_college_thrithala
            </a>
            <div className="ig-reels-navs">
              <button
                type="button"
                className="ig-reels-nav"
                aria-label="Previous reels"
                onClick={() => scroll(-1)}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                className="ig-reels-nav"
                aria-label="Next reels"
                onClick={() => scroll(1)}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="ig-reels-track" ref={trackRef}>
        {REELS.map((code) => {
          const isLiked = Boolean(liked[code]);
          return (
            <figure className="ig-reel-slide" key={code}>
              <span className="ig-reel-inner">
                <iframe
                  src={`https://www.instagram.com/reel/${code}/embed/`}
                  title={`Instagram reel ${code} from Royal College`}
                  loading="lazy"
                  scrolling="no"
                  frameBorder={0}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </span>
              <div className="ig-reel-ui">
                <a
                  className="ig-reel-follow"
                  href={PROFILE_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Instagram size={14} /> Follow
                </a>
                <div className="ig-reel-btns">
                  <button
                    type="button"
                    className={`ig-reel-btn${isLiked ? " is-liked" : ""}`}
                    aria-pressed={isLiked}
                    aria-label={isLiked ? "Unlike reel" : "Like reel"}
                    onClick={() =>
                      setLiked((state) => ({ ...state, [code]: !state[code] }))
                    }
                  >
                    <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                  </button>
                  <button
                    type="button"
                    className="ig-reel-btn"
                    aria-label="Share reel"
                    onClick={() => share(code)}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
