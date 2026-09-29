import type { Metadata } from "next";
import MediaGallery from "@/components/MediaGallery";
import PageHero from "@/components/PageHero";
import {
  galleryHero,
  galleryHeroLead,
  galleryItems,
  galleryLead,
  instagramHandle,
  instagramProfile,
} from "@/content/gallery";

export const metadata: Metadata = {
  title: "Gallery | Royal College of Arts & Science",
  description:
    "Photographs and reels from the Royal College campus, events, sports and community programmes.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Gallery"
        crumb="Campus / Gallery"
        image={galleryHero}
        lead={galleryHeroLead}
      />

      <section className="content ip mg-content">
        <div className="container">
          <header className="mg-head">
            <p className="kicker">Campus life</p>
            <p className="lead">{galleryLead}</p>
            <a
              className="mg-follow"
              href={instagramProfile}
              target="_blank"
              rel="noreferrer noopener"
            >
              <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.4A6.4 6.4 0 1 0 18.4 12 6.4 6.4 0 0 0 12 5.6zm0 10.6A4.2 4.2 0 1 1 16.2 12 4.2 4.2 0 0 1 12 16.2zm6.6-10.9a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5z" />
              </svg>
              Follow {instagramHandle}
            </a>
          </header>

          <MediaGallery items={galleryItems} />
        </div>
      </section>
    </>
  );
}
