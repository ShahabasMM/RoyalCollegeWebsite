import Image from "next/image";
import { ExternalLink } from "lucide-react";
import PageHero from "@/components/PageHero";

export type PageVariant = "hero" | "stats" | "cards" | "steps" | "editorial";

export type InnerCard = {
  title: string;
  text: string;
};

export type InnerPoint = {
  title: string;
  text: string;
};

export type InnerCardBlock = {
  kicker: string;
  title: string;
  text?: string;
  items: InnerCard[];
};

export type InnerCallout = {
  title: string;
  lines: string[];
  image?: string;
  imageAlt?: string;
};

export type InnerSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export type InnerPdf = {
  /** Small pill label, e.g. "2026-27". */
  label: string;
  title: string;
  text?: string;
  /** External PDF address the card links to. */
  url: string;
  /** Local preview image of the PDF's first page. */
  image: string;
  imageAlt?: string;
  /** Meta line under the title, e.g. "9 pages · PDF". */
  meta?: string;
};

export type InnerPerson = {
  name: string;
  role: string;
  image: string;
  imageAlt?: string;
  width?: number;
  height?: number;
};

export type InnerPageData = {
  title: string;
  crumb: string;
  variant?: PageVariant;
  heroImage: string;
  heroLead: string;
  kicker: string;
  heading?: string;
  lead?: string;
  body?: string[];
  sections?: InnerSection[];
  callout?: InnerCallout;
  pdfs?: InnerPdf[];
  closing?: string;
  quote?: boolean;
  person?: InnerPerson;
  points?: InnerPoint[];
  highlights?: InnerCardBlock;
};

const CHECK = "✓";

const CARD_STYLE: Record<PageVariant, { columns: string; card: string }> = {
  hero: { columns: "", card: "" },
  stats: { columns: "", card: "" },
  editorial: { columns: "", card: "" },
  cards: { columns: " ip-cards-wide", card: " ip-card-flat" },
  steps: { columns: " ip-cards-wide", card: " ip-card-flat" },
};

export default function InnerPage({ data }: { data: InnerPageData }) {
  const {
    title,
    crumb,
    heroImage,
    heroLead,
    kicker,
    heading,
    lead,
    body,
    sections,
    callout,
    pdfs,
    closing,
    quote,
    person,
    points,
    highlights,
  } = data;

  const variant: PageVariant = data.variant ?? "hero";
  const style = CARD_STYLE[variant];

  const intro = (
    <>
      <div className="section-kicker">{kicker}</div>
      {heading ? <h2 className="ip-title">{heading}</h2> : null}
      {lead ? <p className="muted ip-lead">{lead}</p> : null}
      {pdfs?.length ? (
        <div className={`ip-pdf-grid${pdfs.length === 1 ? " ip-pdf-grid-single" : ""}`}>
          {pdfs.map((pdf) => (
            <a
              key={pdf.url}
              className="ip-pdf-card"
              href={pdf.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="ip-pdf-media">
                <Image
                  src={pdf.image}
                  alt={pdf.imageAlt ?? `${pdf.title} preview`}
                  width={1600}
                  height={1130}
                  sizes="(max-width: 900px) 92vw, 460px"
                />
                <span className="ip-pdf-badge">First page preview</span>
              </span>
              <span className="ip-pdf-body">
                <span className="ip-pdf-label">{pdf.label}</span>
                <span className="ip-pdf-title">{pdf.title}</span>
                {pdf.text ? <span className="ip-pdf-text">{pdf.text}</span> : null}
                {pdf.meta ? <span className="ip-pdf-meta">{pdf.meta}</span> : null}
                <span className="ip-pdf-cta">
                  Open PDF
                  <ExternalLink size={14} strokeWidth={2.3} aria-hidden="true" />
                </span>
              </span>
            </a>
          ))}
        </div>
      ) : null}
      {body?.length ? (
        <div className="ip-body">
          {quote ? (
            <span className="ip-quote-mark" aria-hidden="true">
              &ldquo;
            </span>
          ) : null}
          {body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      ) : null}
      {sections?.length ? (
        <div className="ip-sections">
          {sections.map((section) => (
            <section className="ip-block" key={section.heading}>
              <h3 className="ip-block-title">{section.heading}</h3>
              {section.paragraphs?.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              {section.list?.length ? (
                <ul className="ip-block-list">
                  {section.list.map((item) => (
                    <li key={item}>
                      <span className="ip-block-mark" aria-hidden="true">
                        {CHECK}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      ) : null}
      {callout ? (
        <aside className="ip-callout">
          {callout.image ? (
            <span className="ip-callout-crest">
              <Image
                src={callout.image}
                alt={callout.imageAlt ?? ""}
                width={96}
                height={92}
              />
            </span>
          ) : null}
          <div className="ip-callout-body">
            <h3 className="ip-callout-title">{callout.title}</h3>
            <ul className="ip-callout-lines">
              {callout.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </aside>
      ) : null}
      {points?.length ? (
        <ul className="ip-points">
          {points.map((point) => (
            <li className="ip-point" key={point.title}>
              <span className="ip-point-mark" aria-hidden="true">
                {CHECK}
              </span>
              <div>
                <strong>{point.title}</strong>
                <p>{point.text}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );

  return (
    <>
      <PageHero title={title} crumb={crumb} image={heroImage} lead={heroLead} />

      <main className="content ip">
        <section className="ip-section">
          {person ? (
            <div className="container">
              <div className="ip-intro">
                <figure className="ip-person">
                  <span className="ip-person-frame">
                    <Image
                      src={person.image}
                      alt={person.imageAlt ?? person.name}
                      width={person.width ?? 1200}
                      height={person.height ?? 732}
                      sizes="(max-width: 900px) 92vw, 380px"
                      className="ip-person-photo"
                    />
                  </span>
                  <figcaption className="ip-person-meta">
                    <span className="ip-person-name">{person.name}</span>
                    <span className="ip-person-role">{person.role}</span>
                  </figcaption>
                </figure>
                <div className="ip-intro-text">{intro}</div>
              </div>
            </div>
          ) : (
            <div className="container ip-narrow">{intro}</div>
          )}
        </section>

        {highlights?.items.length ? (
          <section className="ip-section section-soft">
            <div className="container">
              <div className="ip-head">
                <div className="section-kicker">{highlights.kicker}</div>
                <h2 className="ip-title">{highlights.title}</h2>
                {highlights.text ? <p className="muted">{highlights.text}</p> : null}
              </div>
              <div
                className={`ip-cards${style.columns}${
                  style.columns ? "" : highlights.items.length % 3 === 2 ? " ip-cards-balance" : ""
                }`}
              >
                {highlights.items.map((item, index) => (
                  <article className={`ip-card${style.card}`} key={item.title}>
                    <span className="ip-card-index">{String(index + 1).padStart(2, "0")}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}
        {closing ? (
          <section className="ip-section">
            <div className="container">
              <p className="ip-closing">{closing}</p>
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
