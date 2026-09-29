import { img } from "@/content/innerPageData";

export type Programme = {
  name: string;
  /** Short label used on the card image tag. */
  shortName: string;
  image: string;
  /** Two-sentence summary shown on the card. */
  about: string;
  duration: string;
  /** All programmes run under the FYUGP scheme. */
  scheme: string;
  department: string;
  /** Optional CMS-only fields. Absent on the hardcoded fallback entries. */
  level?: string | null;
  /** When set, links to /programs/<slug> instead of the programme index. */
  slug?: string | null;
};

export const FYUGP = "FYUGP";

export const programmes: Programme[] = [
  {
    name: "B.Com (Hons) Computer Application",
    shortName: "B.Com (Hons) Computer Application",
    image: img("photo-1554224155-6726b3ff858f", 900),
    about:
      "Commerce and computer application together: accounting, finance, business law and taxation alongside programming, databases and computerised accounting practicals.",
    duration: "3 years",
    scheme: FYUGP,
    department: "Commerce",
  },
  {
    name: "B.Com (Hons) Co-operation",
    shortName: "B.Com (Hons) Co-operation",
    image: img("photo-1521791136064-7986c2920216", 900),
    about:
      "The honours commerce syllabus with the co-operation stream, adding fieldwork, industrial exposure and project work to the theory papers.",
    duration: "3 years",
    scheme: FYUGP,
    department: "Commerce",
  },
  {
    name: "BBA Finance",
    shortName: "BBA Finance",
    image: img("photo-1579621970563-ebec7560ff3e", 900),
    about:
      "Management principles with a specialisation in financial management, accounting and investment, taught with case-based learning.",
    duration: "3 years",
    scheme: FYUGP,
    department: "Commerce",
  },
  {
    name: "BA English",
    shortName: "BA English",
    image: img("photo-1455390582262-044cdead277a", 900),
    about:
      "Literature, grammar and communication skills that support teaching, media and further study beyond the college.",
    duration: "3 years",
    scheme: FYUGP,
    department: "English",
  },
];
