import { assignVariants, buildPage, img, type PageDraft } from "@/content/innerPageData";
import type { InnerPageData } from "@/components/InnerPage";

const drafts: Record<string, PageDraft> = {

  nss: {
    title: "NSS",
    heroImage: img("photo-1521737711867-e3b97375f902"),
    heroLead:
      "The National Service Scheme unit, and the community work that runs alongside the syllabus.",
    kicker: "NSS",
    heading: "Service that counts for more than attendance.",
    lead: "The NSS unit is the college's community service arm. Volunteers work alongside the academic programme on awareness drives, tutoring support and campus clean-up, in partnership with the local community.",
    points: [
      {
        title: "Awareness drives",
        text: "Health, safety and civic awareness sessions run both on campus and with the local community.",
      },
      {
        title: "Tutoring support",
        text: "Students support younger school students with study help, reading practice and preparation for examinations.",
      },
      {
        title: "Campus clean-up",
        text: "Regular clean-up drives keep campus and the surrounding area tidy, run by volunteers under faculty supervision.",
      },
    ],
    highlights: {
      kicker: "Getting involved",
      title: "How students take part",
      items: [
        {
          title: "Open to every student",
          text: "Any student can volunteer, whether or not service is part of their programme structure.",
        },
        {
          title: "Planned and supervised",
          text: "Every activity is planned and supervised by faculty, with a programme officer coordinating the unit.",
        },
        {
          title: "Alongside study",
          text: "Service is recorded as an activity alongside academic work rather than as a replacement for it.",
        },
      ],
    },
  },

};

const built = Object.fromEntries(
  Object.entries(drafts).map(([slug, draft]) => [
    slug,
    buildPage("Campus", draft),
  ]),
);

export const campusPages: Record<string, InnerPageData> = assignVariants(built, 4);
