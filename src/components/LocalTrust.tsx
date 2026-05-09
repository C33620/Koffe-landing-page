import image1 from "../assets/cafe 1 ukyoe.png";
import image2 from "../assets/photo cafe 2.png";
import image3 from "../assets/photo cafe 3.png";

const photos = [
  {
    src: image1,
    alt: "Street corner café in Kyoto with people sitting outside",
    caption: "The area you choose, not just a pin on a map.",
    place: "Weekenders Coffee, Kyoto",
    headline: "Meet in a place you already trust",
    subheadline: "Start in a familiar public setting.",
  },
  {
    src: image2,
    alt: "Minimal Kyoto café interior with a long counter and stools",
    caption: "A real café, not a random meeting spot.",
    place: "Ogawa Coffee, Kyoto",
    headline: "Connect through the city",
    subheadline:
      "Let Kyoto connect you to people through trusted, meaningful moments.",
  },
  {
    src: image3,
    alt: "Small Kyoto coffee stand nestled in a quiet courtyard",
    caption: "Shared interests, grounded in an actual neighborhood.",
    place: "Koffee Kiyomizu, Kyoto",
    headline: "Explore Kyoto's neighborhoods",
    subheadline: "See Kyoto through locals neighborhoods.",
  },
];

export default function LocalTrust() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Title full width */}
        <h2 className="text-3xl md:text-4xl text-[#FFFCF5] leading-snug text-center mb-16">
          Shared interests,{" "}
          <span className="text-[#FFFCF5]/50">
            grounded in an actual neighborhood
          </span>
        </h2>

        {/* Two-column layout below title */}
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] justify-center gap-8 md:gap-6  lg:px-8   ">
          {/* Left: bullet list */}
          <div className="space-y-6">
            <ul className="space-y-4 text-sm md:text-base text-[#FFFCF5]/75 leading-relaxed">
              {photos.map((photo) => (
                <li key={photo.place} className="flex items-start gap-3">
                  {/* Bullet */}
                  <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#FFFCF5]/50" />

                  {/* Text block — wraps aligned with its own start edge */}
                  <div>
                    <span className="font-medium text-[#FFFCF5] text-lg lg:text-xl block">
                      {photo.headline}
                    </span>
                    <span className="block text-[#FFFCF5]/70">
                      {photo.subheadline}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Right: bento image grid */}
          <div
            className="grid grid-cols-2 gap-3 w-full"
            style={{ gridTemplateRows: "auto auto" }}
          >
            {/* First image — spans full width on mobile, left column tall on desktop */}
            <figure
              className="
                col-span-1 row-span-2 md:col-span-1
                md:row-span-2
                flex flex-col gap-2
                md:h-full
              "
            >
              <div
                className="
                  overflow-hidden rounded-2xl border border-[#f6cc2ccc]/30 p-1 md:p-2 bg-[#f8dfa40d]
                  h-full
                "
                style={{ boxShadow: "0 18px 40px rgba(0,0,0,0.35)" }}
              >
                <img
                  src={photos[0].src}
                  alt={photos[0].alt}
                  className="w-full h-full p-1  rounded-xl object-contain  "
                  loading="lazy"
                />
              </div>
              <figcaption className="text-xs md:text-sm text-[#FFFCF5]/60 italic">
                {photos[0].place}
              </figcaption>
            </figure>

            {/* Second image */}
            <figure className="col-span-1 flex flex-col gap-2">
              <div
                className="overflow-hidden rounded-2xl border border-[#f6cc2ccc]/30 p-1 md:p-2 bg-[#f8dfa40d]"
                style={{ boxShadow: "0 14px 30px rgba(0,0,0,0.3)" }}
              >
                <img
                  src={photos[1].src}
                  alt={photos[1].alt}
                  className="w-full h-auto rounded-xl p-1 object-contain "
                  loading="lazy"
                />
              </div>
              <figcaption className="text-xs md:text-sm text-[#FFFCF5]/60 italic">
                {photos[1].place}
              </figcaption>
            </figure>

            {/* Third image */}
            <figure className="col-span-1 flex flex-col gap-2">
              <div
                className="overflow-hidden rounded-2xl border border-[#f6cc2ccc]/30 p-1 md:p-2 bg-[#f8dfa40d]"
                style={{ boxShadow: "0 14px 30px rgba(0,0,0,0.3)" }}
              >
                <img
                  src={photos[2].src}
                  alt={photos[2].alt}
                  className="w-full h-auto rounded-xl p-1 object-contain"
                  loading="lazy"
                />
              </div>
              <figcaption className="text-xs md:text-sm text-[#FFFCF5]/60 italic">
                {photos[2].place}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
