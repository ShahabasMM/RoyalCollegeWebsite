import Link from "next/link";
import PageHero from "@/components/PageHero";
import { img } from "@/content/innerPageData";
import { getNews } from "@/lib/siteContent";

export const revalidate = 300;

export default async function News() {
  const { items, notices } = await getNews();
  const [featured, ...rest] = items;

  return (
    <>
      <PageHero
        title="News & Announcements"
        crumb="News"
        image={img("photo-1517457373958-b7bdd4587205")}
        lead="Campus events, examination announcements, academic updates and college notices."
      />

      <main className="content ip">
        {featured ? (
        <>
        <section className="ip-section">
          <div className="container ip-featured">
            <div className="ip-featured-media">
              {featured.image ? (
                // Plain <img> rather than the Next image component. A CMS image
                // can live on any host, and that component only serves the
                // handful on its allowlist. Sizing lives in
                // .ip-featured-media img, as with every other CMS image here.
                <img
                  src={featured.image}
                  alt={featured.title}
                  loading="eager"
                  decoding="async"
                />
              ) : (
                <div className="ip-news-placeholder" aria-hidden="true" />
              )}
            </div>
            <div className="ip-featured-copy">
              <span className="tag">{featured.category}</span>
              <h2>{featured.title}</h2>
              <p className="muted">{featured.text}</p>
              <div className="ip-meta">
                <span>{featured.date}</span>
                <Link className="text-link" href="/contact">
                  Office enquiries <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="ip-section section-soft">
          <div className="container">
            <div className="ip-head">
              <div className="section-kicker">Latest updates</div>
              <h2>Recent announcements.</h2>
            </div>
            <div className="ip-news-grid">
              {rest.map((item) => (
                <article className="ip-news-card" key={item.title}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="ip-news-placeholder" aria-hidden="true" />
                  )}
                  <div className="ip-news-body">
                    <div className="ip-meta">
                      <span className="tag">{item.category}</span>
                      <span>{item.date}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        </>
        ) : (
          <section className="ip-section">
            <div className="container ip-narrow">
              <p className="muted">
                No news stories have been published yet.
              </p>
            </div>
          </section>
        )}

        <section className="ip-section">
          <div className="container ip-notices">
            <div className="ip-head">
              <div className="section-kicker">Notice board</div>
              <h2>Current notices.</h2>
            </div>
            {notices.length > 0 ? (
              <ul className="ip-notice-list">
                {notices.map((notice) => (
                  <li key={notice.label}>
                    <span>{notice.label}</span>
                    <span className="ip-notice-date">{notice.date}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted">There are no current notices.</p>
            )}
            <p className="ip-notice-note">
              Full notices are published on the college notice board and in the student zone.
            </p>
            <div className="ip-related">
              <Link className="ip-pill" href="/student-zone/notices">
                Student zone notices <span aria-hidden="true">→</span>
              </Link>
              <Link className="ip-pill" href="/contact">
                Contact the office <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
