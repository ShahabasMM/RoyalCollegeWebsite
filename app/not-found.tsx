import type { Metadata } from "next";
import Link from "next/link";

/**
 * 404 page. Next renders this for every notFound() call, and there are five
 * [slug] segments that crawlers will probe, so it needs to be a real page with
 * a way back — the built-in default leaves a visitor stranded.
 */
export const metadata: Metadata = {
  title: "Page not found",
  // A 404 must never be indexed as if it were content, even though the status
  // code already says that. Belt and braces, because a soft-404 can otherwise
  // be indexed if the status is ever lost in a redirect or CDN rule.
  robots: { index: false, follow: true },
};

const destinations = [
  { label: "Home", href: "/", note: "Start from the beginning" },
  { label: "Academics", href: "/academics", note: "Departments, programmes and faculty" },
  { label: "Admissions", href: "/admissions", note: "Eligibility and how to apply" },
  { label: "Campus Life", href: "/campus/campus-life", note: "Activities and facilities" },
  { label: "Contact", href: "/contact", note: "Phone, email and office hours" },
];

export default function NotFound() {
  return (
    <main className="content ip">
      <section className="ip-section">
        <div className="container ip-narrow">
          <div className="ip-head">
            <span className="section-kicker">Error 404</span>
            <h1 className="ip-title">We couldn&apos;t find that page.</h1>
            <p className="muted">
              The link may be old or mistyped. Try one of the pages below, or call
              the college office and we will point you the right way.
            </p>
          </div>

          <ul className="ip-points">
            {destinations.map((item) => (
              <li className="ip-point" key={item.href}>
                <div>
                  <strong>
                    <Link href={item.href}>{item.label}</Link>
                  </strong>
                  <p>{item.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}