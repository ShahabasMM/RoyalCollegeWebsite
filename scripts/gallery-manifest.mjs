#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, statSync } from "node:fs";
import { extname, join, parse } from "node:path";

const IMAGE_DIR = "public/images/instagram";
const VIDEO_DIR = "public/videos/instagram";
const CATEGORIES = ["campus", "academics", "events", "sports", "community"];

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const VIDEO_EXT = new Set([".mp4", ".mov", ".m4v", ".webm"]);

function titleize(slug) {
  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function ratioFor(width, height) {
  const value = width / height;
  if (value > 1.45) return "wide";
  if (value < 0.9) return "tall";
  return "square";
}

function dimensions(file) {
  try {
    const out = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", file], {
      encoding: "utf8",
    });
    const width = Number(out.match(/pixelWidth:\s*(\d+)/)?.[1] ?? 0);
    const height = Number(out.match(/pixelHeight:\s*(\d+)/)?.[1] ?? 0);
    if (width && height) return { width, height };
  } catch {
    return null;
  }
  return null;
}

function categoryFor(name) {
  const prefix = name.split(/[-_]/)[0].toLowerCase();
  const match = CATEGORIES.find((category) => category === prefix);
  return match ? match.charAt(0).toUpperCase() + match.slice(1) : "Campus";
}

function listFiles(dir, allowed) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((file) => allowed.has(extname(file).toLowerCase()))
    .filter((file) => statSync(join(dir, file)).isFile())
    .sort();
}

const entries = [];

for (const file of listFiles(IMAGE_DIR, IMAGE_EXT)) {
  const name = parse(file).name;
  const size = dimensions(join(IMAGE_DIR, file));
  entries.push({
    kind: "image",
    file,
    id: name,
    category: categoryFor(name),
    ratio: size ? ratioFor(size.width, size.height) : "wide",
    ...(size ?? { width: 2000, height: 1333 }),
  });
}

for (const file of listFiles(VIDEO_DIR, VIDEO_EXT)) {
  const name = parse(file).name;
  const size = dimensions(join(VIDEO_DIR, file));
  entries.push({
    kind: "video",
    file,
    id: name,
    category: categoryFor(name),
    ratio: size ? ratioFor(size.width, size.height) : "wide",
    ...(size ?? { width: 1280, height: 720 }),
  });
}

if (entries.length === 0) {
  console.log(`No media found.\n  photos -> ${IMAGE_DIR}/\n  reels  -> ${VIDEO_DIR}/`);
  process.exit(0);
}

const profile = "https://www.instagram.com/royal_college_thrithala/";

console.log("// paste into the galleryItems array in content/gallery.ts\n");
for (const entry of entries) {
  const isVideo = entry.kind === "video";
  const base = isVideo ? entry.file.replace(/\.[^.]+$/, ".jpg") : entry.file;
  const slug = base.replace(/\.[^.]+$/, "");
  const lines = [
    "  {",
    `    id: "${slug}",`,
    `    kind: "${isVideo ? "reel" : "image"}",`,
    `    src: "/images/instagram/${base}",`,
  ];
  if (isVideo) {
    lines.push(`    video: "/videos/instagram/${entry.file}",`);
  }
  lines.push(
    `    permalink: "${profile}",`,
    `    alt: "${titleize(slug)}",`,
    `    caption: "${titleize(slug)}.",`,
    `    category: "${entry.category}",`,
    `    ratio: "${entry.ratio}",`,
    `    width: ${entry.width},`,
    `    height: ${entry.height},`,
    "  },",
  );
  console.log(lines.join("\n"));
}

console.log(`\n${entries.length} item(s) found.`);
