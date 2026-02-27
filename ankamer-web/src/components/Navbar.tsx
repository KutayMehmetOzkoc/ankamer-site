"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/context/LocaleContext";
import { locales, type Locale } from "@/lib/i18n";

export default function Navbar() {
  const { locale, t } = useLocale();
  const pathname = usePathname();

  // Admin sayfasındaysak navbar gösterme (admin kendi navbar'ına sahip)
  if (pathname.startsWith("/admin")) return null;

  const basePath = pathname.replace(/^\/(tr|en)/, "") || "/";
  const currentPath = basePath === "/" ? "" : basePath;

  return (
    <nav className="flex items-center justify-between px-8 md:px-16 py-10 sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-stone-100">
      <Link href={`/${locale}`} className="cursor-pointer">
        <div className="text-2xl font-light tracking-[0.4em]">
          ANKAMER<span className="font-extrabold text-[#a47e3c]">GRANİT</span>
        </div>
      </Link>
      <div className="flex items-center gap-8">
        <div className="hidden md:flex space-x-12 text-[11px] uppercase tracking-[0.2em] font-bold">
          {currentPath !== "" && (
            <Link href={`/${locale}`} className="hover:text-[#a47e3c] transition duration-300">
              {t("common.nav.home")}
            </Link>
          )}
          {currentPath !== "/urunler" && (
            <Link href={`/${locale}/urunler`} className="hover:text-[#a47e3c] transition duration-300">
              {t("common.nav.collection")}
            </Link>
          )}
          {currentPath !== "/hakkimizda" && (
            <Link href={`/${locale}/hakkimizda`} className="hover:text-[#a47e3c] transition duration-300">
              {t("common.nav.about")}
            </Link>
          )}
          {currentPath !== "/iletisim" && (
            <Link href={`/${locale}/iletisim`} className="hover:text-[#a47e3c] transition duration-300">
              {t("common.nav.contact")}
            </Link>
          )}
        </div>
        <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-stone-500">
          {locales.map((loc) => (
            <span key={loc}>
              <Link
                href={`/${loc}${currentPath}`}
                className={loc === locale ? "text-[#a47e3c]" : "hover:text-[#a47e3c] transition"}
              >
                {loc.toUpperCase()}
              </Link>
              {loc !== locales[locales.length - 1] && <span className="mx-1">|</span>}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
}
