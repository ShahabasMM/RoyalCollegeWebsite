import { ExternalLink } from "lucide-react";

import Reveal from "@/components/Reveal";
import type { NssReel } from "@/content/nssPage";

/**
 * "Royal NSS in action" — the reels section.
 *
 * Fully presentational: the page resolves the list (CMS media rows first,
 * typed fallback second). Each card embeds the official Instagram reel
 * (lazy-loaded, so embeds are only fetched as the section scrolls into
 * view). The embed shows the preview and plays inline; nothing autoplays
 * with sound. A "Watch on Instagram" link under every card is the fallback
 * if an embed is blocked.
 */
export default function NssReels({ reels }: { reels: NssReel[] }) {
  return (
    <section className="section nss-reels-section" aria-labelledby="nss-reels-title">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div>
              <div className="section-kicker">Moments of service</div>
              <h2 id="nss-reels-title">
                Royal NSS <span>in action.</span>
              </h2>
            </div>
          </div>
        </Reveal>

        {reels.length > 0 && (
          <Reveal delay={80}>
            <ul className="nss-reels-grid">
              {reels.map((reel, index) => (
              <li className="nss-reel" key={reel.id}>
                <div className="nss-reel-frame">
                  <iframe
                    src={`https://www.instagram.com/reel/${reel.code}/embed/`}
                    title={`${reel.title} ${index + 1} on Instagram`}
                    loading="lazy"
                    scrolling="no"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <figcaption className="nss-reel-caption">
                  <span>{reel.title}</span>
                  <a
                    href={reel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${reel.title} ${index + 1} on Instagram (opens in a new tab)`}
                  >
                    Watch on Instagram
                    <ExternalLink size={12} strokeWidth={2.2} aria-hidden="true" />
                  </a>
                </figcaption>
              </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
