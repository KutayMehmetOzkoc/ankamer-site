-- Supabase Dashboard → SQL Editor'da çalıştırın.
-- Ürün görselleri için public bir bucket oluşturur; authenticated kullanıcılar yükleyebilir.

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

-- Giriş yapmış kullanıcılar bu bucket'a dosya yükleyebilir
create policy "Authenticated users can upload product images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'product-images');

-- Herkes (public) bu bucket'tan dosya okuyabilir (public bucket)
create policy "Public read for product images"
on storage.objects for select
to public
using (bucket_id = 'product-images');
