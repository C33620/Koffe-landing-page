import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { I18nContext } from "./I18nContext";
import { translations, type Locale } from "./translations";

interface I18nProviderProps {
  children: ReactNode;
}

function getInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return "en";
  }

  const preferredLanguage =
    window.navigator.languages?.[0] || window.navigator.language || "en";

  return preferredLanguage.toLowerCase().startsWith("ja") ? "ja" : "en";
}

export default function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

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
