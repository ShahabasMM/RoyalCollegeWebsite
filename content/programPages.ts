import { assignVariants, buildPage, img, type PageDraft } from "@/content/innerPageData";
import type { InnerPageData } from "@/components/InnerPage";

const drafts: Record<string, PageDraft> = {
  bca: {
    title: "BCA",
    heroImage: img("photo-1516321318423-f06f85e504b3"),
    heroLead:
      "Bachelor of Computer Applications — three years of programming, databases and web technology, affiliated to the University of Calicut.",
    kicker: "Undergraduate programme",
    heading: "Learn to build software, not just use it.",
    lead: "BCA is built for students who want to understand how software is designed and built. The programme moves from programming fundamentals to databases, web technologies and software practice, with laboratory work in every paper that needs it.",
    points: [
      {
        title: "Programming from the first year",
        text: "Core programming, data structures and databases are taught with weekly laboratory sessions, not only theory.",
      },
      {
        title: "Tools used in industry",
        text: "Version control, databases, web technologies and development environments students actually meet at work.",
      },
      {
        title: "Projects, not only assignments",
        text: "Each year closes with a project that has to run, be explained and be improved — the closest thing to real work.",
      },
    ],
    highlights: {
      kicker: "What you study",
      title: "The core of the programme",
      items: [
        {
          title: "Programming and data structures",
          text: "Problem solving, algorithms and programming technique — the foundation everything else is built on.",
        },
        {
          title: "Databases and web technologies",
          text: "Data modelling, SQL, and building websites that store and serve real data.",
        },
        {
          title: "Software practice and projects",
          text: "Software engineering basics, project planning and a working final-year application.",
        },
      ],
    },
  },

  bcom: {
    title: "B.Com",
    heroImage: img("photo-1523240795612-9a054b0db644"),
    heroLead:
      "Bachelor of Commerce — accounting, finance, law and taxation with computerised accounting practicals.",
    kicker: "Undergraduate programme",
    heading: "Numbers, records and the decisions built on them.",
    lead: "B.Com prepares students for the financial side of business: how accounts are kept, how statements are read, and how commercial decisions are justified. Practical work in computerised accounting runs alongside the theory papers.",
    points: [
      {
        title: "Accounting that is practical",
        text: "Ledger work, financial statements and computerised accounting are practised in the laboratory, not only written about.",
      },
      {
        title: "Law and taxation",
        text: "Business law, income tax and GST give students the regulatory side of commercial practice.",
      },
      {
        title: "Software skills included",
        text: "Tally and spreadsheet work, plus financial analysis, are treated as core skills rather than optional extras.",
      },
    ],
    highlights: {
      kicker: "What you study",
      title: "The core of the programme",
      items: [
        {
          title: "Financial accounting",
          text: "From journal entries to published financial statements, with the reasoning behind each treatment explained.",
        },
        {
          title: "Business law and taxation",
          text: "The legal and tax framework a business operates within, including income tax and GST.",
        },
        {
          title: "Cost and management accounting",
          text: "Costing techniques, budgeting and financial analysis for decision making.",
        },
      ],
    },
  },

  "ba-english": {
    title: "BA English",
    heroImage: img("photo-1521587760476-6c12a4b040da"),
    heroLead:
      "Bachelor of Arts in English — literature, language and communication, affiliated to the University of Calicut.",
    kicker: "Undergraduate programme",
    heading: "Read widely. Write precisely. Speak clearly.",
    lead: "BA English studies literature and language together: how writers build meaning, how grammar shapes it, and how the reader responds. It suits students who want careers in writing, teaching, media or further literary study.",
    points: [
      {
        title: "Literature with method",
        text: "Texts are read closely and placed in context, with written work argued from evidence rather than opinion.",
      },
      {
        title: "Language and grammar",
        text: "English grammar, phonetics and language skills that improve both writing and pronunciation.",
      },
      {
        title: "Communication practice",
        text: "Presentations, group discussions and writing workshops in the communication lab.",
      },
    ],
    highlights: {
      kicker: "What you study",
      title: "The core of the programme",
      items: [
        {
          title: "Indian and world literature",
          text: "Prose, poetry and drama from Indian and world traditions, studied through their own historical settings.",
        },
        {
          title: "English grammar and language",
          text: "The mechanics of the language, and the variation in use that a graduate is expected to handle.",
        },
        {
          title: "Writing and communication",
          text: "Essay, report and creative writing, plus practical work in speaking and presentation.",
        },
      ],
    },
  },

  bba: {
    title: "BBA",
    heroImage: img("photo-1522202176988-66273c2fd55f"),
    heroLead:
      "Bachelor of Business Administration — management, marketing, human resources and organisational behaviour.",
    kicker: "Undergraduate programme",
    heading: "Manage people, money and decisions.",
    lead: "BBA deals with how organisations actually work: managing people, marketing products, handling money and leading change. Teaching is built on case analysis, presentations and group projects rather than definitions alone.",
    points: [
      {
        title: "Management from the ground up",
        text: "Principles of management, organisational behaviour and business economics, applied to real cases.",
      },
      {
        title: "Marketing and finance you can use",
        text: "Marketing management, financial management and business research with practical exercises.",
      },
      {
        title: "Work in teams",
        text: "Group projects, presentations and case analysis are core parts of the assessment, not add-ons.",
      },
    ],
    highlights: {
      kicker: "What you study",
      title: "The core of the programme",
      items: [
        {
          title: "Management principles",
          text: "Planning, organising, staffing and decision making, studied through current business examples.",
        },
        {
          title: "Marketing and human resources",
          text: "Customer, brand, recruitment and performance topics that decide how an organisation grows.",
        },
        {
          title: "Business research",
          text: "Collecting, analysing and presenting data so decisions can be defended with evidence.",
        },
      ],
    },
  },
};

const labels: Record<string, string> = {
  bca: "BCA — Bachelor of Computer Applications",
  bcom: "B.Com — Bachelor of Commerce",
  "ba-english": "BA English — Bachelor of Arts in English",
  bba: "BBA — Bachelor of Business Administration",
};

const built = Object.fromEntries(
  Object.entries(drafts).map(([slug, draft]) => [
    slug,
    buildPage("Programs", { ...draft, title: labels[slug] ?? draft.title }),
  ]),
);

export const programPages: Record<string, InnerPageData> = assignVariants(built, 2);
