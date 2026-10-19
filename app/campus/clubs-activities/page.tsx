import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ClubsExplorer from "@/components/ClubsExplorer";
import {
  clubsBodies,
  clubsClosing,
  clubsDepartmentNote,
  clubsHero,
  clubsHeroLead,
  clubsTitle,
} from "@/content/clubs";

import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Clubs & Activities",
  description:
    "Explore clubs and activities at Royal College of Arts & Science, Thrithala — arts and sports, the Women's Cell, social service activities and how to get involved.",
  path: "/campus/clubs-activities",
});

export default function ClubsActivitiesPage() {
  return (
    <>
      <PageHero
        title={clubsTitle}
        crumb="Campus / Clubs & Activities"
        image={clubsHero}
        lead={clubsHeroLead}
      />

      <main className="content ip cx">
        <section className="ip-section section-soft">
          <div className="container">
            <Reveal>
              <div className="ip-head">
                <div className="section-kicker">The bodies</div>
                <h2 className="ip-title">Choose where you want to spend your year</h2>
                <p className="muted">
                  Open any card to see what the body does and who currently
                  holds office.
                </p>
              </div>
            </Reveal>
            <ClubsExplorer bodies={clubsBodies} />
          </div>
        </section>

        <section className="ip-section">
          <div className="container ip-narrow">
            <Reveal>
              <div className="ip-block">
                <h3 className="ip-block-title">{clubsDepartmentNote.title}</h3>
                <p>{clubsDepartmentNote.text}</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="ip-section">
          <div className="container">
            <p className="ip-closing">{clubsClosing}</p>
          </div>
        </section>
      </main>
    </>
  );
}
