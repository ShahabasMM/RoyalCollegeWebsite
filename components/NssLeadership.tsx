import { User } from "lucide-react";

import Reveal from "@/components/Reveal";
import type { StudentZoneSection } from "@/lib/studentZoneContent";

type NssPerson = {
  role: string;
  name: string;
  subtitle: string | null;
  photo: string | null;
};

const ROLES: { label: string; match: string[] }[] = [
  { label: "Programme Officer", match: ["programme officer", "program officer"] },
  { label: "Student Leader", match: ["student leader", "nss student leader"] },
];

/**
 * Reads one leadership card from the page's published CMS sections.
 *
 * Convention (managed in RoyalAdmins → Website → Student Zone Sections):
 * a section row with page_path = '/student-zone/nss' and heading
 * "Programme Officer" or "Student Leader", where the first body paragraph is
 * the person's name, any further paragraphs become the subtitle, and the
 * optional image is their photo. Rows that do not match are ignored.
 *
 * Returns null when staff have not published the role yet, so the card can
 * show an honest "to be announced" state instead of an invented name.
 */
function personFrom(
  sections: StudentZoneSection[],
  role: { label: string; match: string[] },
): NssPerson | null {
  const section = sections.find((entry) => {
    const heading = entry.heading.trim().toLowerCase();
    return role.match.includes(heading);
  });

  if (!section) return null;

  const [name, ...rest] = section.paragraphs;
  const trimmedName = name?.trim() ?? "";

  return {
    role: role.label,
    name: trimmedName,
    subtitle: rest.map((line) => line.trim()).filter(Boolean).join(" · ") || null,
    photo: section.image,
  };
}

function initialsOf(name: string): string {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase() || "—"
  );
}

function PersonCard({ person }: { person: NssPerson }) {
  const { role, name } = person;
  const hasName = Boolean(name);

  return (
    <li className={`nss-person${hasName ? "" : " nss-person--empty"}`}>
      {person?.photo ? (
        <img
          className="nss-person-photo"
          src={person.photo}
          alt={`${name}, ${role}`}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="nss-person-avatar" aria-hidden="true">
          {hasName ? (
            initialsOf(name)
          ) : (
            <User size={24} strokeWidth={1.8} />
          )}
        </span>
      )}

      <span className="nss-person-role">{role}</span>
      <span className="nss-person-name">{hasName ? name : "To be announced"}</span>
      {person?.subtitle ? <span className="nss-person-sub">{person.subtitle}</span> : null}
    </li>
  );
}

/**
 * "NSS leadership" — two designed cards for the Programme Officer and the
 * Student Leader. Both names come from the CMS (site_page_sections rows for
 * /student-zone/nss, managed on the admin's Student Zone Sections page); the
 * page never invents either name.
 */
export default function NssLeadership({ sections }: { sections: StudentZoneSection[] }) {
  // The role label always renders; only the name/subtitle/photo depend on CMS.
  const people: NssPerson[] = ROLES.map((role) => {
    const found = personFrom(sections, role);
    return {
      role: role.label,
      name: found?.name ?? "",
      subtitle: found?.subtitle ?? null,
      photo: found?.photo ?? null,
    };
  });

  return (
    <section className="section nss-people-section" aria-labelledby="nss-people-title">
      <div className="container">
        <Reveal>
          <div className="nss-people-head">
            <div className="section-kicker">The people</div>
            <h2 id="nss-people-title">
              NSS <span>leadership.</span>
            </h2>
            <p className="nss-people-lead">
              The staff officer and student lead who coordinate Royal NSS through the
              year.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <ul className="nss-people">
            {people.map((person, index) => (
              <PersonCard person={person} key={ROLES[index].label} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
