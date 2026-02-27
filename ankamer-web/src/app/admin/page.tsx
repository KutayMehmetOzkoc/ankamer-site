"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export type Product = {
  id: string;
  name: string;
  category: string;
  origin: string;
  image: string;
  features: string;
  hardness?: string;
  usageArea?: string;
  createdAt?: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "Granit",
    origin: "",
    image: "",
    features: "",
    hardness: "",
    usageArea: "",
  });
  const [imageUploading, setImageUploading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showNewPanel, setShowNewPanel] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setProducts(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (!supabase) {
        setAuthChecked(true);
        return;
      }
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/admin/login");
        return;
      }
      setAuthChecked(true);
      await fetchProducts();
    };
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { session } } = await supabase?.auth.getSession() ?? { data: { session: null } };
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (session?.access_token) headers["Authorization"] = `Bearer ${session.access_token}`;

      const isEdit = !!editingProduct;
      const url = isEdit ? `/api/products/${editingProduct!.id}` : "/api/products";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        alert(isEdit ? "Ürün güncellendi!" : "Ürün başarıyla eklendi!");
        setFormData({
          name: "",
          category: "Granit",
          origin: "",
          image: "",
          features: "",
          hardness: "",
          usageArea: "",
        });
        setEditingProduct(null);
        setShowNewPanel(false);
        await fetchProducts();
      } else {
        alert(json.error || "Bir hata oluştu.");
      }
    } catch (err) {
      console.error(err);
      alert("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (p: Product) => {
    setShowNewPanel(true);
    setEditingProduct(p);
    setFormData({
      name: p.name,
      category: p.category,
      origin: p.origin ?? "",
      image: p.image ?? "",
      features: p.features ?? "",
      hardness: p.hardness ?? "",
      usageArea: p.usageArea ?? "",
    });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setShowNewPanel(false);
    setFormData({
      name: "",
      category: "Granit",
      origin: "",
      image: "",
      features: "",
      hardness: "",
      usageArea: "",
    });
  };

  const handleToggleNewPanel = () => {
    if (!showNewPanel) {
      setEditingProduct(null);
      setFormData({
        name: "",
        category: "Granit",
        origin: "",
        image: "",
        features: "",
        hardness: "",
        usageArea: "",
      });
    }
    setShowNewPanel((prev) => !prev);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
    setDeletingId(id);
    try {
      const { data: { session } } = await supabase?.auth.getSession() ?? { data: { session: null } };
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (session?.access_token) headers["Authorization"] = `Bearer ${session.access_token}`;

      const res = await fetch(`/api/products/${id}`, { method: "DELETE", headers });
      const json = await res.json();

      if (res.ok && json.success) {
        await fetchProducts();
      } else {
        alert(json.error || "Silme başarısız.");
      }
    } catch (err) {
      console.error(err);
      alert("Bir hata oluştu.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !supabase) return;
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      alert("Sadece JPG, PNG, WebP veya GIF yükleyebilirsiniz.");
      return;
    }
    setImageUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("product-images").upload(path, file, { upsert: false });
      if (error) {
        alert(error.message || "Yükleme başarısız.");
        return;
      }
      const { data: { publicUrl } } = supabase.storage.from("product-images").getPublicUrl(path);
      setFormData((prev) => ({ ...prev, image: publicUrl }));
    } catch (err) {
      console.error(err);
      alert("Görsel yüklenirken hata oluştu.");
    } finally {
      setImageUploading(false);
      e.target.value = "";
    }
  };

  const handleLogout = async () => {
    await supabase?.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  };

  if (!authChecked) {
    return (
      <main className="min-h-screen bg-stone-100 flex items-center justify-center">
        <p className="text-stone-500">Yükleniyor...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-100 p-8 md:p-24">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex items-center justify-between border-b pb-4 border-stone-200 flex-wrap gap-3">
          <h1 className="text-4xl font-serif italic text-stone-800">
            Ankamer | Ürün Paneli
          </h1>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleToggleNewPanel}
              className={`px-4 py-2 text-sm font-medium uppercase tracking-wider transition border ${
                showNewPanel && !editingProduct
                  ? "bg-stone-800 text-white border-stone-800"
                  : "text-stone-600 border-stone-300 hover:bg-stone-100"
              }`}
            >
              Yeni ekle
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="text-sm uppercase tracking-wider text-stone-500 hover:text-amber-700 transition"
            >
              Çıkış
            </button>
          </div>
        </div>

        {/* Mevcut ürünler (Supabase'den) */}
        <section className="bg-white shadow-2xl p-10 rounded-sm">
          <h2 className="text-lg font-bold uppercase tracking-widest text-stone-500 mb-6">
            Supabase'den Gelen Ürünler
          </h2>
          {fetchLoading ? (
            <p className="text-stone-400">Yükleniyor...</p>
          ) : products.length === 0 ? (
            <p className="text-stone-400">
              Henüz ürün yok. Üstteki &quot;Yeni ekle&quot; butonu ile ekleyebilirsiniz.
            </p>
          ) : (
            <ul className="space-y-4">
              {products.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center gap-4 py-3 border-b border-stone-100 last:border-0"
                >
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-stone-800 truncate">{p.name}</p>
                    <p className="text-xs text-stone-400 uppercase tracking-wider">
                      {p.category}
                      {p.origin ? ` · ${p.origin}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleEdit(p)}
                      className="px-4 py-2 text-sm font-medium uppercase tracking-wider text-stone-600 border border-stone-300 hover:bg-stone-100 transition"
                    >
                      Düzenle
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(p.id)}
                      disabled={deletingId === p.id}
                      className="px-4 py-2 text-sm font-medium uppercase tracking-wider text-red-700 border border-red-200 hover:bg-red-50 transition disabled:opacity-50"
                    >
                      {deletingId === p.id ? "..." : "Sil"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Yeni ürün / Düzenleme formu — sadece "Yeni ekle" işaretli veya düzenleme modunda göster */}
        {(showNewPanel || editingProduct) && (
        <div className="bg-white shadow-2xl p-10 rounded-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold uppercase tracking-widest text-stone-500">
              {editingProduct ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
            </h2>
            {editingProduct && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="text-sm uppercase tracking-wider text-stone-500 hover:text-amber-700 transition"
              >
                İptal
              </button>
            )}
          </div>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2 font-bold">
                Ürün Adı
              </label>
              <input
                required
                type="text"
                value={formData.name}
                className="w-full p-4 border border-stone-200 outline-none focus:border-amber-700 transition"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2 font-bold">
                Kategori
              </label>
              <select
                className="w-full p-4 border border-stone-200 outline-none"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="Granit">Granit</option>
                <option value="Çimstone">Çimstone</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2 font-bold">
                Menşei
              </label>
              <input
                type="text"
                value={formData.origin}
                className="w-full p-4 border border-stone-200 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, origin: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2 font-bold">
                Görsel (Supabase Storage veya URL)
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <label className="flex-shrink-0 cursor-pointer border border-stone-300 border-dashed px-4 py-3 text-stone-600 hover:bg-stone-50 transition text-sm uppercase tracking-wider font-medium disabled:opacity-50">
                  {imageUploading ? "Yükleniyor..." : "Dosya seç (JPG, PNG, WebP, GIF)"}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="sr-only"
                    disabled={imageUploading}
                    onChange={handleImageUpload}
                  />
                </label>
                <input
                  type="text"
                  required
                  value={formData.image}
                  className="flex-1 min-w-0 p-4 border border-stone-200 outline-none focus:border-amber-700 transition"
                  placeholder="Veya görsel URL'si yapıştırın"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>
              {formData.image && (
                <img src={formData.image} alt="Önizleme" className="mt-3 h-24 w-24 object-cover rounded border border-stone-200" />
              )}
              <p className="mt-1 text-xs text-stone-400">
                Önce &quot;Dosya seç&quot; ile Supabase Storage'a yükleyin veya doğrudan bir URL girin.
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2 font-bold">
                Özellikler & Detaylar
              </label>
              <textarea
                value={formData.features}
                className="w-full p-4 border border-stone-200 outline-none h-32"
                onChange={(e) =>
                  setFormData({ ...formData, features: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2 font-bold">
                Dayanıklılık (5 üzerinden)
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => {
                  const value = formData.hardness ? parseInt(formData.hardness, 10) : 0;
                  const filled = n <= value;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setFormData({ ...formData, hardness: String(n) })}
                      className="text-2xl leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-1 rounded"
                      aria-label={`${n} yıldız`}
                    >
                      <span className={filled ? "text-amber-600" : "text-stone-300"}>{filled ? "★" : "☆"}</span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-1 text-xs text-stone-400">
                {formData.hardness ? `${formData.hardness} / 5` : "Tıklayarak seçin"}
              </p>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2 font-bold">
                Kullanım Alanı
              </label>
              <input
                type="text"
                value={formData.usageArea}
                className="w-full p-4 border border-stone-200 outline-none focus:border-amber-700 transition"
                placeholder="Örn. Mutfak tezgahı, zemin"
                onChange={(e) =>
                  setFormData({ ...formData, usageArea: e.target.value })
                }
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="md:col-span-2 bg-stone-900 text-white py-5 tracking-[0.3em] font-bold uppercase hover:bg-amber-800 transition duration-500 disabled:bg-stone-400"
            >
              {loading
                ? "Kaydediliyor..."
                : editingProduct
                  ? "Güncelle"
                  : "Supabase'e Gönder"}
            </button>
          </form>
        </div>
        )}
      </div>
    </main>
  );
}
