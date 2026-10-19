import type { MetadataRoute } from "next";
import { aboutPages } from "@/content/aboutPages";
import { academicsPages } from "@/content/academicsPages";
import { admissionsPages } from "@/content/admissionsPages";
import { campusPages } from "@/content/campusPages";
import { studentZonePages } from "@/content/studentZonePages";
import { programPages } from "@/content/programPages";
import { absoluteUrl } from "@/lib/seo";

/**
 * Content pages are hardcoded TypeScript, so there is no per-page updated date
 * to read. Rather than invent one, the whole informational set is stamped with
 * the deploy time: lastModified means "this content was current as of", which
 * is accurate and tells Google the site is maintained.
 */
const CONTENT_UPDATED = new Date();

// Next's Sitemap type is an Array, so indexing it yields a union that TS
// refuses to narrow by a discriminant. Declaring the enum keeps the values in
// step with the spec; pageMetadata does not have this problem because
// Metadata is a plain interface.
type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

type Route = {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
};

const STATIC_ROUTES: Route[] = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/academics", priority: 0.9, changeFrequency: "monthly" },
  { path: "/academics/programmes", priority: 0.9, changeFrequency: "monthly" },
  { path: "/academics/departments", priority: 0.8, changeFrequency: "monthly" },
  { path: "/academics/faculty", priority: 0.7, changeFrequency: "monthly" },
  { path: "/academics/add-on-certificate-courses", priority: 0.7, changeFrequency: "monthly" },
  { path: "/admissions", priority: 0.95, changeFrequency: "weekly" },
  { path: "/campus/campus-life", priority: 0.8, changeFrequency: "monthly" },
  { path: "/campus/clubs-activities", priority: 0.6, changeFrequency: "monthly" },
  { path: "/campus/gallery", priority: 0.6, changeFrequency: "weekly" },
  { path: "/campus/library", priority: 0.6, changeFrequency: "monthly" },
  { path: "/student-zone", priority: 0.7, changeFrequency: "monthly" },
  { path: "/student-zone/student-clubs", priority: 0.5, changeFrequency: "monthly" },
  { path: "/student-zone/prospectus", priority: 0.5, changeFrequency: "monthly" },
  { path: "/student-zone/nss", priority: 0.5, changeFrequency: "monthly" },
  { path: "/student-zone/campus-culture-gallery", priority: 0.5, changeFrequency: "monthly" },
  { path: "/student-zone/library", priority: 0.5, changeFrequency: "monthly" },
  { path: "/news", priority: 0.7, changeFrequency: "daily" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

/** Slug maps, expanded into real routes. */
function slugRoutes(
  source: Record<string, unknown>,
  prefix: string,
  priority: number,
): Route[] {
  return Object.keys(source).map((slug) => ({
    path: `${prefix}/${slug}`,
    priority,
    changeFrequency: "monthly",
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const content = [
    ...STATIC_ROUTES,
    ...slugRoutes(aboutPages, "/about", 0.8),
    ...slugRoutes(academicsPages, "/academics", 0.7),
    ...slugRoutes(admissionsPages, "/admissions", 0.8),
    ...slugRoutes(campusPages, "/campus", 0.6),
    ...slugRoutes(studentZonePages, "/student-zone", 0.5),
    ...slugRoutes(programPages, "/programs", 0.8),
  ];

  return content.map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified: CONTENT_UPDATED,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
