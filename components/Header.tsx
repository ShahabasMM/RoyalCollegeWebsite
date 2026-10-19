"use client";

import { ChevronDown, Menu, ShieldCheck, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { activeStudentZoneItems } from "@/content/studentZoneMenu";
import { useApplyEnabled, useStudentZoneMenu } from "./SiteLiveProvider";

type MegaLink = {
  label: string;
  href: string;
  /** True for http(s) destinations that open in a new tab. */
  external?: boolean;
};

type MegaMenu = {
  id: string;
  label: string;
  description: string;
  href: string;
  /** Two-column list of links with descriptions. */
  links?: MegaLink[];
};

type NavigationItem = {
  label: string;
  href?: string;
  menuId?: string;
};

const APPLY_URL = "https://royalcollege.vercel.app/apply";

/**
 * Staff shortcut to the separate admin app, which lives on its own deployment.
 * Icon only, and labelled for screen readers so it is not an unlabelled target.
 */
const ADMIN_URL = "https://erp.royalcollege.net";

/** The three menus that are part of the site's own structure. */
const staticMegaMenus: MegaMenu[] = [
  {
    id: "about",
    label: "About",
    description:
      "Discover Royal College — our story, leadership, values and the people who guide our campus community.",
    href: "/about/about-college",
    links: [
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
    description:
      "Explore departments, programmes and academic resources built for your growth.",
    href: "/academics/academic-overview",
    links: [
      { label: "Academic Overview", href: "/academics/academic-overview" },
      { label: "Departments", href: "/academics/departments" },
      { label: "Faculty", href: "/academics/faculty" },
      { label: "Programmes", href: "/academics/programmes" },
      { label: "Add-on Courses", href: "/academics/add-on-certificate-courses" },
      { label: "Academic Calendar", href: "/academics/academic-calendar" },
    ],
  },
];

const navigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/about-college", menuId: "about" },
  { label: "Academics", href: "/academics/academic-overview", menuId: "academics" },
  { label: "Student's Zone", href: "/student-zone", menuId: "student-zone" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

/** True when a menu has something to show in a dropdown. */
function hasLinks(menu: MegaMenu | undefined): boolean {
  if (!menu) return false;

  return Boolean(menu.links?.length);
}

export default function Header() {
  const applyEnabled = useApplyEnabled();
  const studentZone = useStudentZoneMenu();

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
  // Used to tell a click inside the header from one on the page behind it.
  const headerRef = useRef<HTMLElement>(null);

  // The Student Zone menu comes from the CMS (or the typed fallback), so its
  // items can change while the page is open. About / Academics stay static
  // because they describe the site's own fixed structure.
  const megaMenus = useMemo<MegaMenu[]>(
    () => [
      ...staticMegaMenus,
      {
        id: "student-zone",
        label: studentZone.label,
        description:
          "Clubs, NSS, the students' union, publications, library and student resources.",
        href: studentZone.href,
        links: activeStudentZoneItems(studentZone).map((item) => ({
          label: item.label,
          href: item.href,
          external: item.external,
        })),
      },
    ],
    [studentZone],
  );

  const clearCloseTimer = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const closeMenus = () => {
    clearCloseTimer();
    setActiveMenu(null);
    setMenuOpen(false);
  };

  const openMenu = (menuId: string) => {
    clearCloseTimer();
    setActiveMenu(menuId);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => {
      setActiveMenu(null);
      closeTimer.current = null;
    }, 180);
  };

  const toggleMenu = (menuId: string) => {
    clearCloseTimer();
    setActiveMenu((current) => (current === menuId ? null : menuId));
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        clearCloseTimer();
        setActiveMenu(null);
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // A panel opened by click needs dismissing on a click elsewhere. Hover
  // already closed it via onMouseLeave; now that a click can open it, a click
  // on the page body has to as well, otherwise the panel hangs open over the
  // content until the pointer happens to leave the header.
  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        clearCloseTimer();
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const linkAttrs = (link: MegaLink) =>
    link.external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <header
      ref={headerRef}
      className="topbar"
      onMouseEnter={clearCloseTimer}
      onMouseLeave={scheduleClose}
    >
      <div className="container nav">
        <Link className="brand" href="/" onClick={closeMenus}>
          <span className="crest">
            <Image
              className="crest-image"
              src="/college-mark.png"
              alt="Royal College of Arts & Science logo"
              width={160}
              height={153}
              priority
            />
          </span>
          <span className="brand-copy">
            ROYAL COLLEGE
            <small>OF ARTS &amp; SCIENCE</small>
            <small className="brand-affiliation">
              Affiliated to University of Calicut
            </small>
          </span>
        </Link>
        <nav className={`navlinks ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          {navigation.map((item) => {
            const menu = item.menuId
              ? megaMenus.find((entry) => entry.id === item.menuId)
              : undefined;

            // A menu with nothing published yet (a CMS-managed menu switched
            // off) renders as a plain link to its overview page rather than an
            // empty dropdown.
            if (!menu || !hasLinks(menu)) {
              return (
                <a href={item.href} key={item.label} onClick={closeMenus}>
                  {item.label}
                </a>
              );
            }

            const isActive = activeMenu === menu.id;
            const isMobile = () => window.matchMedia("(max-width: 900px)").matches;

            return (
              <div
                className={`nav-menu-item ${isActive ? "is-active" : ""}`}
                key={menu.id}
                onMouseEnter={() => {
                  if (!isMobile()) {
                    openMenu(menu.id);
                  }
                }}
              >
                <a
                  className="nav-trigger"
                  href={item.href}
                  aria-controls={`${menu.id}-menu`}
                  aria-expanded={isActive}
                  aria-haspopup="true"
                  onClick={(event) => {
                    // Clicking a main item opens its submenu and never
                    // navigates. The link stays in the markup so the href still
                    // reaches a meaningful page for crawlers and middle-click,
                    // and the mega panel carries a "View all" link for anyone
                    // who does want the overview page.
                    event.preventDefault();
                    toggleMenu(menu.id);
                  }}
                  onKeyDown={(event) => {
                    // Space and ArrowDown open the panel without scrolling.
                    if (event.key === " " || event.key === "ArrowDown") {
                      event.preventDefault();
                      openMenu(menu.id);
                    }
                  }}
                  onFocus={() => {
                    if (!isMobile()) {
                      openMenu(menu.id);
                    }
                  }}
                >
                  {item.label}
                  <ChevronDown
                    className={isActive ? "is-rotated" : ""}
                    size={14}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </a>
                <div
                  className={`mobile-subnav ${isActive ? "is-open" : ""}`}
                  aria-label={`${menu.label} sub-navigation`}
                >
                  {menu.links?.map((link) => (
                    <a href={link.href} key={link.href} onClick={closeMenus} {...linkAttrs(link)}>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
          {applyEnabled ? (
            <a className="mobile-apply" href={APPLY_URL} onClick={closeMenus}>
              Apply now <span>→</span>
            </a>
          ) : null}
        </nav>
        <div className="nav-actions">
          {applyEnabled ? (
            <a className="apply" href={APPLY_URL} onClick={closeMenus}>
              Apply now <span>→</span>
            </a>
          ) : null}
          <a
            className="admin-link"
            href={ADMIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Admin"
            aria-label="Open the site admin"
          >
            <ShieldCheck size={17} strokeWidth={2} aria-hidden="true" />
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => {
              clearCloseTimer();
              setActiveMenu(null);
              setMenuOpen((open) => !open);
            }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {megaMenus.map((menu) => {
        const isActive = activeMenu === menu.id;

        return (
          <div
            className={`mega-layer ${isActive ? "is-open" : ""}`}
            id={`${menu.id}-menu`}
            key={menu.id}
            aria-hidden={!isActive}
            onMouseEnter={isActive ? clearCloseTimer : undefined}
            onMouseLeave={isActive ? scheduleClose : undefined}
          >
            <div className="mega-panel">
              <div className="mega-panel-inner">
                <div className="mega-intro">
                  <span className="mega-intro-label">Overview</span>
                  <h3 className="mega-intro-title">{menu.label}</h3>
                  <p className="mega-intro-text">{menu.description}</p>
                  <a className="mega-intro-link" href={menu.href} onClick={closeMenus}>
                    View all <span aria-hidden="true">→</span>
                  </a>
                </div>
                <div className="mega-links">
                  {menu.links?.map((link) => (
                    <a
                      href={link.href}
                      key={link.href}
                      onClick={closeMenus}
                      {...linkAttrs(link)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </header>
  );
}
