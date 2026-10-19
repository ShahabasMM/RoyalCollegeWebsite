"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { findActiveItem, findSection } from "@/content/sectionNav";

/**
 * Contextual secondary navigation for every main website section.
 *
 * Rendered once from the root layout, it detects the current section from the
 * route (no per-page configuration) and shows that section's submenu links in a
 * single row below the primary navbar. Routes that belong to no section render
 * nothing, so the home / news / contact pages are unaffected.
 *
 * The bar scrolls horizontally on small screens rather than wrapping into a
 * tall list, keeping the heading and hero in view.
 */
export default function SectionSubnav() {
  const pathname = usePathname();
  const section = findSection(pathname);

  if (!section) return null;

  const activeHref = findActiveItem(section, pathname);
  const isSectionHome = pathname === section.href;

  return (
    <nav className="section-subnav" aria-label={`${section.label} navigation`}>
      <div className="container section-subnav-inner">
        <Link
          className={`section-subnav-home${isSectionHome ? " is-active" : ""}`}
          href={section.href}
          aria-current={isSectionHome ? "page" : undefined}
        >
          {section.label}
        </Link>
        <ul className="section-subnav-list">
          {section.items.map((item) => {
            const isActive = activeHref === item.href;

            return (
              <li key={item.href}>
                <Link
                  className={`section-subnav-link${isActive ? " is-active" : ""}`}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
