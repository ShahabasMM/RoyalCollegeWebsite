import { redirect } from "next/navigation";

/** Retire the public Question Bank page without deleting its CMS data. */
export default function RetiredQuestionBankPage() {
  redirect("/student-zone");
}
