import type { Metadata } from "next";
import InnerPage from "@/components/InnerPage";
import { programPages } from "@/content/programPages";
import { descriptionFrom, pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const page = programPages["bba"];

  return pageMetadata({
    title: page.title,
    description: descriptionFrom(page.heroLead),
    path: "/programs/bba",
  });
}

export default function bba() {
  return (
    <InnerPage
      data={programPages["bba"]}
      crumbs={[{ name: "Academics", path: "/academics/academic-overview" }]}
    />
  );
}