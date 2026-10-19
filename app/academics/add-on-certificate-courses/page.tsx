import type { Metadata } from "next";
import AddOnCourses from "@/components/AddOnCourses";
import PageHero from "@/components/PageHero";
import { img } from "@/content/innerPageData";
import { getAddOnCourses } from "@/lib/siteContent";

import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Add-on Certificate Courses",
  description:
    "Browse short, Kerala government approved add-on certificate courses at Royal College of Arts & Science, Thrithala, with course codes, duration and mode of study.",
  path: "/academics/add-on-certificate-courses",
});

// Rendered on every request rather than from the static cache.
//
// This page reads the CMS, and a 300s revalidate window meant an admin edit
// could sit invisible for up to five minutes even after router.refresh(): Next
// answered from the static shell. force-dynamic makes the server ask Supabase
// each time, which is what makes realtime updates actually appear.
export const dynamic = "force-dynamic";

export default async function AddOnCoursesPage() {
  const { courses } = await getAddOnCourses();

  return (
    <>
      <PageHero
        title="Add-on Course"
        crumb="Academics / Add-on Course "
        image={img("photo-1517245386807-bb43f82c33c4")}
        lead="Short, focused courses that add a specific skill to your degree."
      />

      <main className="content ip">
        <section className="ip-section">
          <div className="container ip-narrow">
            <div className="section-kicker">Short courses</div>
            <h2 className="ip-title">Pick a Add-on Course and see the full details.</h2>
            <p className="muted ip-lead">
              {courses.length} add-on courses, each with its
              duration and mode of study. Select any course to see the details.
            </p>
          </div>
        </section>

        <section className="ip-section">
          <div className="container">
            {courses.length > 0 ? (
              <AddOnCourses courses={courses} />
            ) : (
              <p className="muted">No add-on courses have been published yet.</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
