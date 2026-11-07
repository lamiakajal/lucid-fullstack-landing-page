import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Customization() {
  return (
    <section
      id="customization"
      className="overflow-hidden border-b border-[#d1d5db] bg-[#f4f4f4] py-24 sm:py-28 lg:py-32"
    >
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 sm:px-6 md:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
        {/* Left Column Content */}
        <Reveal direction="left" className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <SectionHeading
            eyebrow="DIP INTO THE DETAILS"
            title="Super easy to customize"
            align="left"
            className="mb-8"
          />

          <p className="mx-auto max-w-xl text-[17px] leading-[1.8] text-[#777777] sm:text-[18px] lg:mx-0">
            Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum
            velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat
            consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos.
          </p>
        </Reveal>

        {/* Right Column Showcase */}
        <Reveal direction="right" className="relative mt-4 flex items-center justify-center lg:mt-0 lg:justify-end">
          <Image
            src="/assets/lucid2.webp"
            alt="Lucid customization showcase"
            width={718}
            height={491}
            sizes="(min-width: 1024px) 576px, (min-width: 640px) 448px, 90vw"
            className="animate-float-tilt h-auto w-full max-w-md object-contain drop-shadow-2xl lg:max-w-xl"
          />
        </Reveal>
      </div>
    </section>
  );
}
