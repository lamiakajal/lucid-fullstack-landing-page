import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

// Self-hosted at build time by next/font: no render-blocking request to Google
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
  display: "swap",
  variable: "--font-source-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lucid-lamiakajal.vercel.app";
const description =
  "Lucid is a carefully crafted, fully responsive landing page built with Next.js, Tailwind CSS and a built-in API.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lucid - Modern Landing Page",
    template: "%s | Lucid",
  },
  description,
  keywords: ["landing page", "Next.js", "Tailwind CSS", "SaaS", "responsive design"],
  authors: [{ name: "Lamia Kajal" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Lucid",
    title: "Lucid - Modern Landing Page",
    description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Lucid landing page preview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucid - Modern Landing Page",
    description,
    images: ["/og-image.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#15171e",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={sourceSans.variable}>
      <body className="antialiased">
        {/* Without JavaScript the scroll-reveal never runs, so show everything */}
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>

        {/* Lets keyboard users jump straight past the navigation */}
        <a
          href="#main"
          className="sr-only z-[100] rounded bg-[#008ed6] px-4 py-2 font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>

        {children}
      </body>
    </html>
  );
}
