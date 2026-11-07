"use client";

import { useState } from "react";

/** Email signup form that posts to /api/newsletter. */
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });
      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus("success");
        setMessage(result.message ?? "You are subscribed. Thank you!");
        setEmail("");
        return;
      }
      setStatus("error");
      setMessage(result.details?.email ?? result.error ?? "Something went wrong. Please try again.");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md" noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email address"
          autoComplete="email"
          required
          className="min-w-0 flex-1 rounded-xs border border-gray-700/60 bg-[#1b1e26] px-4 py-3 text-sm text-gray-100 placeholder-gray-500 transition-all duration-300 focus:border-[#008ed6] focus:outline-none focus:ring-1 focus:ring-[#008ed6]"
        />

        {/* Honeypot field: invisible to people and screen readers */}
        <input
          type="text"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />

        <button
          type="submit"
          disabled={status === "sending"}
          className="shimmer relative cursor-pointer overflow-hidden rounded-xs bg-[#008ed6] px-6 py-3 text-[13px] font-bold uppercase tracking-wider text-white transition-colors duration-300 hover:bg-[#0077b5] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "sending" ? "Sending..." : "Subscribe"}
        </button>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={`mt-3 min-h-5 text-sm ${status === "success" ? "text-emerald-400" : "text-red-400"}`}
      >
        {message}
      </p>
    </form>
  );
}
