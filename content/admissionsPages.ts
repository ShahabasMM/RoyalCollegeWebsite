import { assignVariants, buildPage, img, type PageDraft } from "@/content/innerPageData";
import type { InnerPageData } from "@/components/InnerPage";

const drafts: Record<string, PageDraft> = {
  "admission-overview": {
    title: "Admission Overview",
    heroImage: img("photo-1592280771190-3e2e4d571952"),
    heroLead:
      "How admissions work at Royal College — from the announcement to the first day of class.",
    kicker: "Admissions 2026–27",
    heading: "A clear path from application to admission.",
    lead: "Admissions are conducted as per University of Calicut guidelines. Students apply once, submit the required documents, and receive confirmation once the merit list and seat allocation are published.",
    points: [
      {
        title: "University of Calicut process",
        text: "Admission, allotment and seat acceptance follow the University schedule, so dates are fixed and published centrally.",
      },
      {
        title: "One online application",
        text: "The application form is completed online, with documents uploaded for verification by the college office.",
      },
      {
        title: "Help when it is needed",
        text: "The admissions team helps with eligibility, documentation and seat acceptance, in person or on the phone.",
      },
    ],
    highlights: {
      kicker: "What happens next",
      title: "The four steps after you apply",
      items: [
        {
          title: "Application submitted",
          text: "You receive an acknowledgement with your application reference. Keep it for all future correspondence.",
        },
        {
          title: "Document verification",
          text: "The college office verifies certificates and community details as per University requirements.",
        },
        {
          title: "Merit list and seat allotment",
          text: "Merit ranking and seat allotment follow University norms, with a waiting list maintained in order.",
        },
      ],
    },
  },

  eligibility: {
    title: "Eligibility",
    heroImage: img("photo-1450101499163-c8848c66ca85"),
    heroLead: "Minimum qualifications for each undergraduate programme, as per University of Calicut norms.",
    kicker: "Eligibility",
    heading: "Check the requirement before you apply.",
    lead: "Eligibility follows the University of Calicut framework for each programme. The college verifies certificates at the time of admission, so it is worth checking your marks and certificates against the requirement before submitting the form.",
    points: [
      {
        title: "Minimum marks",
        text: "Each programme specifies a minimum pass mark in the qualifying examination. Reserve category relaxations apply as per University rules.",
      },
      {
        title: "Required subjects",
        text: "Some programmes require specific subjects at Plus Two level. These requirements are published in the University prospectus.",
      },
      {
        title: "Certificates to bring",
        text: "Keep mark sheets, transfer and migration certificates, community or income certificates, and identification ready for verification.",
      },
    ],
    highlights: {
      kicker: "Documents",
      title: "What to keep ready",
      items: [
        {
          title: "Academic records",
          text: "Plus Two mark sheet and transfer certificate, plus diploma marks sheet and certificate for diploma holders.",
        },
        {
          title: "Identity and address proof",
          text: "Aadhaar or other accepted identification, and address proof for verification at admission.",
        },
        {
          title: "Category certificates, if applicable",
          text: "Community, economically weaker section or disability certificates must be produced by the claiming applicant.",
        },
      ],
    },
  },

  "application-process": {
    title: "Application Process",
    heroImage: img("photo-1454165804606-c3d57bc86b40"),
    heroLead: "The exact sequence of steps, from the online form to joining the campus.",
    kicker: "Process",
    heading: "Five steps, no ambiguity.",
    lead: "The application process is deliberately simple. Keep your documents ready, complete the online form carefully, and the college will handle verification and communication from there.",
    points: [
      {
        title: "Step 1 — Fill the form",
        text: "Enter personal, academic and contact details exactly as they appear on your certificates.",
      },
      {
        title: "Step 2 — Upload documents",
        text: "Attach clear scans or photographs of the required certificates and identification.",
      },
      {
        title: "Step 3 — Submit and note the reference",
        text: "Submit the form and save the acknowledgement. Every later query should quote this reference number.",
      },
    ],
    highlights: {
      kicker: "After you submit",
      title: "What the college does next",
      items: [
        {
          title: "Application verification",
          text: "The office checks the form against the University prospectus requirements and verifies uploaded documents.",
        },
        {
          title: "Merit list publication",
          text: "Merit ranking is prepared and published as per University norms, with reservations applied.",
        },
        {
          title: "Seat acceptance",
          text: "Selected candidates complete seat acceptance and fee payment within the University deadline to confirm the seat.",
        },
      ],
    },
  },

  "fee-structure": {
    title: "Fee Structure",
    heroImage: img("photo-1554224155-6726b3ff858f"),
    heroLead: "Published, itemised fees for each programme — and what they cover.",
    kicker: "Fees",
    heading: "Fees that are published before admission.",
    lead: "The college publishes the fee structure for every programme, along with University and government components. Fees are collected in instalments as per the University schedule, with receipts issued for every payment.",
    points: [
      {
        title: "Published in advance",
        text: "The itemised structure is displayed at the office and shared with applicants, so there are no surprises on admission day.",
      },
      {
        title: "University components included",
        text: "University registration, examination and other statutory components are shown separately from the college fee.",
      },
      {
        title: "Instalments as per schedule",
        text: "Payment is collected in instalments following the University calendar, with a receipt for each instalment.",
      },
    ],
    highlights: {
      kicker: "Transparency",
      title: "What the fee covers",
      items: [
        {
          title: "Tuition and academic costs",
          text: "Teaching, internal assessment, laboratory and library costs that support the programme itself.",
        },
        {
          title: "Campus facilities",
          text: "Use of the library, laboratories, activity rooms, sports facilities and campus services.",
        },
        {
          title: "Examination and registration",
          text: "University registration, examination fees and related statutory components as prescribed.",
        },
      ],
    },
  },

  "apply-online": {
    title: "Apply Online",
    heroImage: img("photo-1487014679447-9f8336841d58"),
    heroLead: "Submit your application to the college in one online form.",
    kicker: "Apply",
    heading: "One form. One acknowledgement. One reference number.",
    lead: "Applications are submitted online. Have your certificates and identification ready, complete the form accurately, and keep the acknowledgement number — it is the reference for every communication with the college.",
    points: [
      {
        title: "Keep documents ready",
        text: "Mark sheets, transfer certificate, community or income certificate, and identification should be ready to upload.",
      },
      {
        title: "Check the form before submitting",
        text: "Names, dates and numbers must match your certificates exactly. Corrections after submission go through the office.",
      },
      {
        title: "Save the acknowledgement",
        text: "The acknowledgement carries your application reference. Quote it in emails, calls and office visits.",
      },
    ],
    highlights: {
      kicker: "Before you submit",
      title: "Three things worth checking twice",
      items: [
        {
          title: "Name and date of birth",
          text: "Spellings must match your certificates exactly. A mismatch is the most common reason a form needs correction.",
        },
        {
          title: "Reachability of your contact details",
          text: "Merit lists and seat offers are communicated to the number or email you enter. Use one you actually check.",
        },
        {
          title: "Document legibility",
          text: "Clear, full-page photographs of each certificate. Cropped or blurred scans slow down verification by days.",
        },
      ],
    },
  },

  "admission-notifications": {
    title: "Admission Notifications",
    heroImage: img("photo-1568992687947-868a62a9f521"),
    heroLead: "Published notices on merit lists, seat allotment, fee deadlines and campus orientation.",
    kicker: "Notifications",
    heading: "Every admission deadline, in one place.",
    lead: "Admission notifications are published on the college notice board, the official notice section of this website, and the student zone. Each notice states the date, the action required and where to act.",
    points: [
      {
        title: "Notices state the action",
        text: "Every notice names the deadline, the document needed and the office or portal where the action must be completed.",
      },
      {
        title: "Published in more than one place",
        text: "Notices appear on the campus board, the college website and the student zone, so nothing depends on seeing a single board.",
      },
      {
        title: "Contact for clarification",
        text: "If a notice is unclear, the admissions office will confirm the requirement before the deadline, not after it.",
      },
    ],
    highlights: {
      kicker: "Notifications",
      title: "What gets published",
      items: [
        {
          title: "Merit list announcements",
          text: "Programme-wise merit lists with the date of publication and the window for querying a discrepancy.",
        },
        {
          title: "Seat allotment",
          text: "Allotment orders, confirmation deadlines and the documents to be submitted with the joining letter.",
        },
        {
          title: "Fee deadlines",
          text: "Instalment dates and the consequences of missing them, stated before the deadline rather than after.",
        },
        {
          title: "Campus orientation",
          text: "Orientation and induction dates for each new batch, with the reporting time and documents to bring.",
        },
      ],
    },
  },
};

const built = Object.fromEntries(
  Object.entries(drafts).map(([slug, draft]) => [
    slug,
    buildPage("Admissions", draft),
  ]),
);

export const admissionsPages: Record<string, InnerPageData> = assignVariants(built, 1);
