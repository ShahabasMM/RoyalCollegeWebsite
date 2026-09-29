import { notFound } from "next/navigation";
import InnerPage from "@/components/InnerPage";
import { campusPages } from "@/content/campusPages";

type PageParams = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(campusPages).map((slug) => ({ slug }));
}

export default async function CampusDestination({ params }: PageParams) {
  const { slug } = await params;
  const page = campusPages[slug];

  if (!page) {
    notFound();
  }

  return <InnerPage data={page} />;
}
