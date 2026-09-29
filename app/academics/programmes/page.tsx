import PageHero from "@/components/PageHero";
import ProgrammeCards from "@/components/ProgrammeCards";
import { img } from "@/content/innerPageData";
import { getProgrammes } from "@/lib/siteContent";

export const revalidate = 300;

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
