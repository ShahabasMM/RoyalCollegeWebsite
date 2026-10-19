import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InnerPage from "@/components/InnerPage";
import { studentZonePages } from "@/content/studentZonePages";
import { EXPLICIT_STUDENT_ZONE_SLUGS } from "@/lib/studentZoneContent";
import { descriptionFrom, pageMetadata } from "@/lib/seo";

type PageParams = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const explicit = EXPLICIT_STUDENT_ZONE_SLUGS as readonly string[];

  // Slugs that now have their own route directory are served by those routes,
  // so they are skipped here to avoid generating the same URL twice.
  return Object.keys(studentZonePages)
    .filter((slug) => !explicit.includes(slug))
    .map((slug) => ({ slug }));
}

/**
 * Metadata comes from the content entry, so new slugs are covered for free.
 *
 * "Academic Calendar" also exists at /academics/academic-calendar, so the
 * section name is folded into the title here. Without it the two pages ship
 * byte-identical titles and descriptions, which is the one thing a title tag
 * must never do.
 */
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const page = studentZonePages[slug];

  if (!page) {
    return { title: "Page not found" };
  }

  const isSharedTitle = slug === "academic-calendar";

  return pageMetadata({
    title: isSharedTitle ? `Student Zone ${page.title}` : page.title,
    description: descriptionFrom(page.heroLead),
    path: `/student-zone/${slug}`,
  });
}

export default async function StudentZoneDestination({ params }: PageParams) {
  const { slug } = await params;
  const page = studentZonePages[slug];

  if (!page) {
    notFound();
  }

  // The Student Zone landing page is the first breadcrumb level, so every
  // module page points back at it rather than at an arbitrary sibling.
  return (
    <InnerPage
      data={page}
      crumbs={[{ name: "Student Zone", path: "/student-zone" }]}
    />
  );
}