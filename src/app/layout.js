import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/ui/Preloader";
import JsonLd from "@/components/seo/JsonLd";

// Self-hosted at build time by next/font: no render-blocking request to Google
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
  display: "swap",
  variable: "--font-source-sans",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://lucid-lamiakajal.vercel.app";
const authorName = "Lamia Kajal";
const authorUrl = "https://github.com/lamiakajal";
const title = `Lucid Landing Page | Full-Stack Next.js Project by ${authorName}`;
const description =
  "Lucid is a responsive, animated full-stack landing page built with Next.js, Tailwind CSS and a REST API. Designed and developed by Lamia Kajal.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${authorName}`,
  },
  description,
  applicationName: "Lucid",
  keywords: [
    "Lamia Kajal",
    "Lamia Kajal developer",
    "Lamia Kajal portfolio",
    "Lamia Kajal Next.js",
    "Lamia Kajal GitHub",
    "Lucid landing page",
    "Next.js landing page",
    "full-stack landing page",
    "Tailwind CSS landing page",
    "responsive landing page",
  ],
  authors: [{ name: authorName, url: authorUrl }],
  creator: authorName,
  publisher: authorName,
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: `Lucid by ${authorName}`,
    locale: "en_US",
    title,
    description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `Lucid landing page by ${authorName}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  // Optional: set GOOGLE_SITE_VERIFICATION to prove ownership in Google Search Console
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#15171e",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={sourceSans.variable}>
      <body className="antialiased" suppressHydrationWarning>
        {/* Without JavaScript the scroll-reveal never runs and the preloader never closes */}
        <noscript>
          <style>
            {
              ".reveal{opacity:1!important;transform:none!important}.preloader{display:none!important}"
            }
          </style>
        </noscript>

        <JsonLd
          siteUrl={siteUrl}
          authorName={authorName}
          authorUrl={authorUrl}
          description={description}
        />
        <Preloader />

        {/* Lets keyboard users jump straight past the navigation */}
        <a
          href="#main"
          className="sr-only z-100 rounded bg-[#008ed6] px-4 py-2 font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>

        {children}
      </body>
    </html>
  );
}
