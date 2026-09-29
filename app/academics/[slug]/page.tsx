import { notFound } from "next/navigation";
import InnerPage from "@/components/InnerPage";
import { academicsPages } from "@/content/academicsPages";
import { getAcademicCalendar } from "@/lib/siteContent";

type PageParams = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(academicsPages).map((slug) => ({ slug }));
}

export default async function AcademicDestination({ params }: PageParams) {
  const { slug } = await params;
  const page = academicsPages[slug];

  if (!page) {
    notFound();
  }

  // The calendar is the one academics page the CMS owns, so the PDF cards come
  // from site_academic_calendar. The hardcoded list stays as the fallback for
  // when Supabase is unreachable or the table is empty.
  if (slug === "academic-calendar") {
    const pdfs = await getAcademicCalendar();

    if (pdfs.length > 0) {
      return <InnerPage data={{ ...page, pdfs }} />;
    }
  }

  return <InnerPage data={page} />;
}
