# Supabase'e resim ekleme

Ürün görselleri **Supabase Storage** ile tutuluyor. İki yöntem kullanabilirsiniz.

## 1. Admin panelinden dosya yükleme (önerilen)

1. **Bucket'ı oluşturun** (bir kez):
   - Supabase Dashboard → **SQL Editor** → `supabase-storage-bucket.sql` dosyasındaki SQL'i yapıştırıp çalıştırın.
   - Bu işlem `product-images` adında public bir bucket ve gerekli yetki kurallarını oluşturur.

2. **Admin panelinde** (`/admin`):
   - "Dosya seç (JPG, PNG, WebP, GIF)" ile bilgisayarınızdan resim seçin.
   - Resim Supabase Storage'a yüklenir, oluşan URL otomatik olarak forma yazılır.
   - Ürünü kaydettiğinizde bu URL veritabanındaki `products.image` alanına kaydedilir.

## 2. Harici URL kullanma

Görsel zaten internetteyse (örn. başka bir CDN veya site):
- Aynı formda "Veya görsel URL'si yapıştırın" kutusuna doğrudan URL'yi yapıştırın.
- Bu URL de `products.image` olarak saklanır; Supabase Storage kullanılmaz.

## Teknik özet

- **Bucket:** `product-images` (public, herkes okuyabilir).
- **Yükleme:** Sadece giriş yapmış (authenticated) kullanıcılar yükleyebilir.
- **Yükleme yeri:** Admin sayfasında seçilen dosya, tarayıcıdan `supabase.storage.from('product-images').upload(...)` ile gönderilir; yanıt olarak public URL alınır ve forma yazılır.
