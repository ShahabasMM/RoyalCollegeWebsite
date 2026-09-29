import { assignVariants, buildPage, img, type PageDraft } from "@/content/innerPageData";
import type { InnerPageData } from "@/components/InnerPage";

const drafts: Record<string, PageDraft> = {
  "academic-overview": {
    title: "Academic Overview",
    heroImage: img("photo-1523240795612-9a054b0db644"),
    heroLead:
      "How teaching, assessment and progression work across every undergraduate programme.",
    kicker: "Academics",
    variant: "hero",
    body: [
      "Royal College of Arts & Science is committed to providing students with a quality higher education that combines academic knowledge, practical skills, technology, and values.",
      "Affiliated with the University of Calicut, the college offers an academic environment that encourages students to learn, explore their interests, and prepare for their future careers and higher studies.",
    ],
    highlights: {
      kicker: "Our academic approach",
      title: "Our academic approach focuses on:",
      items: [
        {
          title: "Quality Education",
          text: "Strong academic foundations and effective learning.",
        },
        {
          title: "Skill Development",
          text: "Practical and industry-relevant skills for the modern world.",
        },
        {
          title: "Technology & Innovation",
          text: "Encouraging students to understand and use emerging technologies.",
        },
        {
          title: "Value-Based Learning",
          text: "Developing responsible, confident, and socially conscious individuals.",
        },
        {
          title: "Student Development",
          text: "Supporting students in achieving their academic and personal goals.",
        },
      ],
    },
    closing:
      "At Royal College, we believe that education is not only about earning a qualification, but also about developing the knowledge, skills, confidence, and values needed to build a meaningful future.",
  },

  "learning-outcomes": {
    title: "Learning Outcomes",
    heroImage: img("photo-1503676260728-1c00da094a0b"),
    heroLead: "What a Royal College graduate is expected to be able to do by the time they finish.",
    kicker: "Outcomes",
    heading: "What you should be able to do after three years.",
    lead: "Programme outcomes are written for every paper and reviewed each year. They describe the competence a graduate carries forward — in their subject, in communication, and in working with others.",
    points: [
      {
        title: "Subject competence",
        text: "Core concepts of the discipline explained and applied to unfamiliar problems, not only recalled.",
      },
      {
        title: "Practical and analytical skill",
        text: "Use of tools, data and laboratory methods relevant to the programme, with sound reasoning.",
      },
      {
        title: "Communication",
        text: "Written and spoken communication that is clear, structured and appropriate to audience.",
      },
    ],
    highlights: {
      kicker: "Beyond the syllabus",
      title: "Transferable skills we work on",
      items: [
        {
          title: "Self-directed learning",
          text: "Students plan their own revision and research, then reflect on what worked — the habit that carries into employment.",
        },
        {
          title: "Working in teams",
          text: "Group projects and presentations make collaboration and shared deadlines part of college life.",
        },
        {
          title: "Ethics and responsibility",
          text: "Academic honesty, respect for others in the classroom, and responsibility for one's own progress.",
        },
      ],
    },
  },

  syllabus: {
    title: "Syllabus",
    heroImage: img("photo-1456513080510-7bf3a84b82f8"),
    heroLead: "Course structure, paper lists and unit-wise syllabi for every programme.",
    kicker: "Curriculum",
    heading: "One syllabus, clearly published.",
    lead: "The college follows the University of Calicut curriculum without local modification of core papers. Department-wise copies of the syllabus are available to students, printed in the handbook and shared through the student zone.",
    points: [
      {
        title: "University of Calicut papers",
        text: "Core papers, elective papers and practical papers are exactly as prescribed by the University.",
      },
      {
        title: "Unit-wise detail",
        text: "Each paper is broken into units with reference material, so students can plan revision systematically.",
      },
      {
        title: "Handbook & student zone",
        text: "The printed handbook carries the full structure; the student zone carries the same documents in downloadable form.",
      },
    ],
    highlights: {
      kicker: "Structure",
      title: "What a typical programme contains",
      items: [
        {
          title: "Core papers",
          text: "The compulsory subjects that give the programme its academic identity and examination weight.",
        },
        {
          title: "Practical papers",
          text: "Laboratory, project and fieldwork components that carry internal assessment and practical marks.",
        },
        {
          title: "Electives & enhancements",
          text: "Elective choices and add-on certificate courses that widen a student's subject range.",
        },
      ],
    },
  },

  "academic-calendar": {
    title: "Academic Calendar",
    heroImage: img("photo-1506784983877-45594efa4cbe"),
    heroLead: "Term dates, internal assessment windows and University examination dates.",
    pdfs: [
      {
        label: "2026-27",
        title: "Academic Calendar 2026-27",
        text: "Official calendar notification with working days, internal assessment and examination dates.",
        meta: "9 pages \u00b7 PDF",
        url: "https://docs.uoc.ac.in/website/news/2026-07-17%2012:04:10_new2324.pdf",
        image: "/images/academic-calendar-2026-27.jpg",
        imageAlt: "First page of the Academic Calendar 2026-27 notification",
      },
      {
        label: "2025-26",
        title: "Academic Calendar 2025-26",
        text: "Previous year's calendar notification with working days, internal assessment and examination dates.",
        meta: "9 pages \u00b7 PDF",
        url: "https://docs.uoc.ac.in/website/news/2025-12-29%2011:23:48_new2217.pdf",
        image: "/images/academic-calendar-2025-26.jpg",
        imageAlt: "First page of the Academic Calendar 2025-26 notification",
      },
    ],
    kicker: "Calendar",
    heading: "The year, published before it starts.",
    lead: "The academic calendar is circulated at the start of the year and includes working days, internal assessment dates, practical examinations and University examination dates. Nothing in the calendar is announced late.",
  },

  "time-table": {
    title: "Time Table",
    heroImage: img("photo-1501139083538-0139583c060f"),
    heroLead: "The weekly class schedule for each batch, including laboratory and tutorial slots.",
    kicker: "Schedule",
    heading: "A week that balances lectures, practicals and study.",
    lead: "Each batch follows a published weekly time table: theory periods, laboratory blocks in fixed slots, tutorial periods and library hours. Changes are notified in writing before the affected class.",
    points: [
      {
        title: "Fixed laboratory slots",
        text: "Laboratory periods are scheduled at the same time each week so equipment and faculty are always available.",
      },
      {
        title: "Tutorial periods",
        text: "Short tutorial slots are built into the week for doubt-clearing instead of extra hours at the end of the day.",
      },
      {
        title: "Change notices",
        text: "Any change to the time table is notified by the department with the reason and the new slot.",
      },
    ],
    highlights: {
      kicker: "Using the week",
      title: "Habits that make the schedule work",
      items: [
        {
          title: "Keep laboratory notes current",
          text: "Lab work is graded through the term, not only at the end. Updating records after each session removes end-term pressure.",
        },
        {
          title: "Use tutorial slots",
          text: "Bring your doubts to the tutorial period. It is the fastest way to fix a misunderstanding before it spreads.",
        },
        {
          title: "Protect revision hours",
          text: "Mark two hours a week for revision of the previous unit. Small, regular blocks are more reliable than weekend cramming.",
        },
      ],
    },
  },
};

const built = Object.fromEntries(
  Object.entries(drafts).map(([slug, draft]) => [
    slug,
    buildPage("Academics", draft),
  ]),
);

export const academicsPages: Record<string, InnerPageData> = assignVariants(built, 3);
