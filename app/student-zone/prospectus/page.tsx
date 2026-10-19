import type { Metadata } from "next";
import { Download, ExternalLink, FileText } from "lucide-react";

import PageHero from "@/components/PageHero";
import { img } from "@/content/innerPageData";
import {
  breadcrumbJsonLd,
  descriptionFrom,
  pageMetadata,
} from "@/lib/seo";
import {
  getProspectusCards,
  getStudentZonePage,
} from "@/lib/studentZoneContent";

const SLUG = "prospectus";

// Same verified banner-photo helper every PageHero on the site uses (this
// photo already heads the Student Zone downloads page).
const HERO_IMAGE = img("photo-1553877522-43269d4ea984");

export async function generateMetadata(): Promise<Metadata> {
  const page = await getStudentZonePage(SLUG);

  return pageMetadata({
    title: page.title,
    description: descriptionFrom(page.lead),
    path: page.path,
  });
}

/**
 * /student-zone/prospectus — the standard site banner (title + subtitle over
 * a background photo) followed by exactly two cards, College and University.
 *
 * Each card's destination comes from getProspectusCards(), which binds the
 * admin-published site_student_resources rows (kind 'prospectus') by title or
 * badge. With no bound row the card still renders, but its button is disabled
 * and marked "Currently unavailable" — no URL is ever invented or borrowed
 * from the other card.
 */
export default async function ProspectusPage() {
  const [page, cards] = await Promise.all([
    getStudentZonePage(SLUG),
    getProspectusCards(),
  ]);

  const schema = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Student Zone", path: "/student-zone" },
    { name: page.title, path: "" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHero
        title={page.title}
        crumb={`Student Zone / ${page.title}`}
        image={HERO_IMAGE}
        lead={page.lead}
      />

      <main className="content ip prsp">
        <section className="ip-section prsp-section" aria-label="Prospectus downloads">
          <div className="container">
            <ul className="prsp-grid">
              {cards.map((card) => (
                <li className="prsp-card" key={card.slot}>
                  <span className="prsp-icon" aria-hidden="true">
                    <FileText size={24} strokeWidth={1.8} />
                  </span>

                  <div className="prsp-body">
                    <h2 className="prsp-title">{card.title}</h2>
                    <p className="prsp-text">{card.description}</p>
                  </div>

                  {card.url ? (
                    <a
                      className="btn primary prsp-btn"
                      href={card.url}
                      aria-label={`Download ${card.title}`}
                      {...(card.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      Download Prospectus
                      {card.external ? (
                        <ExternalLink size={15} strokeWidth={2.3} aria-hidden="true" />
                      ) : (
                        <Download size={15} strokeWidth={2.3} aria-hidden="true" />
                      )}
                    </a>
                  ) : (
                    <>
                      <button
                        className="btn primary prsp-btn"
                        type="button"
                        disabled
                        aria-describedby={`prsp-unavailable-${card.slot}`}
                      >
                        Download Prospectus
                        <Download size={15} strokeWidth={2.3} aria-hidden="true" />
                      </button>
                      <span
                        className="prsp-unavailable"
                        id={`prsp-unavailable-${card.slot}`}
                      >
                        Currently unavailable
                      </span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
