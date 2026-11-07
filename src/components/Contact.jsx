"use client";

import { useEffect, useState } from "react";
import { FaMobileAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { plans } from "@/data/plans";

const MESSAGE_MAX = 2000;

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
  plan: "",
  website: "", // honeypot: hidden from people, bots tend to fill it
};

// Shared field styling; the text colour is added separately because the plan
// <select> changes it depending on whether a plan has been chosen
const baseFieldClass =
  "w-full bg-[#1b1e26] border border-gray-700/60 rounded-xs px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:border-[#008ed6] focus:ring-1 focus:ring-[#008ed6] transition-all duration-300 aria-[invalid=true]:border-red-400";
const inputClass = `${baseFieldClass} text-gray-100`;

const contactInfo = [
  {
    id: "phone",
    Icon: FaMobileAlt,
    lines: [
      { text: "Phone: (415) 124-5678", href: "tel:+14151245678" },
      { text: "Fax: (412) 123-8290" },
    ],
  },
  {
    id: "address",
    Icon: FaMapMarkerAlt,
    lines: [{ text: "1001 Brickell Bay Dr." }, { text: "Suite 1900" }, { text: "Miami, FL 33131" }],
  },
  {
    id: "email",
    Icon: FaEnvelope,
    lines: [{ text: "support@yourname.com", href: "mailto:support@yourname.com" }],
  },
];

export default function Contact() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [feedback, setFeedback] = useState("");

  // The pricing cards announce the chosen plan: pre-fill the plan and subject
  useEffect(() => {
    const onSelectPlan = (event) => {
      const { planId, planName } = event.detail ?? {};
      if (!planId) return;
      setFormData((prev) => ({
        ...prev,
        plan: planId,
        subject: prev.subject || `Order: ${planName} plan`,
      }));
    };
    window.addEventListener("lucid:select-plan", onSelectPlan);
    return () => window.removeEventListener("lucid:select-plan", onSelectPlan);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the field error as soon as the visitor starts fixing it
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setErrors({});
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus("success");
        setFeedback(result.message ?? "Thank you! Your message has been sent.");
        setFormData(initialForm);
        return;
      }

      setErrors(result.details ?? {});
      setFeedback(result.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setFeedback("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  const describedBy = (field) => (errors[field] ? `${field}-error` : undefined);
  const isSending = status === "sending";

  return (
    <section id="contact" className="relative bg-[#f4f5f7] pt-24 sm:pt-28">
      <div className="container relative z-20 mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <Reveal className="mb-16 sm:mb-20">
          <SectionHeading eyebrow="STAY IN TOUCH" title="Contact us" />
        </Reveal>

        {/* Contact details */}
        <div className="mx-auto mb-16 grid max-w-4xl grid-cols-1 gap-8 text-center sm:mb-24 md:grid-cols-3">
          {contactInfo.map(({ id, Icon, lines }, index) => (
            <Reveal key={id} delay={index * 120}>
              <div className="group flex cursor-default flex-col items-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center text-2xl text-[#008ed6] transition-transform duration-300 group-hover:-translate-y-1.5">
                  <Icon aria-hidden="true" className="animate-bob" style={{ animationDelay: `${index * 0.35}s` }} />
                </div>
                {lines.map((line) =>
                  line.href ? (
                    <a
                      key={line.text}
                      href={line.href}
                      className="text-[14px] leading-relaxed text-[#777777] transition-colors hover:text-[#008ed6]"
                    >
                      {line.text}
                    </a>
                  ) : (
                    <p key={line.text} className="text-[14px] leading-relaxed text-[#777777]">
                      {line.text}
                    </p>
                  )
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Floating form card (the animation pauses while hovering or typing) */}
        <div className="animate-floating relative z-30 mx-auto -mb-36 max-w-3xl sm:-mb-44">
          <div className="rounded-sm border border-white/10 bg-[#15171e] p-6 text-white shadow-2xl transition-all duration-300 sm:p-10 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-4" aria-describedby="form-feedback">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="sr-only">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="*Name"
                      autoComplete="name"
                      maxLength={100}
                      required
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={describedBy("name")}
                      className={inputClass}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-xs text-red-400">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="*Email"
                      autoComplete="email"
                      maxLength={254}
                      required
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={describedBy("email")}
                      className={inputClass}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-xs text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="sr-only">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="*Subject"
                      maxLength={150}
                      required
                      aria-invalid={Boolean(errors.subject)}
                      aria-describedby={describedBy("subject")}
                      className={inputClass}
                    />
                    {errors.subject && (
                      <p id="subject-error" className="mt-1 text-xs text-red-400">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-plan" className="sr-only">
                      Plan you are interested in (optional)
                    </label>
                    <select
                      id="contact-plan"
                      name="plan"
                      value={formData.plan}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.plan)}
                      aria-describedby={describedBy("plan")}
                      className={`${baseFieldClass} cursor-pointer ${formData.plan ? "text-gray-100" : "text-gray-400"}`}
                    >
                      {/* Options get their own colours: browsers do not always inherit them */}
                      <option value="" className="bg-[#1b1e26] text-gray-100">
                        Plan (optional)
                      </option>
                      {plans.map((plan) => (
                        <option key={plan.id} value={plan.id} className="bg-[#1b1e26] text-gray-100">
                          {plan.name}
                        </option>
                      ))}
                    </select>
                    {errors.plan && (
                      <p id="plan-error" className="mt-1 text-xs text-red-400">
                        {errors.plan}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex h-full flex-col">
                  <label htmlFor="contact-message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="*Message"
                    rows={5}
                    minLength={10}
                    maxLength={MESSAGE_MAX}
                    required
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={describedBy("message")}
                    className={`${inputClass} min-h-35 flex-1 resize-none md:min-h-full`}
                  />
                  <div className="mt-1 flex items-start justify-between gap-2 text-xs">
                    <span id="message-error" className="text-red-400">
                      {errors.message}
                    </span>
                    <span className="shrink-0 text-gray-500">
                      {formData.message.length}/{MESSAGE_MAX}
                    </span>
                  </div>
                </div>
              </div>

              {/* Honeypot field: invisible to people and screen readers */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0">
                <label htmlFor="contact-website">Leave this field empty</label>
                <input
                  id="contact-website"
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="flex flex-col-reverse items-stretch gap-4 pt-2 md:flex-row md:items-center md:justify-between">
                {/* Result message announced to screen readers */}
                <p
                  id="form-feedback"
                  role="status"
                  aria-live="polite"
                  className={`text-sm ${status === "success" ? "text-emerald-400" : "text-red-400"}`}
                >
                  {feedback}
                </p>

                <button
                  type="submit"
                  disabled={isSending}
                  className="group/btn relative w-full cursor-pointer overflow-hidden rounded-xs bg-[#008ed6] px-10 py-3 text-sm font-semibold tracking-wider text-white shadow-md transition-all duration-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 origin-center scale-x-0 transform bg-[#0074b0] transition-transform duration-300 ease-out group-hover/btn:scale-x-100"
                  />
                  <span className="relative z-10 inline-flex items-center justify-center gap-2">
                    {isSending && (
                      <span
                        aria-hidden="true"
                        className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                      />
                    )}
                    {isSending ? "Sending..." : "Submit"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="relative z-10 h-115 w-full pt-20 sm:h-125">
        <iframe
          title="Google Map showing our location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116923.49397621217!2d90.3443647!3d23.7806365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e1!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "contrast(1.15) saturate(1.15)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
