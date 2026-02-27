import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const m = getMessages(locale);

  return (
    <main className="min-h-screen bg-white text-[#1c1917]">
      <section className="px-8 md:px-16 py-24 bg-stone-50 border-b border-stone-100">
        <div className="max-w-[1600px] mx-auto">
          <span className="text-[#a47e3c] text-xs font-bold uppercase tracking-[0.5em] mb-6 block">{m.about.label}</span>
          <h1 className="text-5xl md:text-8xl font-serif leading-tight">
            {m.about.title} <br /> <span className="italic text-stone-400">{m.about.titleItalic}</span>
          </h1>
        </div>
      </section>
      <section className="px-8 md:px-16 py-32 max-w-[1600px] mx-auto grid md:grid-cols-2 gap-24 items-start">
        <div className="relative">
          <div className="relative h-[700px] w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070"
              alt={m.about.imageAlt}
              className="w-full h-full object-cover grayscale-[20%]"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 bg-[#a47e3c] p-12 hidden lg:block">
            <p className="text-white text-sm font-bold tracking-widest uppercase mb-2">{m.about.founded}</p>
            <p className="text-white text-4xl font-serif italic">{m.about.foundedPlace}</p>
          </div>
        </div>
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-serif italic border-l-4 border-[#a47e3c] pl-6">{m.about.subtitle}</h2>
            <p className="text-stone-500 leading-relaxed font-light text-lg">
              <strong>ANKAMER Granit Mermer</strong>, {m.about.para1}
            </p>
            <p className="text-stone-500 leading-relaxed font-light">
              {m.about.para2}
            </p>
          </div>
          <div className="bg-stone-50 p-10 space-y-6">
            <h3 className="font-bold uppercase tracking-widest text-xs">{m.about.techTitle}</h3>
            <p className="text-stone-600 font-light leading-relaxed italic">&quot;{m.about.techQuote}&quot;</p>
          </div>
          <div className="space-y-6 pt-4">
            <p className="text-stone-500 leading-relaxed font-light">
              {m.about.para3}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12 border-t border-stone-100 pt-12">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] font-bold text-stone-400 mb-2">{m.about.globalAccess}</p>
              <p className="text-lg font-serif italic">{m.about.globalCountries}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] font-bold text-stone-400 mb-2">{m.about.technology}</p>
              <p className="text-lg font-serif italic">{m.about.techValue}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#1c1917] text-white py-32 px-8 md:px-16">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-32">
          <div className="space-y-8">
            <h3 className="text-[#a47e3c] text-xs font-bold uppercase tracking-[0.5em]">{m.about.missionTitle}</h3>
            <p className="text-2xl font-serif leading-relaxed italic text-stone-300">
              &quot;{m.about.missionText}&quot;
            </p>
          </div>
          <div className="space-y-8">
            <h3 className="text-[#a47e3c] text-xs font-bold uppercase tracking-[0.5em]">{m.about.visionTitle}</h3>
            <p className="text-stone-400 font-light leading-relaxed italic">
              {m.about.visionText}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
