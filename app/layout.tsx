import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FlashNewsTicker from "@/components/FlashNewsTicker";
import { SiteLiveProvider } from "@/components/SiteLiveProvider";
import { getFlashNews, getProgrammes, getSiteSettings } from "@/lib/siteContent";
import "./globals.css";

export const metadata: Metadata = {
  title: "Royal College of Arts & Science",
  description:
    "Royal College of Arts & Science — empowering students with knowledge, values and opportunities for a brighter future.",
};

export const revalidate = 300;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [{ applyEnabled }, flashNews, programmes] = await Promise.all([
    getSiteSettings(),
    getFlashNews(),
    getProgrammes(),
  ]);

  // The footer lists programmes by name, so a programme added in the admin
  // appears there without a code change.
  const programs = programmes.slice(0, 6).map((programme) => ({
    name: programme.name,
    shortName: programme.shortName || programme.name,
    slug: programme.slug ?? null,
  }));

  return (
    <html lang="en">
      <body>
        {/* SSR baseline below; SiteLiveProvider keeps it in step with the CMS. */}
        <SiteLiveProvider
          applyEnabled={applyEnabled}
          flashNews={flashNews}
          programs={programs}
        >
          <Header />

          <FlashNewsTicker />

          {children}

          <Footer />
        </SiteLiveProvider>
      </body>
    </html>
  );
}
