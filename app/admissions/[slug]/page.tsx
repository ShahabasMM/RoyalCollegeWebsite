import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InnerPage from "@/components/InnerPage";
import { admissionsPages } from "@/content/admissionsPages";
import { descriptionFrom, pageMetadata } from "@/lib/seo";

type PageParams = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(admissionsPages).map((slug) => ({ slug }));
}

/** Metadata comes from the content entry, so new slugs are covered for free. */
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const page = admissionsPages[slug];

  if (!page) {
    return { title: "Page not found" };
  }

  return pageMetadata({
    title: page.title,
    description: descriptionFrom(page.heroLead),
    path: `/admissions/${slug}`,
  });
}

export default async function AdmissionDestination({ params }: PageParams) {
  const { slug } = await params;
  const page = admissionsPages[slug];

  if (!page) {
    notFound();
  }

  return (
    <InnerPage
      data={page}
      crumbs={[{ name: "Admissions", path: "/admissions/admission-overview" }]}
    />
  );
}