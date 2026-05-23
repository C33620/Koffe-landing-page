import { useI18n } from "../locales/useI18n";
import WaitlistButton from "./WaitlistButton";

interface HeroProps {
  isFixed?: boolean;
  buttonInCoffee?: boolean;
  onWaitlistClick: () => void;
}

export default function Hero({
  isFixed = false,
  buttonInCoffee = false,
  onWaitlistClick,
}: HeroProps) {
  const { locale, translations } = useI18n();

  return (
    <section
      className="flex min-h-screen flex-col items-center justify-center px-6 py-20 pt-50 md:pt-24 [@media(max-width:530px)_and_(max-height:760px)]:pt-28"
      style={{
        position: isFixed ? "fixed" : "relative",
        top: isFixed ? 0 : "auto",
        left: isFixed ? 0 : "auto",
        right: isFixed ? 0 : "auto",
        zIndex: isFixed ? 25 : "auto",
        backgroundColor: isFixed ? "transparent" : "#FFFCF5",
        opacity: 1,
        willChange: "transform",
        transition: "background-color 300ms ease-out",
      }}
    >
      <div className="mx-auto max-w-4xl space-y-5 text-center">
        <h1
          className="text-left text-4xl leading-tight tracking-tight md:text-6xl lg:text-7xl"
          style={{
            color: "#261D0D",
            willChange: "color",
          }}
        >
          {translations.hero.title_line_1[locale]}
          <br />
          {translations.hero.title_line_2[locale]}
        </h1>

        <p
          className="mx-auto max-w-5xl text-left text-lg leading-relaxed md:text-xl lg:text-2xl"
          style={{
            color: "rgba(38, 29, 13, 0.7)",
            willChange: "color",
          }}
        >
          {translations.hero.body_line_1[locale]}
          <br />
          {translations.hero.body_line_2[locale]}
          <br />
          {translations.hero.body_line_3[locale]}
        </p>

        <div className="flex justify-center pt-6 md:pt-8">
          <WaitlistButton
            inCoffee={buttonInCoffee}
            onClick={onWaitlistClick}
            className="min-w-65 px-8 py-4 text-base md:min-w-[320px] md:px-10 md:py-5 md:text-lg lg:min-w-90 lg:px-12 lg:py-5 lg:text-xl"
          />
        </div>

        <div className="h-10 md:h-14" />
      </div>
    </section>
  );
}
