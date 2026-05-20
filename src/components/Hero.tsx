import { useI18n } from "../locales/useI18n";

interface HeroProps {
  isFixed?: boolean;
  buttonInCoffee?: boolean;
}

export default function Hero({ isFixed = false }: HeroProps) {
  const { locale, translations } = useI18n();

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 pt-50 md:pt-24 [@media(max-width:530px)_and_(max-height:760px)]:pt-28"
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
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <h1
          className="text-4xl md:text-6xl lg:text-7xl tracking-tight leading-tight text-left "
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
          className="text-lg md:text-xl lg:text-2xl max-w-5xl mx-auto leading-relaxed text-left "
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

        <div className="pt-6 h-20"></div>
      </div>
    </section>
  );
}
