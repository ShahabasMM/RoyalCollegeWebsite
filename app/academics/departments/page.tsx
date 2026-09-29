import { BookOpen, Calculator, Feather, Globe, type LucideIcon } from "lucide-react";
import PageHero from "@/components/PageHero";
import { img } from "@/content/innerPageData";
import { getDepartments } from "@/lib/siteContent";

export const revalidate = 300;

/** The site has always used these icons; a new department falls back to BookOpen. */
const ICONS: Record<string, LucideIcon> = {
  English: BookOpen,
  Commerce: Calculator,
  Malayalam: Feather,
  Arabic: Globe,
};

export default async function DepartmentsPage() {
  const departments = await getDepartments();

  return (
    <>
      <PageHero
        title="Departments"
        crumb="Academics / Departments"
        image={img("photo-1524178232363-1fb2b075b655")}
        lead="The teaching departments on campus."
      />

      <main className="content ip">
        <section className="ip-section">
          <div className="container">
            {departments.length === 0 ? (
              <p className="muted">No departments have been published yet.</p>
            ) : (
            <div className="dp-grid">
              {departments.map(({ name, hod }) => {
                const Icon = ICONS[name] ?? BookOpen;

                return (
                  <article key={name} className="dp-card">
                    <span className="dp-card-icon" aria-hidden="true">
                      <Icon size={20} strokeWidth={1.9} />
                    </span>
                    <span className="dp-card-label">Department</span>
                    <h2 className="dp-card-name">{name}</h2>
                    <div className="dp-card-hod">
                      <span className="dp-card-hod-label">Head of Department</span>
                      <span className="dp-card-hod-name">{hod ?? "Not listed"}</span>
                    </div>
                  </article>
                );
              })}
            </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
