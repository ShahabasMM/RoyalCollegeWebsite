import { img } from "@/content/innerPageData";

export const OFFICE_BEARER_PENDING = "To be announced";

export type OfficeBearer = {
  role: string;
  name: string;
  note?: string;
};

export type ClubTone = "arts" | "women" | "service" | "placement";

export type ClubBody = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  about: string;
  image: string;
  imageAlt: string;
  tone: ClubTone;
  holders: OfficeBearer[];
};

export const clubRoles = [
  "Chairman",
  "Vice Chairman",
  "Secretary",
  "Vice Secretary",
] as const;

const pendingHolders = (): OfficeBearer[] =>
  clubRoles.map((role) => ({ role, name: OFFICE_BEARER_PENDING }));

export const clubsTitle = "Clubs & Activities";

export const clubsHero = img("photo-1546519638-68e109498ffc", 2000);

export const clubsHeroLead =
  "Department clubs, cultural programmes, sports and community work.";

export const clubsBodies: ClubBody[] = [
  {
    slug: "arts-and-sports",
    name: "Arts and Sports",
    shortName: "Arts & Sports",
    tagline: "Stage, field and everything between.",
    about:
      "Runs the annual cultural programme and the inter-department sports meet, with rehearsals, group performances and practice sessions organised across the year.",
    image: img("photo-1517457373958-b7bdd4587205", 1200),
    imageAlt: "Students taking part in a college activity",
    tone: "arts",
    holders: pendingHolders(),
  },
  {
    slug: "women-cell",
    name: "Women Cell",
    shortName: "Women Cell",
    tagline: "A forum open to every student.",
    about:
      "An inclusive forum for students across every department, bringing together peer support, awareness sessions and mentoring under faculty guidance.",
    image: img("photo-1523240795612-9a054b0db644", 1200),
    imageAlt: "Students together on the college campus",
    tone: "women",
    holders: pendingHolders(),
  },
  {
    slug: "social-service-activities",
    name: "Social Service Activities",
    shortName: "Social Service",
    tagline: "Work that reaches past the gate.",
    about:
      "Plans community work alongside the academic programme, with volunteers taking part in awareness drives, tutoring support and campus clean-up.",
    image: img("photo-1521737711867-e3b97375f902", 1200),
    imageAlt: "Volunteers working together as a team",
    tone: "service",
    holders: pendingHolders(),
  },
  {
    slug: "placement-cell",
    name: "Placement Cell",
    shortName: "Placement",
    tagline: "Recruitment, aptitude and interview prep.",
    about:
      "Coordinates recruitment drives and campus placements, and runs aptitude practice, interview guidance and preparation sessions for students of every department.",
    image: img("photo-1521791136064-7986c2920216", 1200),
    imageAlt: "Workplace meeting and professional discussion",
    tone: "placement",
    holders: pendingHolders(),
  },
];

export const clubsDepartmentNote = {
  kicker: "Department clubs",
  title: "A club for every department",
  text: "Literature, computing, commerce and management clubs each run under faculty guidance, and they come together for the cultural programme, the sports meet and community work.",
};

export const clubsClosing =
  "Every body on this page is student-led. If you want to join one, speak to the current office-bearers or the department faculty adviser.";
