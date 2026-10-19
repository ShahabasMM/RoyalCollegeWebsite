import { Instagram } from "lucide-react";

import Reveal from "@/components/Reveal";
import type { NssBoardPhoto } from "@/content/nssPage";

const TILT_CLASS: Record<string, string> = {
  a: "nss-photo--a",
  b: "nss-photo--b",
  c: "nss-photo--c",
  d: "nss-photo--d",
};

/** Pin rotation presets, cycled across however many cards the board has. */
const TILTS = ["a", "b", "c", "d"] as const;

/**
 * Scrapbook board — photographs pinned to a paper noticeboard.
 *
 * Fully presentational: the page resolves what to show, in this order —
 * CMS media rows (site_media_items, managed in the ERP's NSS board),
 * staff photographs from site_gallery (category "NSS"), then the typed
 * Instagram embeds. Each card is either a direct printed photograph or
 * the official Instagram embed (lazy-loaded), always with a plain link
 * back to the post as the fallback.
 */
export default function NssScrapbook({ photos }: { photos: NssBoardPhoto[] }) {
  return (
    <section className="section nss-board-section" aria-labelledby="nss-board-title">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div>
              <div className="section-kicker">Pinned to the board</div>
              <h2 id="nss-board-title">
                Snapshots from <span>the field.</span>
              </h2>
            </div>
            <p className="section-head-aside nss-board-aside">
              {photos.some((photo) => photo.kind === "image")
                ? "Photographs published by the college."
                : "Posts from Royal NSS, pinned here until the college photographs go up."}
            </p>
          </div>
        </Reveal>

        {photos.length > 0 && (
          <Reveal delay={80}>
            <ul className="nss-board">
              {photos.map((photo, index) => {
                const tilt = TILT_CLASS[TILTS[index % TILTS.length]];

                if (photo.kind === "image") {
                  return (
                    <li className={`nss-photo ${tilt}`} key={photo.id}>
                      <span className="nss-pin" aria-hidden="true" />
                      {photo.linkUrl ? (
                        <a
                          href={photo.linkUrl}
                          {...(photo.linkUrl.startsWith("/")
                            ? {}
                            : { target: "_blank", rel: "noopener noreferrer" })}
                        >
                          <img
                            className="nss-photo-img"
                            src={photo.image}
                            alt={photo.alt}
                            loading="lazy"
                            decoding="async"
                          />
                        </a>
                      ) : (
                        <img
                          className="nss-photo-img"
                          src={photo.image}
                          alt={photo.alt}
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                      {photo.title ? (
                        <span className="nss-photo-caption">{photo.title}</span>
                      ) : null}
                    </li>
                  );
                }

                return (
                  <li className={`nss-photo nss-photo--embed ${tilt}`} key={photo.id}>
                    <span className="nss-pin" aria-hidden="true" />
                    <span className="nss-photo-embed">
                      <iframe
                        src={`https://www.instagram.com/p/${photo.code}/embed/`}
                        title={
                          photo.title
                            ? `${photo.title} on Instagram`
                            : "Royal NSS post on Instagram"
                        }
                        loading="lazy"
                        scrolling="no"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                        allowFullScreen
                      />
                    </span>
                    <span className="nss-photo-foot">
                      <Instagram size={12} strokeWidth={2} aria-hidden="true" />
                      <a
                        href={`https://www.instagram.com/p/${photo.code}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open this Royal NSS post on Instagram (opens in a new tab)"
                      >
                        View post
                      </a>
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
