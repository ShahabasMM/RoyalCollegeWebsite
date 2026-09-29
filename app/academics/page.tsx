import Image from "next/image";
import Link from "next/link";
import InnerPage from "@/components/InnerPage";
import { buildPage, img } from "@/content/innerPageData";
import type { InnerPageData } from "@/components/InnerPage";

const data: InnerPageData = buildPage("Academics", {
  title: "Academics",
  heroImage: img("photo-1523240795612-9a054b0db644"),
  heroLead:
    "Four undergraduate departments, one University of Calicut framework, practical work in every programme.",
  kicker: "Academics",
  heading: "Structure first, then support, then stretch.",
  lead: "Each programme runs on a three-year plan of core papers, practical work and continuous internal assessment. Teaching is planned department-wise against the University of Calicut syllabus, and every student has a faculty mentor for the full programme.",
  points: [
    {
      title: "University of Calicut curriculum",
      text: "Credits, internal assessment weightage and examinations follow the University structure exactly.",
    },
    {
      title: "Continuous internal assessment",
      text: "Assignments, seminars, class tests and laboratory records are assessed through the semester.",
    },
    {
      title: "Tutorials and remedial support",
      text: "Extra sessions in the weeks before examinations for the units students find difficult.",
    },
  ],
  highlights: {
    kicker: "Departments",
    title: "Where the teaching happens",
    items: [
      {
        title: "Computer Applications",
        text: "Programming, databases, web technologies and software practice with weekly laboratory work.",
      },
      {
        title: "Commerce",
        text: "Accounting, business law, financial management and computerised accounting practicals.",
      },
      {
        title: "English",
        text: "Literature, grammar, communication and writing skills that support every programme.",
      },
      {
        title: "Business Administration",
        text: "Management, marketing, human resources and case-based organisational study.",
      },
    ],
  },
});

const programmes = [
  {
    name: "BCA",
    full: "Bachelor of Computer Applications",
    image: img("photo-1516321318423-f06f85e504b3", 900),
    href: "/programs/bca",
    meta: ["3 years", "Practical labs", "Calicut"],
  },
  {
    name: "B.Com",
    full: "Bachelor of Commerce",
    image: img("photo-1523240795612-9a054b0db644", 900),
    href: "/programs/bcom",
    meta: ["3 years", "Tally & accounting", "Calicut"],
  },
  {
    name: "BA English",
    full: "Bachelor of Arts in English",
    image: img("photo-1521587760476-6c12a4b040da", 900),
    href: "/programs/ba-english",
    meta: ["3 years", "Communication lab", "Calicut"],
  },
  {
    name: "BBA",
    full: "Bachelor of Business Administration",
    image: img("photo-1522202176988-66273c2fd55f", 900),
    href: "/programs/bba",
    meta: ["3 years", "Case-based", "Calicut"],
  },
];

export default function Academics() {
  return (
    <>
      <InnerPage data={data} />
      <section className="ip-section section-soft ip-section-flush">
        <div className="container">
          <div className="ip-head">
            <div className="section-kicker">Programmes</div>
            <h2>Choose a path that fits your future.</h2>
            <p className="muted">
              Every programme is a three-year degree affiliated to the University of Calicut.
              Compare the subject mix and pick the one you want to study for three years.
            </p>
          </div>
          <div className="ip-program-grid">
            {programmes.map((programme) => (
              <Link className="ip-program" href={programme.href} key={programme.href}>
                <div className="ip-program-media">
                  <Image
                    src={programme.image}
                    alt={programme.name}
                    width={900}
                    height={600}
                    sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 25vw"
                  />
                  <span className="ip-program-badge">{programme.name}</span>
                </div>
                <div className="ip-program-body">
                  <h3>{programme.full}</h3>
                  <ul className="ip-program-meta">
                    {programme.meta.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <span className="ip-program-cta">
                    View programme <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
