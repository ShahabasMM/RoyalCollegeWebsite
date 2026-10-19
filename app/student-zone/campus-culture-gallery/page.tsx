import type { Metadata } from "next";
import MediaGallery from "@/components/MediaGallery";
import PageHero from "@/components/PageHero";
import { galleryHero, galleryHeroLead, galleryLead } from "@/content/gallery";
import { getGallery } from "@/lib/siteContent";
import { getStudentZonePageMeta } from "@/lib/studentZoneContent";

import { pageMetadata } from "@/lib/seo";

const SLUG = "campus-culture-gallery";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getStudentZonePageMeta(SLUG);

  return pageMetadata({
    title: meta?.title ?? "Campus Culture & Gallery",
    description:
      meta?.summary ??
      "Glimpses of campus life at Royal College of Arts & Science, Thrithala — photographs of the campus, events, sports and community programmes.",
    path: `/student-zone/${SLUG}`,
  });
}

export default async function CampusCultureGalleryPage() {
  const [items, meta] = await Promise.all([
    getGallery(),
    getStudentZonePageMeta(SLUG),
  ]);

  return (
    <>
      <PageHero
        title={meta?.title ?? "Campus Culture & Gallery"}
        crumb="Student Zone / Campus Culture & Gallery"
        image={galleryHero}
        lead={meta?.summary ?? galleryHeroLead}
      />

      <main className="content ip mg-content">
        <div className="container">
          <header className="mg-head">
            <p className="kicker">Campus life</p>
            <p className="lead">{galleryLead}</p>
          </header>

          {items.length > 0 ? (
            <MediaGallery items={items} />
          ) : (
            <p className="mg-empty">
              New photographs are being added. Please check back soon.
            </p>
          )}
        </div>
      </main>
    </>
  );
}
