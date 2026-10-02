import PageHero from "@/components/PageHero";
import ProgrammeCards from "@/components/ProgrammeCards";
import { img } from "@/content/innerPageData";
import { getProgrammes } from "@/lib/siteContent";

// Rendered on every request rather than from the static cache.
//
// This page reads the CMS, and a 300s revalidate window meant an admin edit
// could sit invisible for up to five minutes even after router.refresh(): Next
// answered from the static shell. force-dynamic makes the server ask Supabase
// each time, which is what makes realtime updates actually appear.
export const dynamic = "force-dynamic";

export default async function ProgrammesPage() {
  const programmes = await getProgrammes();

  return (
    <>
      <PageHero
        title="Programmes"
        crumb="Academics / Programmes"
        image={img("photo-1543269865-cbf427effbad")}
        lead="Four undergraduate programmes under the FYUGP scheme."
      />

      <main className="content ip">
        <section className="ip-section">
          <div className="container">
            <div className="ip-head">
              <span className="section-kicker">Choose a programme</span>
              <h2 className="ip-title">Four programmes, one standard.</h2>
              <p className="muted ip-lead">
                Select a programme to see its level, duration and department.
              </p>
            </div>
            {programmes.length > 0 ? (
              <ProgrammeCards programmes={programmes} />
            ) : (
              <p className="muted">
                No programmes have been published yet.
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
