import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InnerPage from "@/components/InnerPage";
import { campusPages } from "@/content/campusPages";
import { descriptionFrom, pageMetadata } from "@/lib/seo";

type PageParams = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(campusPages).map((slug) => ({ slug }));
}

/** Metadata comes from the content entry, so new slugs are covered for free. */
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const page = campusPages[slug];

  if (!page) {
    return { title: "Page not found" };
  }

  return pageMetadata({
    title: page.title,
    description: descriptionFrom(page.heroLead),
    path: `/campus/${slug}`,
  });
}

export default async function CampusDestination({ params }: PageParams) {
  const { slug } = await params;
  const page = campusPages[slug];

  if (!page) {
    notFound();
  }

  return (
    <InnerPage
      data={page}
      crumbs={[{ name: "Campus", path: "/campus/campus-life" }]}
    />
  );
}