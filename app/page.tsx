import HomePage, {
  type HomeNewsItem,
  type HomeProgram,
  type HomeStat,
} from "@/components/HomePage";
import {
  getNews,
  getProgrammes,
  getStats,
  getWelcomePopup,
  type SiteStat,
} from "@/lib/siteContent";
import WelcomePopup from "@/components/WelcomePopup";

export const revalidate = 300;

/** The CMS stores absolute image URLs; the card needs a narrower crop. */
function cardImage(url: string): string {
  if (!url.includes("images.unsplash.com")) return url;

  return `${url.split("?")[0]}?auto=format&fit=crop&w=900&q=85`;
}

function shortDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** Kept so the home page still has three cards if the CMS has no usable images. */
const FALLBACK_NEWS: HomeNewsItem[] = [
  {
    category: "Campus life",
    date: "18 Feb 2026",
    title: "Royal College Arts Fest returns with a bigger canvas",
    description:
      "A week of performances, exhibitions and conversations with the community.",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=85",
  },
  {
    category: "Academic update",
    date: "12 Feb 2026",
    title: "New peer-learning studios open this semester",
    description:
      "Students can now explore ideas together in spaces designed for discovery.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",
  },
  {
    category: "Community",
    date: "04 Feb 2026",
    title: "Students contribute 1,000 hours to local outreach",
    description:
      "The community service cohort continues our tradition of showing up for others.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
  },
];

/** Programme cards fall back to the programme index when no slug is set. */
function programHref(slug: string | null): string {
  return slug ? `/programs/${slug}` : "/academics/programmes";
}

async function loadPrograms(): Promise<HomeProgram[]> {
  const programmes = await getProgrammes();

  return programmes.map((programme) => ({
    title: programme.shortName || programme.name,
    fullTitle: programme.name,
    description: programme.about || "",
    duration: programme.duration || "",
    format: programme.scheme || programme.level || "Undergraduate",
    href: programHref(programme.slug ?? null),
    image: cardImage(programme.image || ""),
  }));
}

/** The CMS stores icon keys; the component maps them to components. */
function toHomeStats(stats: SiteStat[]): HomeStat[] {
  return stats.map((stat) => ({
    label: stat.label,
    value: stat.value,
    suffix: stat.suffix,
    iconKey: stat.iconKey,
  }));
}

export default async function Home() {
  const [{ items }, programs, stats, welcomePopup] = await Promise.all([
    getNews(),
    loadPrograms(),
    getStats(),
    getWelcomePopup(),
  ]);

  // A story is never dropped for a missing image: .news-image already has its
  // own background, so an image-less story still shows as a plain card.
  const news: HomeNewsItem[] = items
    .slice(0, 3)
    .map((item) => ({
      category: item.category,
      date: shortDate(item.date),
      title: item.title,
      description: item.text,
      image: item.image ? cardImage(item.image) : "",
    }));

  // Only fall back when the CMS has nothing usable, so a partly filled
  // news table shows exactly what was published rather than stale filler.
  return (
    <>
      <HomePage
        news={news.length > 0 ? news : FALLBACK_NEWS}
        programs={programs}
        stats={toHomeStats(stats)}
      />
      {welcomePopup ? <WelcomePopup content={welcomePopup} /> : null}
    </>
  );
}
