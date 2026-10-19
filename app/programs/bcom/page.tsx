import type { Metadata } from "next";
import InnerPage from "@/components/InnerPage";
import { programPages } from "@/content/programPages";
import { descriptionFrom, pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const page = programPages["bcom"];

  return pageMetadata({
    title: page.title,
    description: descriptionFrom(page.heroLead),
    path: "/programs/bcom",
  });
}

export default function BCom() {
  return (
    <InnerPage
      data={programPages["bcom"]}
      crumbs={[{ name: "Academics", path: "/academics/academic-overview" }]}
    />
  );
}