import { img } from "./innerPageData";

export type GalleryCategory =
  | "Campus"
  | "Academics"
  | "Events"
  | "Sports"
  | "Community"
  | "Instagram";

export type GalleryKind = "image" | "reel";

export type GalleryRatio = "square" | "wide" | "tall";

export type GalleryItem = {
  id: string;
  kind: GalleryKind;
  src: string;
  video?: string;
  permalink: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  ratio: GalleryRatio;
  width: number;
  height: number;
};

export const instagramProfile = "https://www.instagram.com/royal_college_thrithala/";
export const instagramHandle = "@royal_college_thrithala";

export const galleryHero = img("photo-1517457373958-b7bdd4587205", 2000);

export const galleryHeroLead =
  "Photographs and reels shared by the official Instagram page of the college.";

export const galleryLead =
  "Every item below is a real post from the official page. Open one to view it full size, move through the set with the arrow keys, and follow the page for new posts as they go up.";

const post = (code: string) => `https://www.instagram.com/p/${code}/`;
const reel = (code: string) => `https://www.instagram.com/reel/${code}/`;

export const galleryItems: GalleryItem[] = [
  {
    id: "ig-DdssD4SzTdv",
    kind: "reel",
    src: "/images/instagram/ig-DdssD4SzTdv.jpg",
    permalink: reel("DdssD4SzTdv"),
    alt: "Cover image of a reel posted by the official college page",
    caption: "Reel posted by @royal_college_thrithala.",
    category: "Instagram",
    ratio: "tall",
    width: 640,
    height: 1136,
  },
  {
    id: "ig-DZg0xFiPW44",
    kind: "reel",
    src: "/images/instagram/ig-DZg0xFiPW44.jpg",
    permalink: reel("DZg0xFiPW44"),
    alt: "Cover image of a reel posted by the official college page",
    caption: "Reel posted by @royal_college_thrithala.",
    category: "Instagram",
    ratio: "tall",
    width: 640,
    height: 1136,
  },
  {
    id: "ig-DZOzZ8PvY21",
    kind: "reel",
    src: "/images/instagram/ig-DZOzZ8PvY21.jpg",
    permalink: reel("DZOzZ8PvY21"),
    alt: "Cover image of a reel posted by the official college page",
    caption: "Reel posted by @royal_college_thrithala.",
    category: "Instagram",
    ratio: "tall",
    width: 640,
    height: 1136,
  },
  {
    id: "ig-DODUqskD0xg",
    kind: "reel",
    src: "/images/instagram/ig-DODUqskD0xg.jpg",
    permalink: reel("DODUqskD0xg"),
    alt: "Cover image of a reel posted by the official college page",
    caption: "Reel posted by @royal_college_thrithala.",
    category: "Instagram",
    ratio: "tall",
    width: 640,
    height: 1136,
  },
  {
    id: "ig-DZhU6W7iW6J",
    kind: "image",
    src: "/images/instagram/ig-DZhU6W7iW6J.jpg",
    permalink: post("DZhU6W7iW6J"),
    alt: "Photograph from the official college page",
    caption: "Post shared by @royal_college_thrithala.",
    category: "Instagram",
    ratio: "tall",
    width: 810,
    height: 1080,
  },
  {
    id: "ig-DP05s6DE4fQ",
    kind: "image",
    src: "/images/instagram/ig-DP05s6DE4fQ.jpg",
    permalink: post("DP05s6DE4fQ"),
    alt: "Photograph from the official college page",
    caption: "Post shared by @royal_college_thrithala.",
    category: "Instagram",
    ratio: "tall",
    width: 810,
    height: 1080,
  },
  {
    id: "ig-DTxvvJiEYzf",
    kind: "reel",
    src: "/images/instagram/ig-DTxvvJiEYzf.jpg",
    permalink: reel("DTxvvJiEYzf"),
    alt: "Cover image of a reel shared by another account",
    caption: "Reel shared by @__whybee_._, not the official page.",
    category: "Instagram",
    ratio: "tall",
    width: 720,
    height: 1280,
  },
];
