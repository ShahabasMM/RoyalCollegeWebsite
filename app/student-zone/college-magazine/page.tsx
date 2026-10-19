import type { Metadata } from "next";

import CollegeMagazineShelf from "@/components/CollegeMagazineShelf";
import { getStudentResources } from "@/lib/siteContent";
import { getStudentZonePage } from "@/lib/studentZoneContent";
import { descriptionFrom, pageMetadata } from "@/lib/seo";

const SLUG = "college-magazine";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getStudentZonePage(SLUG);

  return pageMetadata({
    title: page.title,
    description: descriptionFrom(page.lead),
    path: page.path,
  });
}

export default async function CollegeMagazinePage() {
  const [page, editions] = await Promise.all([
    getStudentZonePage(SLUG),
    getStudentResources("magazine"),
  ]);

  return <CollegeMagazineShelf title={page.title} lead={page.lead} editions={editions} />;
}
