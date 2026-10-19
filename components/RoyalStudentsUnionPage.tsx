import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

import PageHero from "@/components/PageHero";
import { img } from "@/content/innerPageData";
import { breadcrumbJsonLd } from "@/lib/seo";
import { instagramShortcode } from "@/lib/studentZoneContent";
import type {
  StudentZonePageContent,
  UnionMember,
} from "@/lib/studentZoneContent";

/**
 * The Students' Union page: the standard site banner, a "Meet Our Union"
 * roster sourced from the CMS (see getStudentsUnionMembers), the page's
 * ordered sections and the contextual links.
 *
 * Server component. Members come from `site_page_sections` rows for
 * /student-zone/students-union. In local development only, two explicitly
 * labelled sample entries help preview the layout when the CMS roster is empty;
 * production continues to show the honest empty state until members are set.
 */

const BANNER_IMAGE = img("photo-1523240795612-9a054b0db644");
const BANNER_LEAD = "Representing student voices, leadership and campus life.";
const UNION_INSTAGRAM_POSTS = [
  { id: "DemSSmPvQnE", label: "Union post 1" },
  { id: "Delb74FPZQi", label: "Union post 2" },
  { id: "DeDsFKOMQTW", label: "Union post 3" },
  { id: "Deh0YkdTblH", label: "Union post 4" },
];

const HELPFUL_LINKS = [
  {
    label: "Student Clubs",
    href: "/student-zone/student-clubs",
    description: "The clubs and activities the union supports.",
  },
  {
    label: "NSS",
    href: "/student-zone/nss",
    description: "Community service and outreach on campus.",
  },
  {
    label: "Library",
    href: "/student-zone/library",
    description: "Books, reading rooms and study support.",
  },
];

function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function RoyalStudentsUnionPage({
  content,
  members,
}: {
  content: StudentZonePageContent;
  members: UnionMember[];
}) {
  const schema = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Student Zone", path: "/student-zone" },
    { name: "Students' Union", path: "" },
  ]);

  const updated = content.updatedAt ? formatDate(content.updatedAt) : "";
  const pinnedImages = content.sections.filter(
    (section) => /^pinned moments?$/i.test(section.heading.trim()) && Boolean(section.image),
  );
  const visibleSections = content.sections.filter(
    (section) => !/^pinned moments?$/i.test(section.heading.trim()),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHero
        title="Students' Union"
        crumb="Student Zone / Students' Union"
        lead={BANNER_LEAD}
        image={BANNER_IMAGE}
      />

      <main className="content ip su-page">
        {/* ------------------------------------------------------- members */}
        <section className="ip-section" aria-labelledby="su-members-title">
          <div className="container">
            <div className="ip-head">
              <h2 className="ip-title" id="su-members-title">
                Meet Our Union
              </h2>
            </div>

            <div className="su-union-showcase">
              {members.length > 0 ? (
                <ul className="su-roster" aria-label="Students' Union members">
                  {members.map((member) => (
                    <li className="su-roster-card" key={member.id}>
                      <h3 className="su-roster-name">{member.name}</h3>
                      <span className="su-roster-role">{member.role}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="sz-empty" role="status">
                  <div className="sz-empty-icon" aria-hidden="true">
                    <Users size={20} strokeWidth={2} />
                  </div>
                  <h2>No union members published yet</h2>
                </div>
              )}

            </div>

            <section className="su-pinboard-section" aria-labelledby="su-pinboard-title">
              <div className="su-pinboard-heading">
                <span className="su-pinboard-kicker">Campus life</span>
                <h3 id="su-pinboard-title">Pinned moments</h3>
              </div>
              <ul className="su-pinboard">
                {UNION_INSTAGRAM_POSTS.map((post, index) => (
                  <li className={`su-pin-card su-pin-card--${index + 1}`} key={post.id}>
                    <span className="su-pin" aria-hidden="true" />
                    <div className="su-pin-photo su-pin-photo--instagram">
                      <iframe
                        src={`https://www.instagram.com/p/${post.id}/embed/?hidecaption=1`}
                        title={post.label}
                        loading="lazy"
                        scrolling="no"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      />
                    </div>
                  </li>
                ))}
                {pinnedImages.map((moment, index) => (
                  <li className={`su-pin-card su-pin-card--${(index % 4) + 1}`} key={moment.id}>
                    <span className="su-pin" aria-hidden="true" />
                    <div className={`su-pin-photo${instagramShortcode(moment.image) ? " su-pin-photo--instagram" : ""}`}>
                      {instagramShortcode(moment.image) ? (
                        <iframe
                          src={`https://www.instagram.com/p/${instagramShortcode(moment.image)}/embed/?hidecaption=1`}
                          title={moment.imageAlt || "Students’ Union pinned moment"}
                          loading="lazy"
                          scrolling="no"
                          tabIndex={-1}
                        />
                      ) : (
                        <img
                          src={moment.image ?? ""}
                          alt={moment.imageAlt || "Students’ Union pinned moment"}
                          loading="lazy"
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>

        {/* --------------------------------------------------- page content */}
        {visibleSections.length > 0 ? (
          <section className="ip-section">
            <div className="container ip-narrow">
              <div className="ip-sections">
                {visibleSections.map((section) => (
                  <section className="ip-block" key={section.id}>
                    {section.heading ? (
                      <h2 className="ip-block-title">{section.heading}</h2>
                    ) : null}

                    {section.paragraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}

                    {section.list.length > 0 ? (
                      <ul className="ip-block-list">
                        {section.list.map((item, index) => (
                          <li key={index}>
                            <span className="ip-block-mark" aria-hidden="true">
                              ✓
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {section.cards.length > 0 ? (
                      <ul className="ip-points">
                        {section.cards.map((card) => (
                          <li className="ip-point" key={card.title}>
                            <span className="ip-point-mark" aria-hidden="true">
                              ✓
                            </span>
                            <div>
                              <strong>{card.title}</strong>
                              {card.text ? <p>{card.text}</p> : null}
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {section.image ? (
                      <figure className="szp-media">
                        <img
                          src={section.image}
                          alt={section.imageAlt ?? ""}
                          loading="lazy"
                        />
                      </figure>
                    ) : null}

                    {section.linkUrl ? (
                      <a
                        className="szp-link"
                        href={section.linkUrl}
                        {...(section.linkUrl.startsWith("/")
                          ? {}
                          : { target: "_blank", rel: "noopener noreferrer" })}
                      >
                        {section.linkLabel}
                        <ArrowRight size={14} strokeWidth={2.3} aria-hidden="true" />
                      </a>
                    ) : null}
                  </section>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* --------------------------------------------------------- links */}
        <section className="ip-section su-helpful-links">
          <div className="container">
            <div className="ip-head">
              <h2 className="ip-title">Helpful links</h2>
            </div>
            <div className="sz-grid">
              {HELPFUL_LINKS.map((link) => (
                <Link className="sz-card" href={link.href} key={link.href}>
                  <span className="sz-card-body">
                    <span className="sz-card-title">{link.label}</span>
                    <span className="sz-card-text">{link.description}</span>
                  </span>
                  <span className="sz-card-go" aria-hidden="true">
                    <ArrowRight size={16} strokeWidth={2.2} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ meta */}
        {updated ? (
          <section className="ip-section">
            <div className="container ip-narrow">
              <p className="szp-meta muted">Last updated {updated}</p>
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
