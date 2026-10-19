import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/**
 * The public college site has no admin, ERP, login or dashboard routes — it is
 * a separate deployment from the CMS at royalcollege.vercel.app. These blocks
 * are defensive: they stop a crawler wasting budget on paths that do not
 * exist, and they cost nothing if the site later grows one.
 *
 * /api/ and the sitemap are deliberately not disallowed; neither is crawlable
 * content.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = [
    "/admin/",
    "/dashboard/",
    "/login/",
    "/signin/",
    "/erp/",
    "/api/",
    "/_next/",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}