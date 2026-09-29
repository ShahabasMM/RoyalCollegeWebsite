import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { APPLY_URL } from "@/content/innerPageData";
import { getSiteSettings } from "@/lib/siteContent";
import { campusLife } from "@/content/campusLife";

export const revalidate = 300;

export default async function CampusLifePage() {
  const { applyEnabled } = await getSiteSettings();

  return (
    <>
      <PageHero
        title={campusLife.title}
        crumb="Campus / Campus Life"
        image={campusLife.heroImage}
        lead={campusLife.heroLead}
      />

      <main className="content ip cl">
        <section className="ip-section cl-intro">
          <div className="container">
            <div className="cl-intro-grid">
              <Reveal>
                <div className="section-kicker">{campusLife.kicker}</div>
                <h2 className="ip-title">{campusLife.heading}</h2>
                {campusLife.intro.map((paragraph) => (
                  <p key={paragraph} className="cl-text">
                    {paragraph}
                  </p>
                ))}
              </Reveal>
              <Reveal delay={140} className="cl-location">
                <span className="cl-location-icon" aria-hidden="true">
                  <MapPin size={18} strokeWidth={2.1} />
                </span>
                <span className="cl-location-label">Where we are</span>
                <span className="cl-location-text">{campusLife.location}</span>
              </Reveal>
            </div>
          </div>
        </section>

        {campusLife.blocks.map((block, index) => (
          <section className="ip-section cl-row" key={block.title}>
            <div className="container">
              <div className={`cl-block${index % 2 ? " cl-block-flip" : ""}`}>
                <Reveal className="cl-media">
                  <Image
                    src={block.image}
                    alt={block.imageAlt}
                    width={1200}
                    height={800}
                    sizes="(max-width: 900px) 92vw, 560px"
                  />
                </Reveal>
                <Reveal delay={120} className="cl-copy">
                  <span className="cl-index">{block.index}</span>
                  <h2>{block.title}</h2>
                  <p>{block.text}</p>
                </Reveal>
              </div>
            </div>
          </section>
        ))}

        <section className="ip-section">
          <div className="container">
            <Reveal className="cl-closing">
              <Image
                src={campusLife.closing.image}
                alt=""
                width={1600}
                height={900}
                sizes="100vw"
                className="cl-closing-media"
              />
              <div className="cl-closing-body">
                <span className="cl-closing-kicker">Campus life</span>
                <h2>{campusLife.closing.title}</h2>
                <p>{campusLife.closing.text}</p>
                <div className="cl-closing-actions">
                  <Link className="cl-closing-primary" href="/contact">
                    Visit the campus
                  </Link>
                  {applyEnabled ? (
                    <a
                      className="cl-closing-ghost"
                      href={APPLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apply now
                    </a>
                  ) : null}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
