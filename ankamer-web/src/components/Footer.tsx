"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";

export default function Footer() {
  const { locale, t } = useLocale();

  return (
    <footer className="bg-white border-t border-stone-100 pt-24 pb-12 px-8 md:px-16 mt-auto">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-1">
            <div className="text-xl tracking-[0.4em] font-light mb-6 uppercase">
              ANKAMER <span className="font-bold text-[#a47e3c]">GRANİT</span>
            </div>
            <p className="text-stone-400 text-sm font-light leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] mb-8 text-[#1c1917]">{t("footer.quickMenu")}</h4>
            <ul className="space-y-4 text-sm font-light text-stone-500">
              <li><Link href={`/${locale}/urunler`} className="hover:text-[#a47e3c] transition">{t("common.nav.collection")}</Link></li>
              <li><Link href={`/${locale}/hakkimizda`} className="hover:text-[#a47e3c] transition">{t("common.nav.about")}</Link></li>
              <li><Link href={`/${locale}/iletisim`} className="hover:text-[#a47e3c] transition">{t("common.nav.contact")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] mb-8 text-[#1c1917]">{t("footer.collections")}</h4>
            <ul className="space-y-4 text-sm font-light text-stone-500 italic">
              <li><Link href={`/${locale}/urunler#granit`} className="hover:text-[#a47e3c] transition">{t("collection.granitTitle")}</Link></li>
              <li><Link href={`/${locale}/urunler#cimstone`} className="hover:text-[#a47e3c] transition">{t("collection.cimstoneTitle")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] mb-8 text-[#1c1917]">{t("footer.contact")}</h4>
            <ul className="space-y-4 text-sm font-light text-stone-500">
              <li>{t("footer.address")}</li>
              <li>+90 (5xx) xxx xx xx</li>
              <li><a href="mailto:info@ankamergranit.com" className="hover:text-[#a47e3c] transition">info@ankamergranit.com</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-50 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-stone-400 uppercase tracking-widest">
            {t("footer.copyright")}
          </p>
          <div className="flex space-x-8">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[10px] text-stone-400 uppercase tracking-widest hover:text-[#a47e3c] transition">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[10px] text-stone-400 uppercase tracking-widest hover:text-[#a47e3c] transition">Facebook</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[10px] text-stone-400 uppercase tracking-widest hover:text-[#a47e3c] transition">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
