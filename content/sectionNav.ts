/**
 * Section (secondary) navigation configuration.
 *
 * One entry per main website section. Each entry drives the contextual
 * secondary navigation bar that sits under the primary navbar — the section
 * name on the left, its submenu links in a single horizontal row.
 *
 * This is the single source of truth for the secondary bar, and it is
 * deliberately local (typed TypeScript) rather than read from the database, so
 * the bar can never break when the CMS is unavailable. Every route below exists
 * in `app/`; none is a placeholder.
 *
 * Future CMS integration (RoyalAdmins ERP Website module):
 * the planned `site_menu_items` table (see docs/student-zone-cms-contract.md)
 * is the integration point. A section would map to `menu_key`, and each item's
 * label / route / order / visibility would come from its rows. When that lands,
 * `findSection` can be fed CMS rows for the section it matches, falling back to
 * this config. No database is read or written here.
 */

export type SectionNavItem = {
  /** Submenu label, shown on the pill. */
  label: string;
  /** Internal route (starts with `/`) or an absolute http(s) URL. */
  href: string;
  /** True for http(s) destinations that open in a new tab. */
  external?: boolean;
};

export type SectionNav = {
  /** Stable id, matching the future CMS `menu_key`. */
  id: string;
  /** Section name, shown on the left of the bar. */
  label: string;
  /** Page the section name links to (the section overview). */
  href: string;
  /** URL prefix used to detect this section from the current route. */
  match: string;
  items: SectionNavItem[];
};

export const sectionNavs: SectionNav[] = [
  {
    id: "about",
    label: "About",
    href: "/about",
    match: "/about",
    items: [
      { label: "About College", href: "/about/about-college" },
      { label: "Principal's Message", href: "/about/principals-message" },
      { label: "Chairman Message", href: "/about/chairman-message" },
      { label: "Vision & Mission", href: "/about/vision-mission" },
      { label: "Accreditation & Recognition", href: "/about/accreditation-recognition" },
    ],
  },
  {
    id: "academics",
    label: "Academics",
    href: "/academics",
    match: "/academics",
    items: [
      { label: "Academic Overview", href: "/academics/academic-overview" },
      { label: "Programmes", href: "/academics/programmes" },
      { label: "Departments", href: "/academics/departments" },
      { label: "Faculty", href: "/academics/faculty" },
      { label: "Add-on Courses", href: "/academics/add-on-certificate-courses" },
      { label: "Academic Calendar", href: "/academics/academic-calendar" },
    ],
  },
  {
    id: "student_zone",
    label: "Student Zone",
    href: "/student-zone",
    match: "/student-zone",
    items: [
      { label: "Student Clubs", href: "/student-zone/student-clubs" },
      { label: "Prospectus", href: "/student-zone/prospectus" },
      { label: "NSS", href: "/student-zone/nss" },
      { label: "Students' Union", href: "/student-zone/students-union" },
      { label: "College Magazine", href: "/student-zone/college-magazine" },
      { label: "Campus Culture & Gallery", href: "/student-zone/campus-culture-gallery" },
      { label: "Library", href: "/student-zone/library" },
    ],
  },
  {
    id: "admissions",
    label: "Admissions",
    href: "/admissions",
    match: "/admissions",
    items: [
      { label: "Admission Overview", href: "/admissions/admission-overview" },
      { label: "Eligibility", href: "/admissions/eligibility" },
      { label: "Application Process", href: "/admissions/application-process" },
      { label: "Fee Structure", href: "/admissions/fee-structure" },
      { label: "Apply Online", href: "/admissions/apply-online" },
      { label: "Admission Notifications", href: "/admissions/admission-notifications" },
    ],
  },
  {
    id: "campus",
    label: "Campus",
    href: "/campus/campus-life",
    match: "/campus",
    items: [
      { label: "Campus Life", href: "/campus/campus-life" },
      { label: "Gallery", href: "/campus/gallery" },
      { label: "Library", href: "/campus/library" },
      { label: "NSS", href: "/campus/nss" },
      { label: "Clubs & Activities", href: "/campus/clubs-activities" },
    ],
  },
];

/** True when `pathname` is `base` or a nested route beneath it. */
function isWithin(pathname: string, base: string): boolean {
  return pathname === base || pathname.startsWith(`${base}/`);
}

/**
 * The section a route belongs to, or `undefined` for routes outside any section
 * (home, news, contact, the legal pages, `/programs/*`, …). When prefixes could
 * overlap, the longest prefix wins.
 */
export function findSection(pathname: string): SectionNav | undefined {
  let best: SectionNav | undefined;

  for (const section of sectionNavs) {
    if (!isWithin(pathname, section.match)) continue;
    if (!best || section.match.length > best.match.length) best = section;
  }

  return best;
}

/**
 * The href of the item that should be highlighted for a route — the most
 * specific matching item, so nested routes (e.g. `/academics/programmes/bba`)
 * light up their parent (`/academics/programmes`). The section overview itself
 * matches no item, which is when the section name on the left is active.
 */
export function findActiveItem(
  section: SectionNav,
  pathname: string,
): string | undefined {
  let best: string | undefined;

  for (const item of section.items) {
    if (item.external) continue;
    if (!isWithin(pathname, item.href)) continue;
    if (!best || item.href.length > best.length) best = item.href;
  }

  return best;
}
