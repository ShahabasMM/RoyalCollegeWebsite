import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  HandHeart,
  HeartHandshake,
  Leaf,
  Share2,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";

import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import NssLeadership from "@/components/NssLeadership";
import NssReels from "@/components/NssReels";
import NssScrapbook from "@/components/NssScrapbook";
import {
  NSS_ACTIVITIES,
  type NssActivityIcon,
  type NssBoardPhoto,
  type NssReel,
} from "@/content/nssPage";
import { img } from "@/content/innerPageData";
import { breadcrumbJsonLd } from "@/lib/seo";
import type { StudentZonePageContent } from "@/lib/studentZoneContent";

const ACTIVITY_ICONS: Record<NssActivityIcon, LucideIcon> = {
  "heart-handshake": HeartHandshake,
  leaf: Leaf,
  stethoscope: Stethoscope,
  "share-2": Share2,
  "hand-heart": HandHeart,
  users: Users,
};

const HELPFUL_LINKS = [
  {
    label: "Campus NSS",
    href: "/campus/nss",
    description: "The NSS unit on the campus pages.",
  },
  {
    label: "Students' Union",
    href: "/student-zone/students-union",
    description: "Student representation and campus events.",
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

/**
 * The Royal NSS experience: animated hero, scrapboard, reels, leadership
 * and focus areas.
 *
 * Server component. The page resolves the board photos and reels (CMS
 * media rows → gallery photographs → typed Instagram sources); the
 * leadership names come from `site_page_sections` rows for
 * /student-zone/nss (see NssLeadership). Generic page sections are not
 * rendered — this page is fully designed.
 */
export default function RoyalNssPage({
  content,
  photos,
  reels,
}: {
  content: StudentZonePageContent;
  photos: NssBoardPhoto[];
  reels: NssReel[];
}) {
  const schema = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Student Zone", path: "/student-zone" },
    { name: "National Service Scheme", path: "" },
  ]);

  const updated = content.updatedAt ? formatDate(content.updatedAt) : "";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHero
        title="National Service Scheme"
        crumb="Student Zone / National Service Scheme"
        lead="Volunteering, community outreach and service programmes by our NSS unit."
        image={img("photo-1521791136064-7986c2920216")}
      />

      <main className="content nss-page">
        <NssScrapbook photos={photos} />

        <NssReels reels={reels} />

        {/* ------------------------------------------------------ leadership */}
        <NssLeadership sections={content.sections} />

        {/* ------------------------------------------------------ activities */}
        <section className="section nss-acts-section" aria-labelledby="nss-acts-title">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <div>
                  <div className="section-kicker section-kicker-light">Where we show up</div>
                  <h2 id="nss-acts-title">
                    Focus areas <span>of service.</span>
                  </h2>
                </div>
                <p className="section-head-aside nss-acts-aside">
                  The ground Royal NSS volunteers usually cover — day after day, hand
                  in hand with the community.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <ul className="nss-acts">
                {NSS_ACTIVITIES.map((activity) => {
                  const Icon = ACTIVITY_ICONS[activity.icon as NssActivityIcon];

                  return (
                    <li className="nss-act" key={activity.id}>
                      <span className="nss-act-icon" aria-hidden="true">
                        <Icon size={18} strokeWidth={2} />
                      </span>
                      <span className="nss-act-label">{activity.label}</span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ----------------------------------------------------------- links */}
        <section className="ip-section nss-links-section">
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
        <section className="ip-section nss-meta-section">
          <div className="container">
            <p className="szp-meta muted">
              {updated ? `Last updated ${updated} · ` : ""}
              <a
                href="https://www.instagram.com/royal_college_thrithala/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Royal NSS on Instagram
                <ExternalLink size={12} strokeWidth={2.2} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
