# SEO Guide

The code already contains everything search engines read directly from the website. Ranking, however,
also depends on things outside the code, so follow the checklist below.

## What is built in

| Feature | Where |
| ------- | ----- |
| Title, description, keywords (including "Lamia Kajal") | `src/app/layout.js` |
| Canonical URL, robots rules, Open Graph, Twitter card | `src/app/layout.js` |
| Structured data (Person + WebSite + WebPage, JSON-LD) | `src/components/seo/JsonLd.jsx` |
| `robots.txt` and `sitemap.xml` | `src/app/robots.js`, `src/app/sitemap.js` |
| Web app manifest | `src/app/manifest.js` |
| Author link with `rel="author"` in the footer | `src/components/Footer.jsx` |
| Semantic HTML, one `h1`, alt texts, fast WebP images | all components |

## Checklist after deploying

1. Set `NEXT_PUBLIC_SITE_URL` to your real domain in Vercel and redeploy.
2. Open [Google Search Console](https://search.google.com/search-console), add your site as a property and verify it
   (paste the token into `GOOGLE_SITE_VERIFICATION`).
3. Submit `https://YOUR-DOMAIN/sitemap.xml` and use **URL Inspection → Request indexing** for the home page.
4. Link to the site from places Google already trusts: your GitHub profile README, the repository's website field,
   LinkedIn, Dev.to / Hashnode posts and your portfolio. Use the name "Lamia Kajal" in the link text.
5. Keep the same name spelling everywhere ("Lamia Kajal") so search engines connect all the profiles.
6. Check the result with the [Rich Results Test](https://search.google.com/test/rich-results) and
   [PageSpeed Insights](https://pagespeed.web.dev).

## Be realistic

Nobody can guarantee a position in search results. New sites usually need days to weeks to be indexed, and a common
name competes with other people. Backlinks from your own profiles and a few pieces of content that mention your name
help the most.
