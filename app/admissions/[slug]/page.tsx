import { notFound } from "next/navigation";
import InnerPage from "@/components/InnerPage";
import { admissionsPages } from "@/content/admissionsPages";

type PageParams = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(admissionsPages).map((slug) => ({ slug }));
}

export default async function AdmissionDestination({ params }: PageParams) {
  const { slug } = await params;
  const page = admissionsPages[slug];

  if (!page) {
    notFound();
  }

  return <InnerPage data={page} />;
}
