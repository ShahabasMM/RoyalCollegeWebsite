import { notFound } from "next/navigation";
import InnerPage from "@/components/InnerPage";
import { aboutPages } from "@/content/aboutPages";

type PageParams = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(aboutPages).map((slug) => ({ slug }));
}

export default async function AboutDestination({ params }: PageParams) {
  const { slug } = await params;
  const page = aboutPages[slug];

  if (!page) {
    notFound();
  }

  return <InnerPage data={page} />;
}
