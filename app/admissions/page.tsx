import InnerPage from "@/components/InnerPage";
import { buildPage, img } from "@/content/innerPageData";
import type { InnerPageData } from "@/components/InnerPage";

const steps = [
  {
    title: "01 · Fill the application",
    text: "Enter your personal, academic and contact details exactly as they appear on your certificates.",
  },
  {
    title: "02 · Upload documents",
    text: "Attach clear scans of mark sheets, certificates and identification for verification.",
  },
  {
    title: "03 · Submit and save the reference",
    text: "Submit the form and keep the acknowledgement — quote that reference in every communication.",
  },
  {
    title: "04 · Merit list and seat allotment",
    text: "Merit ranking and seat allotment follow University of Calicut norms, with a waiting list in order.",
  },
  {
    title: "05 · Confirm your seat",
    text: "Accept the seat and pay fees within the University deadline to confirm admission.",
  },
  {
    title: "06 · Orientation and classes",
    text: "Report to campus for orientation, ID formalities and the first day of teaching.",
  },
];

const data: InnerPageData = buildPage("Admissions", {
  title: "Admissions",
  heroImage: img("photo-1627556704302-624286467c65"),
  heroLead:
    "Admissions for the current academic year are open, conducted as per University of Calicut guidelines.",
  kicker: "Admissions 2026–27",
  heading: "Start your journey at Royal College.",
  lead: "Applying takes one online form and a set of documents. Everything after that — verification, merit ranking, seat allotment and fee payment — follows the University of Calicut schedule, and the college keeps you informed at every stage.",
  points: [
    {
      title: "Apply online, once",
      text: "One form for the whole process, with an acknowledgement number for all follow-up.",
    },
    {
      title: "Eligibility you can check",
      text: "Minimum qualifications and required documents for each programme are published, so you can verify before submitting.",
    },
    {
      title: "Guidance when you need it",
      text: "The admissions office helps with documentation, University procedures and seat acceptance, in person or on the phone.",
    },
  ],
  highlights: {
    kicker: "Programmes open",
    title: "What you can apply to",
    items: [
      {
        title: "BCA — Computer Applications",
        text: "For students interested in programming, databases and web technology. Plus Two with mathematics is preferred.",
      },
      {
        title: "B.Com — Commerce",
        text: "For students wanting accounting, finance, law and taxation with computerised accounting practicals.",
      },
      {
        title: "BA English and BBA",
        text: "Literature and communication, or management, marketing and human resources, with the same University framework.",
      },
    ],
  },
});

export default function Admissions() {
  return (
    <>
      <InnerPage data={data} />
      <section className="ip-section section-soft ip-section-flush">
        <div className="container">
          <div className="ip-head">
            <div className="section-kicker">Step by step</div>
            <h2>Six steps from application to the first class.</h2>
          </div>
          <div className="ip-cards">
            {steps.map((step) => (
              <article className="ip-card" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
