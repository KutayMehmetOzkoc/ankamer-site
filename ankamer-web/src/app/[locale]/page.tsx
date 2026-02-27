import Link from "next/link";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const m = getMessages(locale);

  return (
    <main className="min-h-screen bg-[#fafaf9] text-[#1c1917]">
      <div className="bg-[#1c1917] text-[#a47e3c] text-[10px] py-2 px-10 uppercase tracking-[0.3em] font-bold text-center">
        {m.home.strip}
      </div>
      <section className="px-8 md:px-16 py-12 md:py-24 grid md:grid-cols-2 gap-16 items-center max-w-[1600px] mx-auto">
        <div className="order-2 md:order-1">
          <span className="text-[#a47e3c] text-xs font-bold uppercase tracking-[0.5em] mb-6 block">{m.home.heroLabel}</span>
          <h1 className="text-6xl md:text-[100px] font-serif leading-[0.9] mb-10 tracking-tighter">
            {m.home.heroTitle} <br /> <span className="italic">{m.home.heroTitleItalic}</span>
          </h1>
          <p className="text-stone-500 text-lg md:text-xl max-w-md leading-relaxed mb-12 font-light">
            {m.home.heroDesc}
          </p>
          <div className="flex flex-wrap gap-8">
            <Link href={`/${locale}/urunler`}>
              <button className="bg-[#1c1917] text-white px-12 py-6 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#a47e3c] transition-all duration-500 shadow-2xl">
                {m.home.cta}
              </button>
            </Link>
          </div>
        </div>
        <div className="relative h-[600px] md:h-[800px] overflow-hidden order-1 md:order-2 group">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000"
            alt={m.home.heroImageAlt}
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition duration-[2s]"
          />
          <div className="absolute bottom-10 left-0 bg-white p-10 max-w-[300px] shadow-xl">
            <p className="text-[10px] text-stone-400 uppercase tracking-[0.3em] mb-3 font-bold">{m.home.applicationArea}</p>
            <p className="text-xl font-serif italic text-[#1c1917]">{m.home.applicationExample}</p>
          </div>
        </div>
      </section>
      <section className="bg-[#1c1917] text-white py-32 px-8 md:px-16 mt-20">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-3 gap-24">
          <div className="space-y-6 border-l border-stone-800 pl-8">
            <span className="text-[#a47e3c] font-serif text-4xl italic">01.</span>
            <h3 className="text-xl font-bold uppercase tracking-widest">{m.home.feature1Title}</h3>
            <p className="text-stone-400 font-light leading-relaxed italic">{m.home.feature1Desc}</p>
          </div>
          <div className="space-y-6 border-l border-stone-800 pl-8">
            <span className="text-[#a47e3c] font-serif text-4xl italic">02.</span>
            <h3 className="text-xl font-bold uppercase tracking-widest">{m.home.feature2Title}</h3>
            <p className="text-stone-400 font-light leading-relaxed italic">{m.home.feature2Desc}</p>
          </div>
          <div className="space-y-6 border-l border-stone-800 pl-8">
            <span className="text-[#a47e3c] font-serif text-4xl italic">03.</span>
            <h3 className="text-xl font-bold uppercase tracking-widest">{m.home.feature3Title}</h3>
            <p className="text-stone-400 font-light leading-relaxed italic">{m.home.feature3Desc}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
