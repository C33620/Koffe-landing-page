import { useI18n } from "../locales/useI18n";

export default function WhoIsItFor() {
  const { locale, translations } = useI18n();

  const audiences = [
    {
      tag: translations.who_is_it_for.locals_tag[locale],
      tagline: translations.who_is_it_for.locals_tagline[locale],
      feels: [
        translations.who_is_it_for.locals_feel_1[locale],
        translations.who_is_it_for.locals_feel_2[locale],
        translations.who_is_it_for.locals_feel_3[locale],
      ],
    },
    {
      tag: translations.who_is_it_for.explorers_tag[locale],
      tagline: translations.who_is_it_for.explorers_tagline[locale],
      feels: [
        translations.who_is_it_for.explorers_feel_1[locale],
        translations.who_is_it_for.explorers_feel_2[locale],
        translations.who_is_it_for.explorers_feel_3[locale],
      ],
    },
  ];

  return (
    <section className="py-24 px-6 ">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl text-[#FFFCF5] text-center mb-16 leading-snug">
          {translations.who_is_it_for.title_prefix[locale]}{" "}
          <span className="text-[#FFFCF5]/50">
            {translations.who_is_it_for.title_highlight[locale]}
          </span>
        </h2>

        {/* Cards — side by side on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {audiences.map((audience) => (
            <div
              key={audience.tag}
              className="flex flex-col gap-6 rounded-2xl p-8 md:p-10"
              style={{
                backgroundColor: "rgba(248, 223, 164, 0.05)",
                //  rgba(255, 252, 245, 0.05)
                border: "2px solid border-[#dec84b59]/70",
              }}
            >
              {/* Tag */}
              <span
                className="self-start text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{
                  backgroundColor: "rgba(248, 223, 245, 0.08)",
                  color: "rgba(246, 204, 44, 0.8)",
                  border: "rgba(255, 252, 245, 0.2) solid 2px",
                  // rgba(255, 252, 245, 0.5)
                }}
              >
                {audience.tag}
              </span>

              {/* Tagline */}
              <p className="text-xl text-[#FFFCF5] font-medium leading-snug">
                {audience.tagline}
              </p>

              {/* Divider */}
              <div
                className="w-full h-px"
                style={{ backgroundColor: "rgba(255, 252, 245, 0.08)" }}
              />

              {/* How it feels */}
              <div className="flex flex-col gap-4">
                <span className="text-xs uppercase tracking-widest font-semibold  text-[#FFFCF5]/60">
                  {translations.who_is_it_for.how_it_feels_label[locale]}
                </span>
                <ul className="flex flex-col gap-3">
                  {audience.feels.map((feel, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-lg md:text-base leading-relaxed  text-[#FFFCF5]/80"
                    >
                      {/* Small dot marker */}
                      <span
                        className="mt-2 w-1 h-1 rounded-full shrink-0"
                        style={{ backgroundColor: "rgba(255, 252, 245, 0.3)" }}
                      />
                      {feel}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
