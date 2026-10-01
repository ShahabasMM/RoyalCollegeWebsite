import type { Metadata } from "next";
import MediaGallery from "@/components/MediaGallery";
import PageHero from "@/components/PageHero";
import { galleryHero, galleryHeroLead, galleryLead } from "@/content/gallery";
import { getGallery } from "@/lib/siteContent";

export const metadata: Metadata = {
  title: "Gallery | Royal College of Arts & Science",
  description:
    "Photographs from the Royal College campus, events, sports and community programmes.",
};

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

      <section className="content ip mg-content">
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
      </section>
    </>
  );
}