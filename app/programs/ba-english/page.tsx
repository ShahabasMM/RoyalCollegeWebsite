import type { Metadata } from "next";
import InnerPage from "@/components/InnerPage";
import { programPages } from "@/content/programPages";
import { descriptionFrom, pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const page = programPages["ba-english"];

  return pageMetadata({
    title: page.title,
    description: descriptionFrom(page.heroLead),
    path: "/programs/ba-english",
  });
}

export default function BAEnglish() {
  return (
    <InnerPage
      data={programPages["ba-english"]}
      crumbs={[{ name: "Academics", path: "/academics/academic-overview" }]}
    />
  );
}