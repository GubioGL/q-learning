"use client";

import { createContext, useContext } from "react";
import { getDict } from ".";
import { DEFAULT_LOCALE, type Locale } from "./locales";

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export const LocaleProvider = LocaleContext.Provider;
export const useLocale = () => useContext(LocaleContext);
export const useT = () => getDict(useLocale());
