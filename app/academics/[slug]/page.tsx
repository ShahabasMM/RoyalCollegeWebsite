import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InnerPage from "@/components/InnerPage";
import { academicsPages } from "@/content/academicsPages";
import { getAcademicCalendar } from "@/lib/siteContent";
import { descriptionFrom, pageMetadata } from "@/lib/seo";

type PageParams = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(academicsPages).map((slug) => ({ slug }));
}

/** Metadata comes from the content entry, so new slugs are covered for free. */
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const page = academicsPages[slug];

  if (!page) {
    return { title: "Page not found" };
  }

  return pageMetadata({
    title: page.title,
    description: descriptionFrom(page.heroLead),
    path: `/academics/${slug}`,
  });
}

export default async function AcademicDestination({ params }: PageParams) {
  const { slug } = await params;
  const page = academicsPages[slug];

  if (!page) {
    notFound();
  }

  const crumbs = [{ name: "Academics", path: "/academics/academic-overview" }];

  // The calendar is the one academics page the CMS owns, so the PDF cards come
  // from site_academic_calendar. The hardcoded list stays as the fallback for
  // when Supabase is unreachable or the table is empty.
  if (slug === "academic-calendar") {
    const pdfs = await getAcademicCalendar();

    if (pdfs.length > 0) {
      return <InnerPage data={{ ...page, pdfs }} crumbs={crumbs} />;
    }
  }

  return <InnerPage data={page} crumbs={crumbs} />;
}