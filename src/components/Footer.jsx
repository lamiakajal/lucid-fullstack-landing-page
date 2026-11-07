import {
  FaBehance,
  FaDribbble,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import NewsletterForm from "@/components/ui/NewsletterForm";

// Icon-only links need an accessible name, so every entry has a label
const socialLinks = [
  { id: "behance", label: "Behance", Icon: FaBehance, href: "https://behance.net" },
  { id: "dribbble", label: "Dribbble", Icon: FaDribbble, href: "https://dribbble.com" },
  { id: "twitter", label: "Twitter", Icon: FaTwitter, href: "https://twitter.com" },
  { id: "facebook", label: "Facebook", Icon: FaFacebookF, href: "https://facebook.com" },
  { id: "linkedin", label: "LinkedIn", Icon: FaLinkedinIn, href: "https://linkedin.com" },
  { id: "github", label: "GitHub", Icon: FaGithub, href: "https://github.com/lamiakajal" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#15171e] py-14">
      <div className="container mx-auto px-4 text-center">
        {/* Newsletter signup */}
        <h2 className="mb-2 text-xl font-bold text-white sm:text-2xl">Stay up to date</h2>
        <p className="mx-auto mb-6 max-w-md text-sm">Get news about new features and releases straight to your inbox.</p>
        <NewsletterForm />

        {/* Social icons */}
        <div className="mb-5 mt-10 flex items-center justify-center gap-6">
          {socialLinks.map(({ id, label, Icon, href }, index) => (
            <a
              key={id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-block text-lg text-[#999999] transition-colors duration-300 hover:text-[#008ed6] focus-visible:text-[#008ed6] sm:text-xl"
            >
              <Icon aria-hidden="true" className="animate-bob" style={{ animationDelay: `${index * 0.25}s` }} />
            </a>
          ))}
        </div>

        {/* Copyright text */}
        <p className="text-xs font-normal tracking-wide text-[#666666] sm:text-[13px]">
          copyright &copy; {new Date().getFullYear()} Design By{" "}
          <a
            href="https://github.com/lamiakajal"
            target="_blank"
            rel="author noopener noreferrer"
            className="font-semibold uppercase transition-colors hover:text-[#008ed6]"
          >
            Lamia Kajal
          </a>
        </p>
      </div>
    </footer>
  );
}
