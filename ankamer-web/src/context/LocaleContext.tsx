"use client";

import { createContext, useContext, useMemo } from "react";
import { usePathname } from "next/navigation";
import { getT, type Locale, defaultLocale, locales } from "@/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/")[1];
  if (segment && locales.includes(segment as Locale)) return segment as Locale;
  return defaultLocale;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const value = useMemo(() => {
    const locale = getLocaleFromPathname(pathname);
    return { locale, t: getT(locale) };
  }, [pathname]);
  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  const pathname = usePathname();
  const locale = ctx?.locale ?? getLocaleFromPathname(pathname);
  const t = ctx?.t ?? getT(locale);
  return { locale, t };
}
