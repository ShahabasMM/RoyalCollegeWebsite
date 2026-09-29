import { assignVariants, buildPage, img, type PageDraft } from "@/content/innerPageData";
import type { InnerPageData } from "@/components/InnerPage";

const drafts: Record<string, PageDraft> = {
  "about-college": {
    title: "About College",
    heroImage: img("photo-1562774053-701939374585"),
    heroLead:
      "A higher education institution in Trithala, Palakkad, affiliated to the University of Calicut.",
    kicker: "Who we are",
    body: [
      "Royal College of Arts & Science is a higher education institution located in Trithala, Pattambi Taluk, Palakkad District, Kerala. Situated along the banks of the Bharathapuzha River, the college provides a peaceful and supportive environment for learning and personal development.",
      "The college is managed by Al Noor Educational and Charitable Trust and is affiliated with the University of Calicut. The Royal College campus is conveniently located approximately 1 kilometre from Trithala town, making it accessible to students from Trithala and the surrounding rural areas.",
    ],
  },

  "principals-message": {
    title: "Principal's Message",
    heroImage: img("photo-1573496359142-b8d87734a5a2"),
    heroLead: "A note from the Principal on the habits, support and expectations that define college life.",
    kicker: "Message",
    person: {
      name: "Mrs. Geetharani P.K.",
      role: "Principal",
      image: "/images/principal.jpg",
      imageAlt: "Mrs. Geetharani P.K., Principal of Royal College of Arts and Science",
      width: 1200,
      height: 793,
    },
    quote: true,
    body: [
      "Education has become the need of the hour in the present day scenario. Education makes a person capable of interpreting things. It is not just about lessons in textbooks, but it is about the lessons for life. I wish I can do this job as a noble service of providing quality education for all, and to ensure that no student is left behind. We need to change the world for good.",
      "The role of a teacher in a student's life is very vital. Teachers are best known for the role of educating the students placed in their care. They are responsible to set the tone of their classrooms, build a warm environment, mentor and nurture students, become role models, and listen and look for signs of trouble. The student becomes responsible when he or she takes an active role in their learning, by recognising they are accountable for their academic success.",
    ]
  },

  "chairman-message": {
    title: "Chairman Message",
    heroImage: img("photo-1560250097-0b93528c311a"),
    heroLead: "The chairman on building an institution that students, families and employers can count on.",
    kicker: "Message",
    person: {
      name: "Mr. Ashraf Ali M.M.",
      role: "Chairman",
      image: "/images/chairman.jpg",
      imageAlt: "Mr. Ashraf Ali M.M., Chairman of Royal College of Arts and Science",
      width: 1200,
      height: 732,
    },
    quote: true,
    body: [
      "Royal College of Arts and Science steps into the 10th year of its excellence. I do realise that I still have quite a few dreams to be fulfilled and quite a few promises to keep. In our relentless pursuit of quality and excellence, I am proud to point out that we have done quite a lot of hard work.",
      "I should admit it was a tough call, but it was a step in the right direction, as it would definitely improve our quality through a cultured and streamlined format. The management was able to identify the areas that needed improvement and how they could be addressed. We have an energetic team of well experienced and dedicated teachers who work for the upliftment of quality in the teaching, to mould students into socially committed, better human beings.",
    ]
  },

  "vision-mission": {
    title: "Vision & Mission",
    heroImage: img("photo-1503676260728-1c00da094a0b"),
    heroLead: "The long-term ambition and the daily work that make it real.",
    kicker: "Our purpose",
    sections: [
      {
        heading: "Our Vision",
        paragraphs: [
          "Royal College of Arts & Science is committed to providing quality and accessible higher education, particularly for students from rural communities. The college aims to create an environment where students can develop academic knowledge, practical skills, confidence, and values that prepare them for higher studies, employment, and responsible citizenship.",
        ],
      },
      {
        heading: "Our Mission",
        paragraphs: [
          "Our mission is to empower students through:",
        ],
        list: [
          "Quality and accessible higher education",
          "Knowledge and skills relevant to modern technology",
          "Practical learning and academic development",
          "Value-based education and responsible citizenship",
          "An inclusive and supportive learning environment",
          "Opportunities for students to discover and develop their potential",
        ],
      },
      {
        heading: "Education with Purpose",
        paragraphs: [
          "At Royal College, education goes beyond academic qualifications. We believe that students should be equipped with the knowledge, skills, values, and confidence needed to face a changing world.",
          "With a focus on modern education and technology alongside strong human values, the college seeks to help students become capable professionals and responsible citizens of India.",
        ],
      },
      {
        heading: "A Place for Rural Students to Grow",
        paragraphs: [
          "Located in the rural surroundings of Trithala, Royal College has a particular commitment to making quality higher education accessible to students from nearby communities.",
          "The college strives to provide students with opportunities to learn, explore their interests, develop practical skills, and build a strong foundation for their future.",
        ],
      },
      {
        heading: "Our Commitment",
        paragraphs: [
          "Royal College of Arts & Science continues to work towards creating a learning community where education, technology, skills, and values come together.",
          "Through its academic environment and student-focused approach, the college aims to contribute to the educational and social development of the region while preparing students to participate meaningfully in a rapidly changing world.",
        ],
      },
    ],
  },

  management: {
    title: "Management",
    heroImage: img("photo-1521737711867-e3b97375f902"),
    heroLead: "Who runs the college day to day, and how responsibilities are shared.",
    kicker: "Leadership",
    heading: "A small management team with clear responsibilities.",
    lead: "The Principal leads academics, the office handles admissions and records, and coordinators oversee programmes, discipline and student support. Everyone reports to the governing body.",
    points: [
      {
        title: "Principal",
        text: "Academic leadership, faculty coordination, discipline and the continuous improvement of teaching quality.",
      },
      {
        title: "Office & admissions",
        text: "Applications, fee records, certificates, examinations and communication with students and parents.",
      },
      {
        title: "Programme coordinators",
        text: "Day-to-day academic planning, laboratory schedules, internal assessments and project supervision.",
      },
    ],
    highlights: {
      kicker: "How we work",
      title: "Three habits inside the management team",
      items: [
        {
          title: "Written, not verbal",
          text: "Notices, decisions and academic schedules are circulated in writing so nothing depends on rumour.",
        },
        {
          title: "Student-facing hours",
          text: "Fixed office hours each working day so students and parents know exactly when to reach the college.",
        },
        {
          title: "Review every term",
          text: "Teaching outcomes, attendance patterns and feedback are reviewed at the end of each term.",
        },
      ],
    },
  },

  "governing-body": {
    title: "Governing Body",
    heroImage: img("photo-1497366216548-37526070297c"),
    heroLead: "The oversight body that keeps the college on course and accountable.",
    kicker: "Oversight",
    heading: "Governance that keeps decisions open and honest.",
    lead: "The Governing Body approves budgets, academic policy, staffing and major campus development. It meets at least once per term and keeps a written record of what was decided and why.",
    points: [
      {
        title: "Academic policy",
        text: "Programme approvals, curriculum follow-up and examination-related decisions follow University of Calicut norms.",
      },
      {
        title: "Finance and audit",
        text: "Accounts are maintained under a documented process, with fees and expenditure available to students on request.",
      },
      {
        title: "Campus development",
        text: "Laboratory, library and sports investments are prioritised before expanding new programmes.",
      },
    ],
    highlights: {
      kicker: "Meetings",
      title: "How the body operates",
      items: [
        {
          title: "Termly review",
          text: "Each meeting reviews results, attendance, discipline, finance and student feedback before moving to new business.",
        },
        {
          title: "Documented decisions",
          text: "Minutes are recorded and shared with the management team, so accountability does not depend on memory.",
        },
        {
          title: "Student voice",
          text: "Representative student feedback is collected each term and presented to the body with the faculty response.",
        },
      ],
    },
  },

  infrastructure: {
    title: "Infrastructure",
    heroImage: img("photo-1497366754035-f200968a6e72"),
    heroLead: "Classrooms, laboratories, library and campus facilities built for how students actually learn.",
    kicker: "Facilities",
    heading: "Spaces that make serious study possible.",
    lead: "The campus is planned around teaching hours: classrooms that seat a full batch, laboratories with equipment students can use, and quiet reading space for long study sessions.",
    points: [
      {
        title: "Teaching classrooms",
        text: "Projector-equipped classrooms with seating layouts that support both lectures and group work.",
      },
      {
        title: "Laboratories",
        text: "Computing, commerce and language labs maintained with practical sessions built into the timetable.",
      },
      {
        title: "Library & reading space",
        text: "Library with journals, e-resources and a quiet reading section for assignments and revision.",
      },
    ],
    highlights: {
      kicker: "Facilities",
      title: "What students can use on any working day",
      items: [
        {
          title: "Seminar and activity rooms",
          text: "Spaces for club meetings, presentations, workshops and group study without booking a classroom.",
        },
        {
          title: "Campus internet",
          text: "Network access for study material, research and online forms across the academic block.",
        },
        {
          title: "Sports and recreation",
          text: "Indoor games, exercise and recreation time that keeps long study days sustainable.",
        },
      ],
    },
  },

  "accreditation-recognition": {
    title: "Accreditation & Recognition",
    heroImage: img("photo-1450101499163-c8848c66ca85"),
    heroLead:
      "Affiliation, approvals and the recognition that matter when your degree is evaluated.",
    kicker: "Recognition",
    sections: [
      {
        heading: "Academic Affiliation",
        paragraphs: [
          "Royal College of Arts & Science, Trithala is affiliated with the University of Calicut, one of the major universities in Kerala. Through this affiliation, the college follows the academic framework, curriculum, and regulations prescribed by the university for its affiliated programmes.",
        ],
      },
      {
        heading: "University of Calicut",
        paragraphs: [
          "The college's affiliation with the University of Calicut provides students with a recognized academic pathway and enables them to pursue undergraduate education under the university's academic system.",
          "Students enrolled in affiliated programmes follow the prescribed academic requirements and are awarded qualifications in accordance with the regulations of the University of Calicut.",
        ],
      },
      {
        heading: "Institutional Recognition",
        paragraphs: [
          "Royal College of Arts & Science is operated under the management of Al Noor Educational and Charitable Trust, with a commitment to providing accessible and quality higher education to students, particularly those from rural communities.",
          "The institution strives to maintain an academic environment focused on:",
        ],
        list: [
          "Quality higher education",
          "Academic integrity and discipline",
          "Modern knowledge and technological skills",
          "Student development and learning",
          "Value-based education",
          "Responsible citizenship",
        ],
      },
      {
        heading: "Our Commitment to Quality",
        paragraphs: [
          "Royal College of Arts & Science is committed to continuously improving its academic environment and educational practices. The college aims to provide students with meaningful learning opportunities that combine academic knowledge, practical skills, technology, and values.",
          "Through its affiliation with the University of Calicut and its commitment to educational development, the college works towards preparing students for higher education, professional opportunities, and responsible participation in society.",
        ],
      },
    ],
    callout: {
      title: "Affiliated to University of Calicut",
      image: "/college-mark.png",
      imageAlt: "Royal College of Arts & Science crest",
      lines: [
        "Royal College of Arts & Science",
        "Trithala, Palakkad, Kerala",
        "Managed by Al Noor Educational and Charitable Trust",
      ],
    },
  },
};

const built = Object.fromEntries(
  Object.entries(drafts).map(([slug, draft]) => [
    slug,
    buildPage("About Us", draft),
  ]),
);

export const aboutPages: Record<string, InnerPageData> = assignVariants(built, 0);
