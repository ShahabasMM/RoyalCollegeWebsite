import { Download, ExternalLink, FileText } from "lucide-react";

import PageHero from "@/components/PageHero";
import { img } from "@/content/innerPageData";
import type { StudentResource } from "@/lib/siteContent";

const MAGAZINE_BANNER = img("photo-1517457373958-b7bdd4587205", 2000);

function pdfFirstPageUrl(url: string) {
  try {
    const parsed = new URL(url);
    const driveId =
      parsed.hostname === "drive.google.com"
        ? parsed.pathname.match(/\/file\/d\/([A-Za-z0-9_-]+)/)?.[1] ??
          parsed.searchParams.get("id")
        : null;
    if (driveId) {
      return `https://drive.google.com/file/d/${driveId}/preview#page=1&toolbar=0&navpanes=0`;
    }
  } catch {
    // A site-relative PDF URL can still be embedded directly below.
  }
  const base = url.split("#", 1)[0];
  return `${base}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=Fit`;
}

export default function CollegeMagazineShelf({
  title,
  lead,
  editions,
}: {
  title: string;
  lead: string;
  editions: StudentResource[];
}) {
  return (
    <>
      <PageHero
        title={title}
        crumb={`Student Zone / ${title}`}
        image={MAGAZINE_BANNER}
        lead={lead}
      />
      <main className="content ip college-magazine-page">
        <section className="ip-section magazine-editions" aria-label="Published magazines">
          <div className="container">
            {editions.length ? (
              <div className="magazine-edition-list">
                {editions.map((edition) => (
                  <article className="magazine-edition" key={edition.id}>
                    <div className="magazine-cover">
                      <iframe
                        src={pdfFirstPageUrl(edition.url)}
                        title={`${edition.title} PDF cover preview`}
                        loading="lazy"
                      />
                      <a
                        className="magazine-preview-fallback"
                        href={edition.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText size={15} aria-hidden="true" />
                        Open PDF preview
                        <ExternalLink size={13} aria-hidden="true" />
                      </a>
                    </div>

                    <div className="magazine-edition-details">
                      <span className="magazine-edition-label">College Magazine</span>
                      <h2>{edition.title}</h2>
                      {edition.description ? <p>{edition.description}</p> : null}
                      <a
                        className="magazine-download"
                        href={edition.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download size={17} strokeWidth={2} aria-hidden="true" />
                        Download Magazine
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="magazine-empty" role="status">
                <span className="magazine-empty-icon" aria-hidden="true">
                  <FileText size={22} />
                </span>
                <h2>No magazines published yet</h2>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
