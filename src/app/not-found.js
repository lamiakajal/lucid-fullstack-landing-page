import Image from "next/image";
import Link from "next/link";
import GoBackButton from "@/components/ui/GoBackButton";

export const metadata = {
  title: "404 - Page not found",
  description: "The page you are looking for does not exist or has been moved.",
};

// Shortcuts to the most useful sections of the landing page
const quickLinks = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
];

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#15171e] px-6 py-16 text-center">
      {/* Decorative drifting glows */}
      <div
        aria-hidden="true"
        className="animate-orb pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[#008ed6]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        style={{ animationDelay: "-9s" }}
        className="animate-orb pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-[#7fd6ff]/10 blur-3xl"
      />

      <Link href="/" aria-label="Lucid home" className="relative mb-10">
        <Image src="/assets/logo.png" alt="Lucid" width={300} height={48} className="h-8 w-auto" priority />
      </Link>

      <p
        aria-hidden="true"
        className="animate-float relative text-8xl font-black tracking-tight text-[#008ed6] sm:text-9xl"
      >
        404
      </p>

      <h1 className="relative mt-6 text-2xl font-bold text-white sm:text-3xl">
        Oops! This page is not valid
      </h1>
      <p className="relative mt-3 max-w-md">
        Error 404: the page you are looking for does not exist, was moved, or the address was typed
        incorrectly.
      </p>

      <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="shimmer relative overflow-hidden rounded-[3px] bg-[#008ed6] px-7 py-3 text-[13px] font-bold uppercase tracking-wider text-white transition-colors duration-300 hover:bg-[#0077b5]"
        >
          Back to home
        </Link>
        <GoBackButton />
      </div>

      <nav aria-label="Helpful links" className="relative mt-12">
        <p className="mb-3 text-xs uppercase tracking-wider">Or jump straight to</p>
        <ul className="flex items-center justify-center gap-6">
          {quickLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-semibold text-gray-300 underline-offset-4 transition-colors hover:text-[#008ed6] hover:underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
