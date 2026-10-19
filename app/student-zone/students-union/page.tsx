import type { Metadata } from "next";

import RoyalStudentsUnionPage from "@/components/RoyalStudentsUnionPage";
import {
  getStudentZonePage,
  getStudentsUnionMembers,
} from "@/lib/studentZoneContent";
import { descriptionFrom, pageMetadata } from "@/lib/seo";

const SLUG = "students-union";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getStudentZonePage(SLUG);

  return pageMetadata({
    title: page.title,
    description: descriptionFrom(page.lead),
    path: page.path,
  });
}

export default async function StudentsUnionPage() {
  const [page, members] = await Promise.all([
    getStudentZonePage(SLUG),
    getStudentsUnionMembers(),
  ]);

  return <RoyalStudentsUnionPage content={page} members={members} />;
}
