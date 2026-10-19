import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import LibraryShelf from "@/components/LibraryShelf";
import { library } from "@/content/library";
import { APPLY_URL } from "@/content/innerPageData";
import { getSiteSettings } from "@/lib/siteContent";
import { getStudentZonePageMeta } from "@/lib/studentZoneContent";

import { pageMetadata } from "@/lib/seo";

const SLUG = "library";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getStudentZonePageMeta(SLUG);

  return pageMetadata({
    title: meta?.title ?? "Student Zone Library",
    description:
      meta?.summary ??
      "The college library at Royal College of Arts & Science, Thrithala — the collection, study space and how students can borrow and use resources.",
    path: `/student-zone/${SLUG}`,
  });
}

// Reads the CMS, so it renders per request rather than from a static cache
// (matches the Campus library page).
export const dynamic = "force-dynamic";

export default async function StudentZoneLibraryPage() {
  const [{ applyEnabled }, meta] = await Promise.all([
    getSiteSettings(),
    getStudentZonePageMeta(SLUG),
  ]);

  return (
    <>
      <PageHero
        title={meta?.title ?? "Library"}
        crumb="Student Zone / Library"
        image={library.heroImage}
        lead={meta?.summary ?? library.heroLead}
      />

      <main className="content ip lib">
        <section className="lib-shelf-section">
          <div className="lib-full">
            <LibraryShelf />
          </div>
        </section>

        <section className="ip-section lib-points-section">
          <div className="container">
            <div className="lib-points">
              {library.intro.map((item, index) => (
                <Reveal key={item.title} delay={index * 110} className="lib-point">
                  <span className="lib-point-index">0{index + 1}</span>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="ip-section">
          <div className="container">
            <Reveal>
              <div className="section-kicker">{library.howTo.kicker}</div>
              <h2 className="ip-title">{library.howTo.title}</h2>
            </Reveal>
            <div className="lib-how">
              {library.howTo.items.map((item, index) => (
                <Reveal key={item.title} delay={index * 110} className="lib-how-card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="ip-section">
          <div className="container">
            <Reveal className="lib-cta">
              <div>
                <span className="lib-cta-kicker">Visit us</span>
                <h2>Reading space is open through study hours.</h2>
                <p>
                  Come and see the collection in person, or write to the library
                  about a title you need for your next assignment.
                </p>
              </div>
              <div className="lib-cta-actions">
                <Link className="lib-cta-primary" href="/contact">
                  Contact the college
                </Link>
                {applyEnabled ? (
                  <a
                    className="lib-cta-ghost"
                    href={APPLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply now
                  </a>
                ) : null}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
