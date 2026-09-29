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
        <div className="crumb">
          <Link href="/">Home</Link> / {crumb}
        </div>
        <h1>{title}</h1>
        <p>{lead ?? "Discover more about Royal College of Arts & Science."}</p>
      </div>
    </section>
  );
}
