import Image from "next/image";
import { FaTrophy, FaMousePointer, FaBolt, FaTachometerAlt } from "react-icons/fa";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const detailPoints = [
  { id: 1, title: "Awesome Design", Icon: FaTrophy },
  { id: 2, title: "Fully Responsive", Icon: FaMousePointer },
  { id: 3, title: "Retina Ready", Icon: FaBolt },
  { id: 4, title: "Tons Of Features And Easy To Use", Icon: FaTachometerAlt },
];

export default function DeviceShowcase() {
  return (
    <section id="about" className="border-b border-[#d1d5db] bg-white py-24 sm:py-28 lg:py-32">
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 sm:px-6 md:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
        {/* Left Column Content: centered on mobile, left aligned from lg */}
        <Reveal direction="left" className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <SectionHeading
            eyebrow="DIP INTO THE DETAILS"
            title="Beautiful on every device"
            align="left"
            className="mb-8"
          />

          <p className="mx-auto mb-10 max-w-xl text-[17px] leading-[1.75] text-[#777777] sm:text-[18px] lg:mx-0">
            Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum
            velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat
            consequat auctor eu in elit.
          </p>

          {/* Feature list */}
          <ul className="flex flex-col items-start space-y-5">
            {detailPoints.map(({ id, title, Icon }, index) => (
              <li key={id} className="group flex items-center space-x-3.5">
                <span
                  style={{ animationDelay: `${index * 0.4}s` }}
                  className="animate-bob shrink-0 transition-transform duration-300 group-hover:scale-110"
                >
                  <Icon aria-hidden="true" className="h-4 w-4 text-[#008ed6]" />
                </span>
                <span className="text-[16px] font-medium text-[#222222] transition-colors duration-200 group-hover:text-[#008ed6] sm:text-[17px]">
                  {title}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Right Column Showcase */}
        <Reveal direction="right" className="relative mt-4 flex items-center justify-center lg:mt-0 lg:justify-end">
          <Image
            src="/assets/lucid.webp"
            alt="Lucid devices showcase"
            width={510}
            height={621}
            sizes="(min-width: 1024px) 576px, (min-width: 640px) 448px, 90vw"
            className="animate-float h-auto w-full max-w-md object-contain drop-shadow-2xl lg:max-w-xl"
          />
        </Reveal>
      </div>
    </section>
  );
}
