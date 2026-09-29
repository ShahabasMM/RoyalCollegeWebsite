import { img } from "@/content/innerPageData";

export type CampusLifeBlock = {
  index: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
};

export const campusLife = {
  title: "Campus Life",
  heroImage: img("photo-1523240795612-9a054b0db644"),
  heroLead: "Learning, connecting, discovering new interests, and growing together.",
  kicker: "Campus life",
  heading: "Learning, connecting and growing together.",
  intro: [
    "Campus life at Royal College of Arts & Science is about learning, connecting, discovering new interests, and growing together.",
    "Located near Trithala town and the banks of the Bharathapuzha, the college provides students with a welcoming environment where academic learning and personal development come together.",
  ],
  location: "Near Trithala town, on the banks of the Bharathapuzha",
  blocks: [
    {
      index: "01",
      title: "Learn Beyond the Classroom",
      text: "Students are encouraged to take an active role in their education, develop practical skills, share ideas, and explore new areas of knowledge.",
      image: img("photo-1509062522246-3755977927d7", 1200),
      imageAlt: "Students in a classroom session",
    },
    {
      index: "02",
      title: "Connect & Grow",
      text: "College life provides opportunities for students to build friendships, work together, exchange ideas, and develop communication and teamwork skills.",
      image: img("photo-1522202176988-66273c2fd55f", 1200),
      imageAlt: "Students working together in a group",
    },
    {
      index: "03",
      title: "Develop Your Potential",
      text: "We believe every student has unique abilities and potential. Royal College encourages students to build confidence, discover their strengths, and prepare themselves for future opportunities.",
      image: img("photo-1531482615713-2afd69097998", 1200),
      imageAlt: "Students discussing a project together",
    },
    {
      index: "04",
      title: "A Supportive Environment",
      text: "Our campus aims to provide a positive and inclusive environment where students can focus on their studies while enjoying meaningful experiences throughout their college journey.",
      image: img("photo-1541339907198-e08756dedf3f", 1200),
      imageAlt: "The college campus building",
    },
  ] as CampusLifeBlock[],
  closing: {
    title: "Learn. Connect. Explore. Grow.",
    text: "At Royal College, every day is an opportunity to learn something new, create meaningful experiences, and take another step towards a brighter future.",
    image: img("photo-1517486808906-6ca8b3f04846", 1600),
  },
};
