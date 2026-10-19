/**
 * Student Zone navigation configuration.
 *
 * This is the site's own fallback menu and the single source of truth for the
 * Student Zone links. It is what the header and the landing page render when the
 * CMS table `site_menu_items` is missing or unreachable, so the navigation can
 * never break because the database is unavailable.
 *
 * The configured Student Zone items are shown in this order. Every entry points at a
 * real page on this site. There are no `href="#"` placeholders.
 *
 * Each item carries the four fields the RoyalAdmins Website module will manage:
 *   title (label) · route (href) · display order (order) · visibility (visible)
 *
 * See docs/student-zone-cms-contract.md for the CMS schema and the integration
 * requirements. No production database change is made here.
 */

export type StudentZoneItem = {
  /** Menu title, shown on the item and in the header. */
  label: string;
  /** Internal route (starts with `/`) or an absolute http(s) URL. */
  href: string;
  /** Display order, ascending. Kept explicit so the list stays easy to audit. */
  order: number;
  /** Visibility switch. `false` hides the item without deleting it. */
  visible: boolean;
  /** True for http(s) destinations that open in a new tab. */
  external?: boolean;
};

export type StudentZoneMenu = {
  /** Top-level navigation label. */
  label: string;
  /** Overview target: the Student Zone landing page. */
  href: string;
  items: StudentZoneItem[];
};

export const studentZoneMenu: StudentZoneMenu = {
  label: "Student Zone",
  href: "/student-zone",
  items: [
    { label: "Student Clubs", href: "/student-zone/student-clubs", order: 1, visible: true },
    { label: "Prospectus", href: "/student-zone/prospectus", order: 2, visible: true },
    { label: "NSS", href: "/student-zone/nss", order: 3, visible: true },
    { label: "Students' Union", href: "/student-zone/students-union", order: 4, visible: true },
    { label: "College Magazine", href: "/student-zone/college-magazine", order: 5, visible: true },
    {
      label: "Campus Culture & Gallery",
      href: "/student-zone/campus-culture-gallery",
      order: 6,
      visible: true,
    },
        { label: "Library", href: "/student-zone/library", order: 8, visible: true },
  ],
};

/**
 * True when a value is a usable destination. Guards against a row that was
 * published before its URL was filled in, which would otherwise render a dead
 * menu entry.
 */
export function isUsableHref(value: string | null | undefined): value is string {
  if (typeof value !== "string") return false;

  const trimmed = value.trim();

  if (!trimmed) return false;
  if (trimmed.startsWith("/")) return true;

  return /^https?:\/\//i.test(trimmed);
}

/**
 * The items a page should actually render: visible, with a usable destination,
 * in display order. Shared by the header, the secondary navigation and the
 * landing page so all three can never disagree.
 */
export function activeStudentZoneItems(
  menu: StudentZoneMenu = studentZoneMenu,
): StudentZoneItem[] {
  return menu.items
    .filter((item) => item.visible && isUsableHref(item.href))
    .sort((a, b) => a.order - b.order);
}
