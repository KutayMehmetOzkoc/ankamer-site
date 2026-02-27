"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/context/LocaleContext";

type UrunItem = {
  id: string;
  ad: string;
  category: string;
  origin: string;
  img: string;
  ozellikler: string;
  sertlik: string;
  kullanim: string;
};

export default function CollectionPage() {
  const { t } = useLocale();
  const [seciliUrun, setSeciliUrun] = useState<UrunItem | null>(null);
  const [products, setProducts] = useState<UrunItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setProducts(
            json.data.map((p: { id: string; name: string; category?: string; origin: string; image: string; features: string; hardness?: string; usageArea?: string }) => ({
              id: p.id,
              ad: p.name,
              category: p.category ?? "Granit",
              origin: p.origin ?? "",
              img: p.image ?? "",
              ozellikler: p.features ?? "",
              sertlik: p.hardness ?? "—",
              kullanim: p.usageArea ?? "—",
            }))
          );
        }
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const granitler = products.filter((p) => p.category === "Granit");
  const cimstone = products.filter((p) => p.category === "Çimstone");

  return (
    <main className="min-h-screen bg-white text-[#1c1917]">
      <section className="px-8 md:px-16 py-20 bg-stone-50">
        <div className="max-w-[1600px] mx-auto">
          <span className="text-[#a47e3c] text-xs font-bold uppercase tracking-[0.5em] mb-4 block">{t("collection.label")}</span>
          <h1 className="text-5xl md:text-7xl font-serif">{t("collection.title")} <span className="italic text-stone-400">{t("collection.titleItalic")}</span></h1>
        </div>
      </section>
      <section className="px-8 md:px-16 py-12 max-w-[1600px] mx-auto space-y-20">
        {loading ? (
          <p className="text-stone-400 text-center py-12">{t("common.loading")}</p>
        ) : (
          <>
            {/* Granit */}
            <div id="granit">
              <h2 className="text-2xl md:text-3xl font-serif italic text-stone-800 border-b border-stone-200 pb-4 mb-8">
                {t("collection.granitTitle")}
              </h2>
              {granitler.length === 0 ? (
                <p className="text-stone-400 py-8">{t("collection.noProductsInSection")}</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {granitler.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      className="group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a47e3c] focus-visible:ring-offset-2 rounded-sm overflow-hidden"
                      onClick={() => setSeciliUrun(item)}
                    >
                      <div className="relative h-[200px] sm:h-[220px] overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-300">
                        <span className="absolute top-0 left-0 right-0 z-10 bg-[#1c1917]/80 text-white text-sm font-medium px-3 py-2 truncate font-serif italic">
                          {item.ad}
                        </span>
                        <img
                          src={item.img}
                          alt={item.ad}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Çimstone */}
            <div id="cimstone">
              <h2 className="text-2xl md:text-3xl font-serif italic text-stone-800 border-b border-stone-200 pb-4 mb-8">
                {t("collection.cimstoneTitle")}
              </h2>
              {cimstone.length === 0 ? (
                <p className="text-stone-400 py-8">{t("collection.noProductsInSection")}</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {cimstone.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      className="group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a47e3c] focus-visible:ring-offset-2 rounded-sm overflow-hidden"
                      onClick={() => setSeciliUrun(item)}
                    >
                      <div className="relative h-[200px] sm:h-[220px] overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-300">
                        <span className="absolute top-0 left-0 right-0 z-10 bg-[#1c1917]/80 text-white text-sm font-medium px-3 py-2 truncate font-serif italic">
                          {item.ad}
                        </span>
                        <img
                          src={item.img}
                          alt={item.ad}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </section>
      {seciliUrun && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-[#1c1917]/95" onClick={() => setSeciliUrun(null)} />
          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto grid md:grid-cols-2 shadow-2xl">
            <button
              className="absolute top-5 right-5 text-2xl z-20 hover:text-[#a47e3c] transition"
              onClick={() => setSeciliUrun(null)}
            >✕</button>
            <div className="h-[400px] md:h-full overflow-hidden">
              <img src={seciliUrun.img} alt={seciliUrun.ad} className="w-full h-full object-cover" />
            </div>
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <span className="text-[#a47e3c] text-xs font-bold uppercase tracking-[0.4em] mb-4">{seciliUrun.origin}</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 italic">{seciliUrun.ad}</h2>
              <p className="text-stone-500 font-light leading-relaxed mb-10">{seciliUrun.ozellikler}</p>
              <div className="space-y-6 border-t border-stone-100 pt-8">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400">{t("collection.hardness")}</span>
                  {(() => {
                    const n = parseInt(seciliUrun.sertlik, 10);
                    if (Number.isNaN(n) || n < 1 || n > 5) {
                      return <span className="text-sm font-bold">{seciliUrun.sertlik || "—"}</span>;
                    }
                    return (
                      <span className="flex gap-0.5" aria-label={`${n} / 5`}>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <span key={i} className={i <= n ? "text-amber-500" : "text-stone-300"}>{i <= n ? "★" : "☆"}</span>
                        ))}
                        <span className="text-stone-400 text-sm ml-1">({n}/5)</span>
                      </span>
                    );
                  })()}
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400">{t("collection.applicationArea")}</span>
                  <span className="text-sm font-bold">{seciliUrun.kullanim}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
