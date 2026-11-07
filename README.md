# 🌐 Lucid — Full-Stack Landing Page

> A modern, responsive and animated landing page built with **Next.js 16**, **React 19** and **Tailwind CSS 4**, with a built-in **REST API** (contact form, newsletter, admin endpoints). Designed and developed by **[Lamia Kajal](https://github.com/lamiakajal)**.

<div align="left">

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![CI](https://img.shields.io/github/actions/workflow/status/lamiakajal/lucid-fullstack-landing-page/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/lamiakajal/lucid-fullstack-landing-page/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Production-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

## 🔗 Links

- **Live site:** [lucid-lamiakajal.vercel.app](https://lucid-lamiakajal.vercel.app)
- **Repository:** [github.com/lamiakajal/lucid-fullstack-landing-page](https://github.com/lamiakajal/lucid-fullstack-landing-page)
- **Author:** [Lamia Kajal](https://github.com/lamiakajal)

---

## ✨ Features

**Front end**

- Dark base (`#15171e`) with electric-blue (`#008ed6`) accents. Fully responsive: mobile, tablet, desktop and ultra-wide.
- **Circular preloader** while the site loads, with a safety timeout so visitors never get stuck.
- **Looping animations:** floating device mockups, drifting glow orbs, pulsing icon rings, shimmering buttons, animated heading underlines, bobbing icons and a carousel progress bar. Only `transform` and `opacity` are animated, so everything stays smooth.
- **Scroll reveal** entrance animations, a slim **branded scrollbar**, a **reading-progress bar** in the navbar and **active section highlighting**.
- Testimonials carousel with CSS-timed autoplay, pause on hover/focus/touch, dots and swipe support.
- **Custom 404 page** with "Back to home", "Go back" and quick links, plus a friendly error page.
- Respects `prefers-reduced-motion` (animations are switched off for those visitors).
- Accessible: skip link, labelled form fields, ARIA attributes and visible keyboard focus styles.

**Back end (Next.js route handlers, zero extra dependencies)**

- `POST /api/contact` and `POST /api/newsletter` are connected to the forms on the page.
- Validation, sanitising, honeypot spam trap, per-IP rate limiting, same-origin check and request size limits.
- Protected admin endpoints to read messages, subscribers and statistics.
- Atomic JSON-file store with an adapter-style interface, plus a ready-to-use [MongoDB drop-in](docs/MONGODB.md).

**SEO**

- Rich metadata, canonical URL, Open Graph and Twitter cards, `robots.txt`, `sitemap.xml`, web app manifest and **JSON-LD structured data** that connects the site with its author. See [docs/SEO.md](docs/SEO.md).

**Quality**

- 28 automated tests (Node's built-in test runner) for validators, rate limiter, data store and every API route.
- GitHub Actions workflow that runs lint, tests and a production build.
- Images served as WebP (the hero background went from 1.7 MB to about 10 KB).

