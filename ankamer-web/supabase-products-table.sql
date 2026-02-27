-- Run this in Supabase Dashboard → SQL Editor to create the products table.
--
-- 1. Create a project at https://supabase.com
-- 2. Go to Project Settings → API to get your URL and anon key
-- 3. Add to .env.local:
--    NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
--    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text default 'Granit',
  origin text,
  image text,
  features text,
  hardness text,
  usage_area text,
  created_at timestamptz default now()
);

-- Optional: allow public read/write for testing (tighten with RLS later)
alter table public.products enable row level security;

create policy "Allow all for now"
  on public.products
  for all
  using (true)
  with check (true);
