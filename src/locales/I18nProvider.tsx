import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { I18nContext } from "./I18nContext";
import { translations, type Locale } from "./translations";

interface I18nProviderProps {
  children: ReactNode;
}

export default function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>("en");

  function toggleLocale() {
    setLocale((prev) => (prev === "en" ? "ja" : "en"));
  }

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      translations,
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
