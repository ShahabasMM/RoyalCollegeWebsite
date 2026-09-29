import type { InnerPageData, PageVariant } from "@/components/InnerPage";

export const APPLY_URL = "https://royalcollege.vercel.app/apply";

export const img = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export type PageDraft = Omit<InnerPageData, "crumb">;

export function buildPage(crumb: string, draft: PageDraft): InnerPageData {
  return { ...draft, crumb: `${crumb} / ${draft.title}` };
}

const variantCycle: PageVariant[] = ["hero", "stats", "cards", "steps", "editorial"];

export function assignVariants(
  pages: Record<string, InnerPageData>,
  offset = 0,
): Record<string, InnerPageData> {
  return Object.fromEntries(
    Object.entries(pages).map(([slug, page], index) => [
      slug,
      {
        ...page,
        variant: page.variant ?? variantCycle[(index + offset) % variantCycle.length],
      },
    ]),
  );
}
