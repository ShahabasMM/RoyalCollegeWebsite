"use client";

import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useApplyEnabled, useLivePrograms } from "./SiteLiveProvider";
import { APPLY_URL } from "@/content/innerPageData";
import { EMAIL, PHONES } from "@/content/contactDetails";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About college", href: "/about/about-college" },
  { label: "Academics", href: "/academics" },
  { label: "Admissions", href: "/admissions" },
  { label: "Campus life", href: "/campus/campus-life" },
  { label: "News & events", href: "/news" },
];

/** Programme names come from the CMS, so this is only the no-JS fallback. */
const FALLBACK_PROGRAMS = [
  { label: "BCA", href: "/academics/programmes" },
  { label: "B.Com", href: "/academics/programmes" },
  { label: "BA English", href: "/academics/programmes" },
  { label: "BBA", href: "/academics/programmes" },
];

const admissionLinks = [
  { label: "How to apply", href: APPLY_URL, applyOnly: true },
  { label: "Eligibility & requirements", href: "/admissions" },
  { label: "Visit the campus", href: "/campus/campus-life" },
  { label: "Contact admissions", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const applyEnabled = useApplyEnabled();
  const livePrograms = useLivePrograms();

  // Programme links follow the CMS: name and slug both come from the admin,
  // so a programme added there shows up here without touching this file.
  const programLinks =
    livePrograms.length > 0
      ? livePrograms.map((program) => ({
          label: program.shortName || program.name,
          href: program.slug
            ? `/academics/programmes/${program.slug}`
            : "/academics/programmes",
        }))
      : FALLBACK_PROGRAMS;

  // "How to apply" is an apply action, so it follows the same switch.
  const links = admissionLinks.filter(
    (link) => applyEnabled || !("applyOnly" in link && link.applyOnly),
  );

  return (
    <footer className="site-footer">
      <div className="footer-glow footer-glow-one" aria-hidden="true" />
      <div className="footer-glow footer-glow-two" aria-hidden="true" />
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link className="footer-logo" href="/">
            <span className="footer-crest">
              <Image
                className="crest-image"
                src="/college-mark.png"
                alt="Royal College of Arts &amp; Science crest"
                width={160}
                height={153}
              />
            </span>
            <span>
              ROYAL COLLEGE
              <small>OF ARTS &amp; SCIENCE</small>
              <small className="footer-affiliation">
                Affiliated to University of Calicut
              </small>
            </span>
          </Link>
          <p>
            A thoughtful education for students who want to keep learning, lead with
            purpose and make a meaningful difference.
          </p>
          <div className="social-links" aria-label="Social media">
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram size={17} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin size={17} />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
              <Youtube size={17} />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <Facebook size={17} />
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Quick links</h3>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <h3>Academic programs</h3>
          <ul>
            {programLinks.map((link) => (
              <li key={link.href + link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/academics/programmes">All programs</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Admissions</h3>
          <ul>
            {links.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column footer-contact">
          <h3>Get in touch</h3>
          <ul>
            <li>
              <MapPin size={16} />
              <span>Royal College campus<br />Kerala, India</span>
            </li>
            {PHONES.map((phone) => (
              <li key={phone}>
                <Phone size={16} />
                <a href={`tel:+91${phone}`}>{phone}</a>
              </li>
            ))}
            <li>
              <Mail size={16} />
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {year} Royal College of Arts &amp; Science. All rights reserved.</span>
          <div className="legal-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
