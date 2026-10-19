import type { Metadata } from "next";

import RoyalNssPage from "@/components/RoyalNssPage";
import {
  NSS_PHOTOS,
  NSS_REELS,
  type NssBoardPhoto,
  type NssReel,
} from "@/content/nssPage";
import { getGallery } from "@/lib/siteContent";
import {
  getNssMedia,
  getStudentZonePage,
  instagramShortcode,
} from "@/lib/studentZoneContent";
import { descriptionFrom, pageMetadata } from "@/lib/seo";

const SLUG = "nss";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getStudentZonePage(SLUG);

  // /campus/nss still exists, so the section name is folded into the title
  // here. Without it the two pages ship byte-identical titles, which is the one
  // thing a title tag must never do.
  return pageMetadata({
    title: page.title === "NSS" ? "Student Zone NSS" : page.title,
    description: descriptionFrom(page.lead),
    path: page.path,
  });
}

export default async function StudentZoneNssPage() {
  const [page, gallery, media] = await Promise.all([
    getStudentZonePage(SLUG),
    getGallery(),
    getNssMedia(),
  ]);

  // Board photos, in priority order: CMS media rows (site_media_items, edited
  // in the ERP's NSS Media board) → staff gallery photographs ("NSS") → the
  // typed Instagram embeds. Whichever layer first has rows owns the board.
  //
  // A photo row's `url` is only used as a printed photograph when it is a real
  // image file. Instagram addresses are page URLs, never image files, so they
  // become the official embed (via the shortcode) instead of a broken <img>.
  const mediaPhotos: NssBoardPhoto[] = media.photos.flatMap(
    (row): NssBoardPhoto[] => {
      const url = row.url ?? "";
      const instagramCode = row.embedCode ?? instagramShortcode(url);
      const urlIsInstagram = Boolean(instagramShortcode(url));

      if (url && !urlIsInstagram) {
        return [
          {
            id: row.id,
            kind: "image",
            image: url,
            alt: row.title ?? "Royal NSS photograph",
            title: row.title ?? "",
            linkUrl: instagramCode
              ? `https://www.instagram.com/p/${instagramCode}/`
              : url,
          },
        ];
      }

      if (instagramCode) {
        return [
          { id: row.id, kind: "embed", code: instagramCode, title: row.title ?? "" },
        ];
      }

      return [];
    },
  );

  const galleryPhotos: NssBoardPhoto[] = gallery
    .filter((item) => item.category.trim().toLowerCase() === "nss")
    .map((item): NssBoardPhoto => ({
      id: item.id,
      kind: "image",
      image: item.image,
      alt: item.imageAlt || item.title || "Royal NSS photograph",
      title: item.title,
      linkUrl: item.linkUrl || undefined,
    }));

  const typedPhotos: NssBoardPhoto[] = NSS_PHOTOS.map((source) => ({
    id: source.id,
    kind: "embed",
    code: source.code,
    title: source.caption,
  }));

  const photos =
    mediaPhotos.length > 0
      ? mediaPhotos
      : galleryPhotos.length > 0
        ? galleryPhotos
        : typedPhotos;

  // Reels: CMS media rows with a usable shortcode → the typed four.
  const mediaReels: NssReel[] = media.reels
    .filter((row) => row.embedCode)
    .map((row) => ({
      id: row.id,
      code: row.embedCode as string,
      title: row.title ?? "Royal NSS reel",
      url: row.url ?? `https://www.instagram.com/reel/${row.embedCode}/`,
    }));

  const reels = mediaReels.length > 0 ? mediaReels : NSS_REELS;

  return <RoyalNssPage content={page} photos={photos} reels={reels} />;
}
