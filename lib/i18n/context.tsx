"use client";

import { createContext, useContext } from "react";
import { getDict } from ".";
import { DEFAULT_LOCALE, type Locale } from "./locales";

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function LocaleProvider({ value, children }: { value: Locale; children: React.ReactNode }) {
    return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export const useLocale = () => useContext(LocaleContext);
export const useT = () => getDict(useLocale());
