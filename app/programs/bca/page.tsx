import type { Metadata } from "next";
import InnerPage from "@/components/InnerPage";
import { programPages } from "@/content/programPages";
import { descriptionFrom, pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const page = programPages["bca"];

  return pageMetadata({
    title: page.title,
    description: descriptionFrom(page.heroLead),
    path: "/programs/bca",
  });
}

export default function bca() {
  return (
    <InnerPage
      data={programPages["bca"]}
      crumbs={[{ name: "Academics", path: "/academics/academic-overview" }]}
    />
  );
}