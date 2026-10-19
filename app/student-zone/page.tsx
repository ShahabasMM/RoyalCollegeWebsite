import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";

import { activeStudentZoneItems } from "@/content/studentZoneMenu";
import { getStudentZoneMenu } from "@/lib/siteContent";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Student Zone",
  description:
    "The Student Zone at Royal College of Arts & Science, Thrithala — student clubs, NSS, the students' union, the library and prospectus.",
  path: "/student-zone",
});

/**
 * Student Zone landing page.
 *
 * A clean, minimal three-column menu of the Student Zone links (three columns on
 * desktop, two on tablet, one on mobile). Every item comes from the CMS-managed
 * menu (or the typed fallback), so this page, the header and the secondary
 * navigation can never disagree. No descriptions or extra sections are shown:
 * the menu is the page.
 */
export default async function StudentZonePage() {
  const menu = await getStudentZoneMenu();
  const items = activeStudentZoneItems(menu);

  return (
    <main className="content sz-landing">
      <div className="container">
        <h1 className="sz-landing-title">{menu.label}</h1>

        {items.length > 0 ? (
          <nav className="sz-menu" aria-label="Student Zone">
            {items.map((item) => (
              <a
                className="sz-menu-item"
                href={item.href}
                key={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <ChevronRight
                  className="sz-menu-chevron"
                  size={18}
                  strokeWidth={2.4}
                  aria-hidden="true"
                />
                <span className="sz-menu-label">{item.label}</span>
              </a>
            ))}
          </nav>
        ) : (
          <p className="sz-landing-empty" role="status">
            Student Zone links are being updated. Please check back soon.
          </p>
        )}
      </div>
    </main>
  );
}
