"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!supabase) {
      setError("Supabase yapılandırılmamış.");
      setLoading(false);
      return;
    }

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message === "Invalid login credentials" ? "E-posta veya şifre hatalı." : signInError.message);
        setLoading(false);
        return;
      }

      if (data.session) {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("Giriş yapılırken bir hata oluştu.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-stone-100 flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-white shadow-2xl p-10 rounded-sm">
        <h1 className="text-2xl font-serif italic text-stone-800 border-b border-stone-200 pb-4 mb-8">
          Ankamer | Admin Girişi
        </h1>
        <p className="text-sm text-stone-500 mb-6">
          Supabase Auth ile giriş yapın. Admin kullanıcısını Supabase Dashboard → Authentication → Users üzerinden oluşturabilirsiniz.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2 font-bold">
              E-posta
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border border-stone-200 outline-none focus:border-amber-700 transition"
              placeholder="admin@ankamer.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2 font-bold">
              Şifre
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-stone-200 outline-none focus:border-amber-700 transition"
              autoComplete="current-password"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-900 text-white py-4 tracking-[0.2em] font-bold uppercase hover:bg-amber-800 transition duration-500 disabled:bg-stone-400 disabled:cursor-not-allowed"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </main>
  );
}
