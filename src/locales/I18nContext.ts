import { createContext } from "react";
import { translations, type Locale } from "./translations";

export type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  translations: typeof translations;
};

export const I18nContext = createContext<I18nContextValue | null>(null);
