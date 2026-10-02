"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Check,
  Clock3,
  GraduationCap,
  Heart,
  Landmark,
  Lightbulb,
  Quote,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useEffect } from "react";

export type HomeStat = {
  label: string;
  value: string;
  suffix: string;
  /** Icon name from the admin's list; falls back to the book icon. */
  iconKey: string;
};

/** Matches statIcons in the admin's entityConfig.ts. */
const STAT_ICONS: Record<string, LucideIcon> = {
  book: BookOpen,
  users: Users,
  graduation: GraduationCap,
  award: Award,
  campus: Landmark,
  library: BookOpen,
  activity: Sparkles,
  building: Building2,
};

export type HomeProgram = {
  title: string;
  fullTitle: string;
  description: string;
  duration: string;
  format: string;
  href: string;
  image: string;
};

export type HomeNewsItem = {
  category: string;
  date: string;
  title: string;
  description: string;
  image: string;
};

const image = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;


const strengths = [
  {
    icon: Lightbulb,
    title: "Learn with purpose",
    text: "Strong foundations and real-world context turn curiosity into capability.",
  },
  {
    icon: Users,
    title: "Grow together",
    text: "A supportive community gives every student the confidence to contribute.",
  },
  {
    icon: ShieldCheck,
    title: "Lead with values",
    text: "Integrity, empathy and responsibility are part of every learning experience.",
  },
];

