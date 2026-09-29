import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { img } from "@/content/innerPageData";
import { EMAIL, PHONES } from "@/content/contactDetails";

const contact = {
  title: "General office",
  text: "Admissions, academics, certificates, records and anything that needs a signature.",
  phones: PHONES,
  email: EMAIL,
};

const visit = [
  { label: "Office hours", value: "Monday – Saturday, 9.30 am to 4.30 pm" },
  { label: "Campus visits", value: "By appointment during working hours" },
];

export default function Contact() {
  return (
    <>
      <PageHero
        title="Contact Us"
        crumb="Contact"
        image={img("photo-1497366811353-6870744d04b2")}
        lead="Questions about admission, academics or campus life — the office is open every working day."
      />

      <main className="content ip">
        <section className="ip-section">
          <div className="container ip-contact">
            <div className="ip-contact-cards">
              <article className="ip-contact-card">
                <div className="ip-contact-card-icon" aria-hidden="true">
                  <Phone size={18} strokeWidth={2.1} />
                </div>
                <h3>{contact.title}</h3>
                <p className="muted">{contact.text}</p>
                <dl className="ip-contact-rows">
                  <div>
                    <dt>Phone</dt>
                    <dd>
                      {contact.phones.map((phone) => (
                        <a key={phone} href={`tel:+91${phone}`}>
                          {phone}
                        </a>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt>Email</dt>
                    <dd>
                      <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    </dd>
                  </div>
                </dl>
              </article>
            </div>

            <div className="ip-contact-form">
              <div className="section-kicker">Send a message</div>
              <ContactForm />
            </div>
          </div>
        </section>

        <section className="ip-section section-soft">
          <div className="container ip-visit">
            <div className="ip-visit-media">
              <Image
                src={img("photo-1571260899304-425eee4c7efc", 2000)}
                alt="College campus"
                width={2000}
                height={1333}
                sizes="(max-width: 900px) 100vw, 620px"
              />
            </div>
            <div>
              <div className="section-kicker">Visit the college</div>
              <h2>Royal College of Arts &amp; Science</h2>
              <p className="muted">
                Kerala, India. Visits are welcome during working hours — arrange a tour with
                the office and walk through the classrooms, library and laboratories.
              </p>
              <dl className="ip-visit-list">
                {visit.map((row) => (
                  <div key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
