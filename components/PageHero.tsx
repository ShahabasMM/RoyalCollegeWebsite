import Link from "next/link";

type PageHeroProps = {
  title: string;
  crumb: string;
  image: string;
  lead?: string;
};

export default function PageHero({ title, crumb, image, lead }: PageHeroProps) {
  return (
    <section
      className="page-hero"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="container">
        {/*
          crumb arrives as the string "Section / Title". Split on "/" so the
          trail is a real nav landmark with ordered list semantics instead of
          a bare "Home / Academics / Programmes" text run. Only "Home" is a
          link: the intermediate levels have no dedicated route in this site,
          and linking them to a wrong guess would be worse than not linking.
        */}
        <nav className="crumb" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            {crumb
              .split("/")
              .map((part) => part.trim())
              .filter(Boolean)
              .map((part, index) => (
                <li key={`${part}-${index}`}>{part}</li>
              ))}
          </ol>
        </nav>
        <h1>{title}</h1>
        <p>{lead ?? "Discover more about Royal College of Arts & Science."}</p>
      </div>
    </section>
  );
}