export default function HomePage({
  news,
  programs = [],
  stats = [],
}: {
  news: HomeNewsItem[];
  programs?: HomeProgram[];
  stats?: HomeStat[];
}) {
  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>(".reveal");
    const root = document.documentElement;
    root.classList.add("reveal-enabled");

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return () => root.classList.remove("reveal-enabled");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -48px", threshold: 0.12 },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-enabled");
    };
  }, []);

  return (
    <main>
      <section className="hero" aria-label="Royal College of Arts & Science">
        <div className="hero-media" aria-hidden="true">
          <Image
            src="/images/spotlight.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-lines" aria-hidden="true" />
        <div className="container hero-content">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span>Admissions 2026–27 are now open</span>
              <ArrowUpRight size={15} strokeWidth={2.5} />
            </div>
            <h1 className="visually-hidden">
              Royal College of Arts &amp; Science
            </h1>
            <h2 className="hero-subline">
              Knowledge for Today.
              <span>Skills for Tomorrow.</span>
            </h2>
            <p>
              Royal College of Arts &amp; Science brings together thoughtful
              teaching, a vibrant community and the confidence to build what comes next.
            </p>
            {/* No call to action in the hero by request: "Start your
                application" and "Talk to admissions" in the admissions panel
                are the only home page buttons, so the hero leads with copy
                and the proof line instead. */}
            <div className="hero-proof">
              <div className="proof-avatars" aria-hidden="true">
                <span>RC</span>
                <span>01</span>
                <span>02</span>
              </div>
              <span>Preparing thoughtful leaders since 2010</span>
            </div>
          </div>
          <div className="hero-side" aria-label="College highlights">
            <div className="hero-highlight">
              <span className="highlight-label">A community with purpose</span>
              <strong>20<span>+</span></strong>
              <span>years of learning and growth</span>
            </div>
            <div className="hero-scroll">
              <span>Scroll to explore</span>
              <span className="scroll-line" />
            </div>
          </div>
        </div>
        <div className="hero-bottom container" aria-hidden="true">
          <span>01</span>
          <span className="hero-bottom-rule" />
          <span>09</span>
        </div>
      </section>

      <section className="stats-section" aria-label="Royal College at a glance">
        <div className="container">
          <div className="statbar">
            {stats.map((stat, index) => {
              const Icon = STAT_ICONS[stat.iconKey] ?? BookOpen;

              return (
                <div
                    className={`stat reveal reveal-delay-${Math.min(index + 1, 4)}`}
                  key={stat.label}
                >
                  <span className="stat-icon">
                    <Icon size={18} />
                  </span>
                  <strong>
                    {stat.value}
                    {stat.suffix ? <span>{stat.suffix}</span> : null}
                  </strong>
                  <span className="stat-label">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section intro-section" id="about">
        <div className="container intro-grid">
          <div className="intro-copy reveal">
            <div className="section-kicker">01 / The Royal College experience</div>
            <h2>
              More than a college.
              <span>A community for what comes next.</span>
            </h2>
            <p className="muted">
              We believe education should open doors, broaden perspectives and give
              students the confidence to shape their own path. At Royal College, strong
              foundations meet a warm, ambitious community.
            </p>
            <div className="check-list">
              <div><Check size={16} /><span>Personal attention from experienced faculty</span></div>
              <div><Check size={16} /><span>Practical learning designed for tomorrow</span></div>
              <div><Check size={16} /><span>A values-led environment for every student</span></div>
            </div>
            <Link className="text-link" href="/about/about-college">
              Discover our story <ArrowRight size={17} />
            </Link>
          </div>
          <div className="intro-visual reveal reveal-delay-2">
            <div className="intro-image">
              <Image
                src={image("photo-1541339907198-e08756dedf3f", 2000)}
                alt="Students walking through a welcoming college campus"
                fill
                sizes="(max-width: 900px) 100vw, 620px"
              />
            </div>
            <div className="intro-note">
              <Quote size={20} />
              <p>“The best education changes how you see the world.”</p>
              <span>Our founding belief</span>
            </div>
            <div className="intro-caption">
              <span className="caption-mark">RC</span>
              <span>Curiosity · Character · Community</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft programs-section" id="programs">
        <div className="container">
          <div className="section-head programs-head reveal">
            <div>
              <div className="section-kicker">02 / Academic programs</div>
              <h2>Choose a path that fits your future.</h2>
            </div>
            <div className="section-head-aside">
              <p>Thoughtful curricula, practical learning and support at every step.</p>
              <Link className="text-link" href="/academics">
                View all programs <ArrowRight size={17} />
              </Link>
            </div>
          </div>
          <div className="program-grid">
            {programs.length === 0 ? (
              <p className="muted">
                Programmes will appear here once they are published.
              </p>
            ) : null}
            {programs.map((program, index) => (
              <Link
                className={`program-card reveal reveal-delay-${index + 1}`}
                href={program.href}
                key={program.title}
              >
                <div className="program-image">
                  <img
                    src={program.image}
                    alt={program.fullTitle}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="program-index">0{index + 1}</span>
                  <span className="program-arrow"><ArrowUpRight size={18} /></span>
                </div>
                <div className="program-content">
                  <span className="card-eyebrow">Undergraduate program</span>
                  <h3>{program.title}</h3>
                  <p className="program-full-title">{program.fullTitle}</p>
                  <p>{program.description}</p>
                  <div className="program-meta">
                    <span><Clock3 size={14} />{program.duration}</span>
                    <span><BriefcaseBusiness size={14} />{program.format}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section why-section">
        <div className="container">
          <div className="section-head why-head reveal">
            <div>
              <div className="section-kicker">03 / The Royal difference</div>
              <h2>Built for the way you want to grow.</h2>
            </div>
            <Link className="text-link" href="/about/about-college">
              Our values <ArrowRight size={17} />
            </Link>
          </div>
          <div className="why-layout">
            <div className="why-intro reveal">
              <div className="why-icon"><Sparkles size={22} /></div>
              <p className="muted">
                An education should leave you with more than a qualification. It should
                give you perspective, purpose and the courage to make your own choices.
              </p>
              <div className="why-number">01<span>/</span>03</div>
            </div>
            <div className="strength-list">
              {strengths.map((strength, index) => {
                const Icon = strength.icon;
                return (
                  <div className="strength-card reveal reveal-delay-2" key={strength.title}>
                    <div className="strength-icon"><Icon size={20} /></div>
                    <div>
                      <h3>{strength.title}</h3>
                      <p>{strength.text}</p>
                    </div>
                    <span className="strength-index">0{index + 1}</span>
                  </div>
                );
              })}
            </div>
            <div className="why-card reveal reveal-delay-3">
              <div className="why-card-top">
                <span className="why-card-label">The Royal promise</span>
                <Heart size={19} />
              </div>
              <h3>Make room for more.</h3>
              <p>More questions. More courage. More of the person you are becoming.</p>
              <Link className="text-link text-link-light" href="/admissions">
                Find your place <ArrowRight size={17} />
              </Link>
              <div className="why-card-orbit orbit-one" />
              <div className="why-card-orbit orbit-two" />
            </div>
          </div>
        </div>
      </section>

      <section className="admissions-section">
        <div className="container">
          <div className="admissions-panel reveal">
            <div className="admissions-media" aria-hidden="true">
              <Image
                src={image("photo-1523240795612-9a054b0db644", 1800)}
                alt=""
                fill
                sizes="100vw"
              />
            </div>
            <div className="admissions-overlay" aria-hidden="true" />
            <div className="admissions-content">
              <div className="section-kicker section-kicker-light">Admissions 2026–27</div>
              <h2>Your next chapter starts here.</h2>
              <p>
                Take the first step toward a future with more possibility. Our admissions
                team is here to help you find the right program and make your application
                simple.
              </p>
              <div className="hero-actions">
                <Link className="btn btn-light" href="/admissions">
                  Start your application <ArrowRight size={17} />
                </Link>
                <Link className="btn btn-ghost-light" href="/contact">
                  Talk to admissions <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
            <div className="admissions-status">
              <span>Applications open</span>
            </div>
            <div className="admissions-watermark">RC</div>
          </div>
        </div>
      </section>

      <section className="section news-section" id="news">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <div className="section-kicker">04 / News &amp; announcements</div>
              <h2>What&apos;s happening at Royal.</h2>
            </div>
            <Link className="text-link" href="/news">
              Explore all news <ArrowRight size={17} />
            </Link>
          </div>
          <div className="news-grid home-news-grid">
            {news.map((item, index) => (
              <article className={`news-card reveal reveal-delay-${index + 1}`} key={item.title}>
                <Link href="/news" className="news-image" aria-label={`Read ${item.title}`}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                  <span className="news-image-arrow"><ArrowUpRight size={18} /></span>
                </Link>
                <div className="news-content">
                  <div className="news-meta">
                    <span>{item.category}</span>
                    <time>{item.date}</time>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <Link className="text-link" href="/news">
                    Read story <ArrowRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta-section">
        <div className="container">
          <div className="final-cta reveal">
            <div className="final-cta-copy">
              <div className="section-kicker section-kicker-light">A future worth investing in</div>
              <h2>
                Make your next chapter
                <span>something remarkable.</span>
              </h2>
              <p>Bring your questions. We&apos;ll help you find your direction.</p>
            </div>
            {/* Same reason as the hero: the admissions panel owns these calls
                to action, so this closing section is copy only. */}
            <div className="final-cta-mark" aria-hidden="true">
              <span>RC</span>
              <span className="mark-line" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
