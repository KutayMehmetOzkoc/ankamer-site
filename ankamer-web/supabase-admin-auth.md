# Admin login (Supabase Auth)

Admin credentials are **not** stored in a custom table. They are managed by **Supabase Auth** (built-in authentication):

- Passwords are hashed and never stored in plain text.
- Login uses email + password; sessions are JWTs.

## Create the admin user

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project.
2. Go to **Authentication** → **Users** → **Add user** → **Create new user**.
3. Enter the admin **email** and **password**, then confirm.

Only users that exist in Supabase Auth can sign in at `/admin/login`. To restrict admin to specific emails, you can later add an `admins` table or use Supabase user metadata.

## Flow

- **`/admin`** – Requires a valid session; redirects to `/admin/login` if not signed in.
- **`/admin/login`** – Email + password form; calls `supabase.auth.signInWithPassword()`.
- **POST `/api/products`** – Requires `Authorization: Bearer <access_token>`; rejects requests without a valid Supabase JWT.
