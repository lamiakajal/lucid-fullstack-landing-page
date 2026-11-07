import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import PlanOrderLink from "@/components/ui/PlanOrderLink";
import { plans } from "@/data/plans";

export default function Pricing() {
  return (
    <section id="pricing" className="border-b border-[#d1d5db] bg-white py-24 sm:py-28 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Heading Area */}
        <Reveal className="mb-16 sm:mb-20">
          <SectionHeading eyebrow="QUALITY HAS ITS PRICE" title="Pricings & Plans" />
        </Reveal>

        {/* 4 Cards Grid (hover, keyboard focus and touch all lift the card) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {plans.map((plan, index) => (
            <Reveal key={plan.id} delay={index * 110} direction="zoom" className="h-full">
              <div
                className={`group relative flex h-full flex-col justify-between rounded-sm border bg-white text-center transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-[#008ed6] hover:shadow-2xl focus-within:-translate-y-2 focus-within:border-[#008ed6] focus-within:shadow-2xl active:-translate-y-2 active:border-[#008ed6] ${
                  plan.popular ? "animate-glow border-[#008ed6]" : "border-gray-200"
                }`}
              >
                {/* Badge for the recommended plan */}
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-[#008ed6] px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
                    Most popular
                  </span>
                )}

                <div>
                  {/* Plan Header */}
                  <div className="border-b border-gray-100 py-6">
                    <h3 className="text-[17px] font-bold uppercase tracking-wider text-[#1a1a1a] transition-colors duration-300 group-hover:text-[#008ed6] group-focus-within:text-[#008ed6]">
                      {plan.name}
                    </h3>
                  </div>

                  {/* Price Display: blue background expands from the center */}
                  <div className="relative overflow-hidden border-b border-gray-100 bg-[#fafafa]/70 py-8 sm:py-10">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 origin-center scale-x-0 transform bg-[#008ed6] transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-within:scale-x-100 group-active:scale-x-100"
                    />

                    <div className="relative z-10">
                      <div className="flex items-start justify-center text-[#1a1a1a] transition-colors duration-300 group-hover:text-white group-focus-within:text-white group-active:text-white">
                        <span className="mr-0.5 mt-1 text-2xl font-bold">$</span>
                        <span className="text-5xl font-extrabold tracking-tight lg:text-6xl">{plan.price}</span>
                      </div>
                      <p className="mt-2 text-[13px] font-normal text-gray-400 transition-colors duration-300 group-hover:text-white/90 group-focus-within:text-white/90 group-active:text-white/90">
                        {plan.period}
                      </p>
                    </div>
                  </div>

                  {/* Plan Description */}
                  <div className="p-6 sm:p-7">
                    <p className="text-[14px] leading-relaxed text-gray-500">{plan.desc}</p>
                  </div>
                </div>

                {/* Order Button */}
                <div className="p-6 pt-0">
                  <PlanOrderLink planId={plan.id} planName={plan.name} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
