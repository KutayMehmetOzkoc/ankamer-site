"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function getLocale(pathname: string): string {
  const segment = pathname.split("/")[1];
  if (segment === "tr" || segment === "en") return segment;
  return "tr";
}

export default function SetHtmlLang() {
  const pathname = usePathname();
  const locale = getLocale(pathname);
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);
  return null;
}
