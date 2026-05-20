import { useI18n } from "../locales/useI18n";

export default function LanguageSwitcher() {
  const { locale, toggleLocale, translations } = useI18n();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="rounded-full border border-[#261D0D]/15 bg-[#FFFCF5]/90 px-3 py-1.5 text-sm text-[#261D0D] shadow-sm backdrop-blur-sm transition-all duration-200"
    >
      {locale === "en"
        ? translations.language_switcher.switch_to_japanese[locale]
        : translations.language_switcher.switch_to_english[locale]}
    </button>
  );
}
