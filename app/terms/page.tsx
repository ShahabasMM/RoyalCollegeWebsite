import PageHero from "@/components/PageHero";
import { img } from "@/content/innerPageData";

const cards = [
  {
    title: "Website use",
    text: "Do not misuse the website, interfere with its security or availability, or attempt to access information that is not intended for you.",
  },
  {
    title: "Information accuracy",
    text: "Admission requirements, fees and programme details can change. Confirm anything important with the college office before acting on it.",
  },
  {
    title: "Content ownership",
    text: "College text, images and design belong to Royal College of Arts & Science and may not be republished without written permission.",
  },
  {
    title: "External links",
    text: "Links to the University of Calicut and other official sites are provided for convenience. We are not responsible for their content.",
  },
  {
    title: "Admissions and applications",
    text: "Online applications are governed by University of Calicut rules. Submitting a form here does not create an admission commitment.",
  },
  {
    title: "Questions",
    text: "We are happy to clarify these terms or any information published on this website. Contact the office during working hours.",
  },
];

export default function Terms() {
  return (
    <>
      <PageHero
        title="Terms & Conditions"
        crumb="Terms & Conditions"
        image={img("photo-1450101499163-c8848c66ca85")}
        lead="The rules for using this website, and where to ask when something is unclear."
      />

      <main className="content ip">
        <section className="ip-section">
          <div className="container ip-narrow">
            <div className="section-kicker">Using our website</div>
              <h2 className="ip-title">A clear and respectful experience.</h2>
              <p className="muted ip-lead">
                By using this website, you agree to use its information responsibly and for
                lawful purposes. Content is provided for general information about Royal
                College of Arts &amp; Science.
              </p>
              <p className="muted">
                While we work to keep information accurate and available, details such as
                admission requirements and programme information may change. Please contact the
                college office for current guidance.
              </p>
          </div>
        </section>

        <section className="ip-section section-soft">
          <div className="container">
            <div className="ip-head">
              <div className="section-kicker">The detail</div>
              <h2 className="ip-title">What we ask of you.</h2>
            </div>
            <div className="ip-cards">
              {cards.map((card) => (
                <article className="ip-card" key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
