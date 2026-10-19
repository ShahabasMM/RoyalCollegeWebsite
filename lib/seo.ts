import type { Metadata } from "next";

/**
 * Single source of truth for SEO. Everything here is verified from the site's
 * own content files — nothing invented.
 *
 * Deliberately absent, because the repo does not support them:
 *  - foundingDate: HomePage says "since 2010" / "20+ years" while
 *    content/aboutPages.ts says "10th year". Contradictory, so omitted.
 *  - sameAs: the footer social links point at bare root domains
 *    (instagram.com, linkedin.com, ...), not college profiles. Claiming them
 *    would tell Google the college is on accounts it does not own.
 *  - streetAddress / postalCode: not present anywhere in the repo.
 *  - accreditation: no NAAC/UGC/AICTE/NBA claim is made anywhere on the site.
 */

/** Canonical origin. Overridable so preview deployments keep self-canonical. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://royalcollege.net"
).replace(/\/+$/, "");

export const SCHOOL_NAME = "Royal College of Arts & Science";
export const SCHOOL_SHORT_NAME = "Royal College Thrithala";
export const SCHOOL_URL_NAME = "Royal College of Arts & Science, Thrithala";
export const SCHOOL_LEGAL = `${SCHOOL_NAME}, Thrithala`;

export const LOCALITY = "Thrithala";
export const REGION = "Kerala";
export const DISTRICT = "Palakkad";
export const COUNTRY = "IN";
export const COUNTRY_NAME = "India";

export const DEFAULT_DESCRIPTION =
  "Royal College of Arts & Science, Thrithala, Palakkad, Kerala — an undergraduate college affiliated to the University of Calicut. Explore academic programmes, admissions, departments, faculty, campus life and student activities.";

/** Title appended by the template on every non-home page. */
export const TITLE_SUFFIX = `${SCHOOL_NAME}, Thrithala`;

export const PHONE_INTL = ["+91 4662270894", "+91 4662081620"];
export const PHONE_TEL = ["tel:+9146662270894", "tel:+914662081620"];
export const EMAIL = "royalcsa@gmail.com";

export const OG_IMAGE_PATH = "/opengraph-image";
export const OG_IMAGE_ALT = `${SCHOOL_NAME}, Thrithala, ${REGION}`;

/**
 * Absolute URL helper. metadataBase covers this for the built-in metadata
 * fields; this is for hand-built JSON-LD where there is no base to inherit.
 */
export function absoluteUrl(path: string): string {
  return new URL(path, `${SITE_URL}/`).toString();
}

/**
 * Per-page metadata factory.
 *
 * Every page gets a canonical, OG and Twitter block from one call so titles and
 * social previews can never drift apart. Pages pass only what is unique.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  imageAlt = OG_IMAGE_ALT,
  type = "website",
  keywords,
  noIndex = false,
}: {
  /** Page title WITHOUT the suffix; the root template appends it. */
  title: string;
  description: string;
  /** Absolute path, e.g. "/about/principals-message". */
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: path },
    keywords,
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type,
      url,
      siteName: SCHOOL_LEGAL,
      // Uses the page title verbatim. Appending the school name here produced
      // redundant strings like "Contact Royal College... | Royal College..."
      // and, on the homepage, doubled the brand twice over. The site name and
      // the canonical already carry that signal for social crawlers.
      title,
      description,
      locale: "en_IN",
      images: [{ url: image ?? OG_IMAGE_PATH, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image ? absoluteUrl(image) : OG_IMAGE_PATH],
    },
  };
}

/**
 * Builds a description from the page's own lead sentence, trimmed to a length
 * search engines will display. Slug pages already carry a written one-sentence
 * `heroLead`, so reusing it avoids a second, divergent copy of the same idea.
 */
export function descriptionFrom(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;

  const cut = clean.slice(0, max);
  const lastStop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "));
  if (lastStop > 60) return cut.slice(0, lastStop + 1);

  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace).replace(/[,;:]$/, "")}…`;
}

export type Crumb = { name: string; path: string };

/**
 * BreadcrumbList JSON-LD.
 *
 * `path: ""` marks the current page. Schema.org allows the last ListItem to
 * omit `item`, and it should — pointing it at its own URL adds no information.
 */
export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      ...(crumb.path ? { item: absoluteUrl(crumb.path) } : {}),
    })),
  };
}

/**
 * EducationalOrganization for the college.
 *
 * Only verified fields. `telephone` and `email` come from
 * content/contactDetails.ts; the address is locality-level because the site
 * publishes no street address.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": absoluteUrl("/#organization"),
    name: SCHOOL_NAME,
    alternateName: [SCHOOL_SHORT_NAME, "Royal College Trithala Palakkad"],
    url: absoluteUrl("/"),
    description: DEFAULT_DESCRIPTION,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/college-logo.png"),
      width: 500,
      height: 157,
    },
    image: absoluteUrl("/opengraph-image"),
    address: {
      "@type": "PostalAddress",
      addressLocality: LOCALITY,
      addressRegion: REGION,
      addressCountry: COUNTRY,
    },
    areaServed: [
      { "@type": "City", name: "Thrithala" },
      { "@type": "AdministrativeArea", name: "Palakkad District" },
      { "@type": "AdministrativeArea", name: "Kerala" },
    ],
    telephone: PHONE_INTL,
    email: EMAIL,
    parentOrganization: {
      "@type": "Organization",
      name: "Al Noor Educational and Charitable Trust",
    },
    department: [
      { "@type": "Organization", name: "Department of Computer Applications" },
      { "@type": "Organization", name: "Department of Commerce" },
      { "@type": "Organization", name: "Department of English" },
      { "@type": "Organization", name: "Department of Malayalam" },
      { "@type": "Organization", name: "Department of Arabic" },
      { "@type": "Organization", name: "Department of Business Administration" },
    ],
  };
}

/** WebSite schema for the site itself. No SearchAction: there is no search. */
export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: absoluteUrl("/"),
    name: `${SCHOOL_NAME}, ${LOCALITY}`,
    publisher: { "@id": absoluteUrl("/#organization") },
    inLanguage: "en-IN",
  };
}