const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://loftlyy.com"

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  transform: async (_config, path) => {
    // Home pages get highest priority
    if (path.match(/^\/(en|es|fr|de|ja)$/)) {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }

    // Category pages
    if (path.includes("/category/")) {
      return {
        loc: path,
        changefreq: "daily",
        priority: 0.6,
        lastmod: new Date().toISOString(),
      }
    }

    // Brand pages
    return {
      loc: path,
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }
  },
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
}

export default config
