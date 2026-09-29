import PageHero from "@/components/PageHero";
import { img } from "@/content/innerPageData";

const points = [
  {
    title: "What we collect",
    text: "Details you choose to share with us — contact information, enquiries and admission applications — plus anonymous usage data that helps us improve the site.",
  },
  {
    title: "How we use it",
    text: "To respond to enquiries, process applications, maintain academic records and communicate college announcements. We do not sell personal information.",
  },
  {
    title: "Your choices",
    text: "You can ask what we hold, request a correction, or ask us to stop non-essential communication. Contact the college office and we will action it.",
  },
];

export default function Privacy() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        crumb="Privacy Policy"
        image={img("photo-1450101499163-c8848c66ca85")}
        lead="What we collect, why we collect it, and how to reach us about it."
      />

      <main className="content ip">
        <section className="ip-section">
          <div className="container ip-narrow">
            <div className="section-kicker">Your information</div>
            <h2 className="ip-title">Privacy, handled with care.</h2>
              <p className="muted ip-lead">
                Royal College of Arts &amp; Science respects your privacy. This policy explains
                the information collected through this website and how it is used to support
                your experience with the college.
              </p>
              <p className="muted">
                Information is used only for legitimate academic, administrative and
                communication purposes. Access is limited to staff who need it, and records are
                retained only as long as they are required.
            </p>
          </div>
        </section>

        <section className="ip-section section-soft">
          <div className="container">
            <div className="ip-head">
              <div className="section-kicker">The detail</div>
              <h2>Three things worth knowing.</h2>
            </div>
            <div className="ip-cards">
              {points.map((point, index) => (
                <article className="ip-card" key={point.title}>
                  <span className="ip-card-index">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
