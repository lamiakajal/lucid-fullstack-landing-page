import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#15171e] px-6 text-center">
      <p className="animate-float text-8xl font-black text-[#008ed6] sm:text-9xl">404</p>
      <h1 className="mt-6 text-2xl font-bold text-white sm:text-3xl">This page could not be found</h1>
      <p className="mt-3 max-w-md">The page you are looking for may have been moved or no longer exists.</p>
      <Link
        href="/"
        className="mt-8 rounded-[3px] bg-[#008ed6] px-7 py-3 text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#0077b5]"
      >
        Back to home
      </Link>
    </main>
  );
}
