import { assignVariants, buildPage, img, type PageDraft } from "@/content/innerPageData";
import type { InnerPageData } from "@/components/InnerPage";

const drafts: Record<string, PageDraft> = {
  "student-portal": {
    title: "Student Portal",
    heroImage: img("photo-1497366754035-f200968a6e72"),
    heroLead: "One place for attendance, results, certificates and college communication.",
    kicker: "Student zone",
    heading: "Your college, in one place.",
    lead: "The student zone collects everything a student needs during the academic year: attendance, internal marks, examination information, notices, forms and downloads.",
    points: [
      {
        title: "Records you can check",
        text: "Attendance, internal assessment status and examination information are published for each student.",
      },
      {
        title: "Forms and downloads",
        text: "Application forms, scholarship forms, certificate requests and academic documents are available to download.",
      },
      {
        title: "Notices with dates",
        text: "Every notice states the deadline and the action required, so a student is never guessing what to do next.",
      },
    ],
    highlights: {
      kicker: "What students use it for",
      title: "The three most visited sections",
      items: [
        {
          title: "Attendance and internal marks",
          text: "Check the current standing before the assessment window closes, not after.",
        },
        {
          title: "Examination information",
          text: "Timetable, hall ticket instructions and result-related communication in one place.",
        },
        {
          title: "Downloads and forms",
          text: "Bursars, applications and certificates requested through the office, downloadable directly.",
        },
      ],
    },
  },

  examination: {
    title: "Examination",
    heroImage: img("photo-1524178232363-1fb2b075b655"),
    heroLead: "Internal assessment, University examinations, hall tickets and revaluation.",
    kicker: "Examinations",
    heading: "How assessment and examination actually work.",
    lead: "Assessment has two parts: internal assessment carried out by the college through the term, and the University of Calicut examination at the end. Both carry marks in the final result, so both deserve equal attention.",
    points: [
      {
        title: "Internal assessment",
        text: "Class tests, seminars, assignment work and laboratory records contribute to the internal mark, assessed continuously.",
      },
      {
        title: "University examinations",
        text: "Theory and practical papers are set, conducted and evaluated by the University as per its schedule.",
      },
      {
        title: "Hall tickets",
        text: "Hall ticket details are communicated through the college in advance of the University examination, along with instructions for the reporting time.",
      },
    ],
    highlights: {
      kicker: "Prepare properly",
      title: "Three habits that improve results",
      items: [
        {
          title: "Answer questions, not just study notes",
          text: "Attempting questions in the exam is itself a skill. Practise full-length papers in the weeks before the examination.",
        },
        {
          title: "Finish internal work on time",
          text: "Internal assessment is easy to lose marks on. Submitting assignments and laboratory records as they are due protects those marks.",
        },
        {
          title: "Use the revaluation route correctly",
          text: "Revaluation and supplementary examination follow University deadlines. Track them rather than assuming you have time.",
        },
      ],
    },
  },

  results: {
    title: "Results",
    heroImage: img("photo-1454165804606-c3d57bc86b40"),
    heroLead: "Internal results, University results, revaluation and provisional certificates.",
    kicker: "Results",
    heading: "Results you can see, understand and act on.",
    lead: "Internal assessment results are published through the department during the term, so corrections can be made before the final evaluation. University results are declared by the University and communicated through the college.",
    points: [
      {
        title: "Internal results first",
        text: "Departmental internal results are shared early, giving students time to act on weak areas.",
      },
      {
        title: "University results",
        text: "Final results are declared by the University of Calicut and notified through the college along with the marks statement.",
      },
      {
        title: "Provisional certificates",
        text: "Provisional and consolidated certificates are issued through the college office after result declaration.",
      },
    ],
    highlights: {
      kicker: "Next steps",
      title: "What to do once results are out",
      items: [
        {
          title: "Check the marks statement carefully",
          text: "Verify the marks and credits against the University marks statement and report any discrepancy at the office immediately.",
        },
        {
          title: "Revaluation, if it is worth it",
          text: "Revaluation is possible for eligible papers within the University window, with fees as prescribed. Take advice before applying.",
        },
        {
          title: "Plan the next stage",
          text: "Certificate applications, higher study applications and competitive examinations often need the marks statement early. Collect it from the office.",
        },
      ],
    },
  },

  attendance: {
    title: "Attendance",
    heroImage: img("photo-1543269865-cbf427effbad"),
    heroLead: "How attendance is recorded, why it matters and how to recover a shortfall.",
    kicker: "Attendance",
    heading: "Attendance is a condition, not a formality.",
    lead: "Attendance is recorded for every teaching hour and carries consequences in the internal assessment and in eligibility for University examinations. Students can check their standing at any time through the department.",
    points: [
      {
        title: "Recorded every hour",
        text: "Attendance is marked for each period and practical session, and shared with students through the department.",
      },
      {
        title: "It affects eligibility",
        text: "University of Calicut norms require prescribed attendance for a student to be eligible to write the examination.",
      },
      {
        title: "Medical and genuine reasons",
        text: "Genuine absence must be reported and supported, and the record corrected as early as possible.",
      },
    ],
    highlights: {
      kicker: "Keep on track",
      title: "Practical advice for students",
      items: [
        {
          title: "Watch the percentage, not the feeling",
          text: "Two weeks of missed classes can drop a semester below requirement. Check your standing monthly.",
        },
        {
          title: "Report absence the same day",
          text: "Reporting absence early, with a reason, is far easier to correct than a month-old gap.",
        },
        {
          title: "Prioritise core subjects",
          text: "When clashes occur, attendance matters most in papers with continuous internal assessment and practical work.",
        },
      ],
    },
  },

  "academic-calendar": {
    title: "Academic Calendar",
    heroImage: img("photo-1506784983877-45594efa4cbe"),
    heroLead: "The student view of the academic year — dates, deadlines and events.",
    kicker: "Calendar",
    heading: "Your year, with every important date marked.",
    lead: "The student calendar lists working days, internal assessment windows, practical examinations, University examination dates, cultural events and last working days. It is circulated at the start of the year and updated when University dates are announced.",
    points: [
      {
        title: "All key dates in one page",
        text: "Internal tests, practicals, University examinations and college events appear together so nothing is missed.",
      },
      {
        title: "Published at term start",
        text: "The calendar is issued with the handbook and posted in the student zone, so planning starts before the term does.",
      },
      {
        title: "Updated for University changes",
        text: "When the University revises dates, the college updates the calendar and issues a notice.",
      },
    ],
    highlights: {
      kicker: "Using the calendar",
      title: "Turn dates into a plan",
      items: [
        {
          title: "Internal assessments",
          text: "Class tests, seminars and assignment submissions with fixed dates, so revision can be planned in the weeks before.",
        },
        {
          title: "University examinations",
          text: "Theory and practical examination windows, with hall and reporting information communicated in advance.",
        },
        {
          title: "College events",
          text: "Cultural programme, sports meets, club activities and orientation days, so club and batch planning can happen early.",
        },
      ],
    },
  },

  notices: {
    title: "Notices",
    heroImage: img("photo-1568992687947-868a62a9f521"),
    heroLead: "Official college notices, with the date and the action required.",
    kicker: "Notices",
    heading: "Every notice states what to do, and by when.",
    lead: "Notices cover examinations, attendance, fees, events, scholarships and administrative instructions. Each notice carries an issue date, a deadline where applicable, and the office or section where the action must be completed.",
    points: [
      {
        title: "Categorised by department",
        text: "Academic, examination, administrative and event notices are grouped so the relevant notice is easy to find.",
      },
      {
        title: "Deadlines stated",
        text: "Where an action is required, the notice states the last date. Anything without a stated deadline is informational.",
      },
      {
        title: "Acknowledgement matters",
        text: "Actions that require a signature — fee payment, seat acceptance, form submission — must be acknowledged through the office.",
      },
    ],
    highlights: {
      kicker: "Notice types",
      title: "What you will find here",
      items: [
        {
          title: "Examination notices",
          text: "Internal and University examination schedules, hall tickets, question paper patterns and result publication dates.",
        },
        {
          title: "Attendance notices",
          text: "Shortage warnings, condonation requests and the dates on which attendance regularization must be completed.",
        },
        {
          title: "Fee and administrative notices",
          text: "Instalment dates, receipt requirements, scholarship sanctions and office timings during the term.",
        },
        {
          title: "Event notices",
          text: "Club activities, cultural programmes, sports meets and department events, with reporting times.",
        },
      ],
    },
  },

  downloads: {
    title: "Downloads",
    heroImage: img("photo-1553877522-43269d4ea984"),
    heroLead: "Forms, academic documents and templates available to students.",
    kicker: "Downloads",
    heading: "The forms you need, ready to fill.",
    lead: "Academic documents, application forms and templates published by the college are listed here. Documents that need a signature or seal must still be submitted at the office.",
    points: [
      {
        title: "Academic documents",
        text: "Syllabus extracts, time tables, internal assessment formats and project guidelines for each programme.",
      },
      {
        title: "Forms",
        text: "Scholarship forms, certificate requests, bonafide applications and leave applications in printable form.",
      },
      {
        title: "Templates",
        text: "Project and seminar formats that match what faculty expect, so submissions look right the first time.",
      },
    ],
    highlights: {
      kicker: "Available documents",
      title: "Download and print",
      items: [
        {
          title: "Application and scholarship forms",
          text: "Admission forms, scholarship applications and certificate requests in printable format.",
        },
        {
          title: "Academic documents",
          text: "Syllabus extracts, time tables and internal assessment formats for each programme.",
        },
        {
          title: "Project and seminar templates",
          text: "Report formats, presentation templates and submission guidelines for final-year work.",
        },
        {
          title: "Leave and certificate applications",
          text: "Onward leave, medical leave and bonafide certificate applications for the office.",
        },
      ],
    },
  },

  "student-activities": {
    title: "Student Activities",
    heroImage: img("photo-1517457373958-b7bdd4587205"),
    heroLead: "Clubs, cultural events, sports and community work outside the timetable.",
    kicker: "Beyond classes",
    heading: "The part of college that happens outside the classroom.",
    lead: "College life is not only lectures and examinations. Clubs, cultural programmes, sports, student council activity and community work shape how the batch spends its time and what it remembers.",
    points: [
      {
        title: "Clubs and societies",
        text: "Departments run clubs for literature, computing, commerce and management, with student-led activity throughout the year.",
      },
      {
        title: "Cultural and sports events",
        text: "Annual cultural programmes and inter-department sports meet run on a fixed calendar published each year.",
      },
      {
        title: "Community engagement",
        text: "Students take part in awareness drives, tutoring support and campus clean-up drives organised with the local community.",
      },
    ],
    highlights: {
      kicker: "Get involved",
      title: "Where students take part",
      items: [
        {
          title: "Department clubs",
          text: "Literature, computing, commerce and management clubs with student-led activity through the year.",
        },
        {
          title: "Cultural programme",
          text: "Annual cultural events organised by students with faculty support, from rehearsals to finals.",
        },
        {
          title: "Sports and games",
          text: "Inter-department sports meet and college teams in football, volleyball, badminton and athletics.",
        },
        {
          title: "NSS and community work",
          text: "Awareness drives, tutoring support and campus clean-up with the local community.",
        },
      ],
    },
  },
};

const built = Object.fromEntries(
  Object.entries(drafts).map(([slug, draft]) => [
    slug,
    buildPage("Student Zone", draft),
  ]),
);

export const studentZonePages: Record<string, InnerPageData> = assignVariants(built, 2);
