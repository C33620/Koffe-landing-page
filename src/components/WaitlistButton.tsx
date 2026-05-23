import { useI18n } from "../locales/useI18n";

interface WaitlistButtonProps {
  inCoffee: boolean;
  onClick: () => void;
  className?: string;
}

export default function WaitlistButton({
  inCoffee,
  onClick,
  className = "",
}: WaitlistButtonProps) {
  const { locale, translations } = useI18n();

  const backgroundColor = inCoffee ? "#FFFCF5" : "#261D0D";
  const textColor = inCoffee ? "#261D0D" : "#FFFCF5";
  const borderColor = inCoffee
    ? "rgba(255,252,245,0.18)"
    : "rgba(38,29,13,0.18)";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 md:px-5 md:py-2.5 md:text-[0.95rem] ${className}`}
      style={{
        backgroundColor,
        color: textColor,
        borderColor,
      }}
      aria-label={translations.waitlist_button.aria_label[locale]}
    >
      {translations.waitlist_button.label[locale]}
    </button>
  );
}
