"use client";

import { useState } from "react";
import { useLocale } from "@/context/LocaleContext";

export default function ContactPage() {
  const { locale, t } = useLocale();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSent(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setSent(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        alert(json.error || t("contact.errorSend"));
      }
    } catch {
      alert(t("contact.errorConnection"));
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#1c1917]">
      <section className="px-8 md:px-16 py-24 bg-stone-50 border-b border-stone-100">
        <div className="max-w-[1600px] mx-auto">
          <span className="text-[#a47e3c] text-xs font-bold uppercase tracking-[0.5em] mb-6 block">{t("contact.label")}</span>
          <h1 className="text-5xl md:text-8xl font-serif leading-tight">
            {t("contact.title")} <br /> <span className="italic text-stone-400">{t("contact.titleItalic")}</span>
          </h1>
        </div>
      </section>
      <section className="px-8 md:px-16 py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          <div>
            <h2 className="text-2xl font-serif italic border-l-4 border-[#a47e3c] pl-6 mb-10">
              {t("contact.formIntro")}
            </h2>
            {sent ? (
              <div className="bg-stone-50 p-10 border border-stone-100">
                <p className="text-[#a47e3c] font-semibold uppercase tracking-wider mb-2">{t("contact.successTitle")}</p>
                <p className="text-stone-600 font-light">{t("contact.successDesc")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400 mb-2">
                    {t("contact.name")}
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    className="w-full p-4 border border-stone-200 outline-none focus:border-[#a47e3c] transition text-[#1c1917]"
                    placeholder={t("contact.namePlaceholder")}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400 mb-2">
                    {t("contact.email")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    className="w-full p-4 border border-stone-200 outline-none focus:border-[#a47e3c] transition text-[#1c1917]"
                    placeholder={t("contact.emailPlaceholder")}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400 mb-2">
                    {t("contact.phone")}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    className="w-full p-4 border border-stone-200 outline-none focus:border-[#a47e3c] transition text-[#1c1917]"
                    placeholder={t("contact.phonePlaceholder")}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400 mb-2">
                    {t("contact.message")}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    className="w-full p-4 border border-stone-200 outline-none focus:border-[#a47e3c] transition resize-none text-[#1c1917]"
                    placeholder={t("contact.messagePlaceholder")}
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="bg-[#1c1917] text-white px-12 py-5 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#a47e3c] transition-all duration-300 disabled:opacity-60"
                >
                  {sending ? t("contact.sending") : t("contact.submit")}
                </button>
              </form>
            )}
          </div>
          <div className="space-y-12">
            <div className="relative">
              <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-sm border border-stone-200">
                {/* Kırmızı pin için konum enlem,boylam ile verildi. Kendi işaretinizi kullanmak için Google Maps'te sağ tık → koordinatlar → buradaki sayıyı güncelleyin. */}
                <iframe
                  title={t("contact.address")}
                  src="https://www.google.com/maps?q=40.01478097753806,32.74021669676055&z=17&output=embed"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#a47e3c] p-10 hidden md:block max-w-[280px]">
                <p className="text-white text-[10px] font-bold tracking-widest uppercase mb-1">{t("contact.address")}</p>
                <p className="text-white font-serif italic leading-snug text-sm">{t("contact.addressShort")}</p>
              </div>
            </div>
            <div className="bg-stone-50 p-10 space-y-8">
              <h3 className="font-bold uppercase tracking-widest text-xs text-stone-500">{t("contact.contactInfo")}</h3>
              <ul className="space-y-6 text-stone-600 font-light">
                <li>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400 block mb-1">{t("contact.address")}</span>
                  {t("contact.addressValue")}
                </li>
                <li>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400 block mb-1">{t("contact.phone")}</span>
                  <a href="tel:+905xxxxxxxxx" className="hover:text-[#a47e3c] transition">+90 (5xx) xxx xx xx</a>
                </li>
                <li>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400 block mb-1">{t("contact.email")}</span>
                  <a href="mailto:info@ankamergranit.com" className="hover:text-[#a47e3c] transition">info@ankamergranit.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#1c1917] text-white py-24 px-8 md:px-16">
        <div className="max-w-[1600px] mx-auto text-center">
          <p className="text-[#a47e3c] text-xs font-bold uppercase tracking-[0.5em] mb-4">{t("contact.ctaLabel")}</p>
          <p className="text-2xl md:text-3xl font-serif italic text-stone-300 max-w-2xl mx-auto">
            {t("contact.ctaText")}
          </p>
        </div>
      </section>
    </main>
  );
}
