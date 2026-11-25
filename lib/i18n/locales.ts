export const LOCALES = ["pt", "en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "pt";

export const LOCALE_NAMES: Record<Locale, string> = { pt: "Português", en: "English", es: "Español" };
export const HTML_LANG: Record<Locale, string> = { pt: "pt-BR", en: "en", es: "es" };

export const isLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value);
