import { en } from "./en";
import { es } from "./es";
import type { Locale } from "./locales";
import { pt, type Dict } from "./pt";

const DICTS: Record<Locale, Dict> = { pt, en, es };

export const getDict = (locale: Locale): Dict => DICTS[locale];
