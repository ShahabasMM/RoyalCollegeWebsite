import type { Metadata } from "next";
import MediaGallery from "@/components/MediaGallery";
import PageHero from "@/components/PageHero";
import { galleryHero, galleryHeroLead, galleryLead } from "@/content/gallery";
import { getGallery } from "@/lib/siteContent";

import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description:
    "View photographs of the campus, events, sports and community programmes at Royal College of Arts & Science, Thrithala.",
  path: "/campus/gallery",
});

export default async function GalleryPage() {
  const items = await getGallery();

  return (
    <>
      <PageHero
        title="Gallery"
        crumb="Campus / Gallery"
        image={galleryHero}
        lead={galleryHeroLead}
      />

      {/*
        <main> rather than <section>: this was the only page without a main
        landmark, which left screen-reader and crawler users with no indication
        of where the page content begins. The class list is unchanged, so the
        element swap alters nothing visually.
      */}
      <main className="content ip mg-content">
        <div className="container">
          <header className="mg-head">
            <p className="kicker">Campus life</p>
            <p className="lead">{galleryLead}</p>
          </header>

          {items.length > 0 ? (
            <MediaGallery items={items} />
          ) : (
            // An empty gallery is a normal state, not an error: staff may have
            // every photo switched off while a term's pictures are being sorted.
            <p className="mg-empty">
              New photographs are being added. Please check back soon.
            </p>
          )}
        </div>
      </main>
    </>
  );
}