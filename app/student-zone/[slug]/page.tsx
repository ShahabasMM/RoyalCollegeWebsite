import { notFound } from "next/navigation";
import InnerPage from "@/components/InnerPage";
import { studentZonePages } from "@/content/studentZonePages";

type PageParams = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(studentZonePages).map((slug) => ({ slug }));
}

export default async function StudentZoneDestination({ params }: PageParams) {
  const { slug } = await params;
  const page = studentZonePages[slug];

  if (!page) {
    notFound();
  }

  return <InnerPage data={page} />;
}
