import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json(
        { success: false, error: "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env" },
        { status: 503 }
      );
    }
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase GET error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // Map snake_case to camelCase for frontend
    const products = (data ?? []).map((row) => ({
      id: row.id,
      name: row.name,
      category: row.category,
      origin: row.origin,
      image: row.image,
      features: row.features,
      hardness: row.hardness,
      usageArea: row.usage_area,
      createdAt: row.created_at,
    }));

    return NextResponse.json({ success: true, data: products });
  } catch (error: unknown) {
    console.error("Products fetch error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { success: false, error: "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env" },
        { status: 503 }
      );
    }

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) {
      return NextResponse.json({ success: false, error: "Yetkisiz. Giriş yapın." }, { status: 401 });
    }
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ success: false, error: "Geçersiz veya süresi dolmuş oturum." }, { status: 401 });
    }

    const body = await req.json();

    const row = {
      name: body.name,
      category: body.category ?? "Granit",
      origin: body.origin ?? null,
      image: body.image ?? null,
      features: body.features ?? null,
      hardness: body.hardness ?? null,
      usage_area: body.usageArea ?? null,
    };

    const { data, error } = await supabase.from("products").insert(row).select().single();

    if (error) {
      console.error("Supabase POST error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          id: data.id,
          name: data.name,
          category: data.category,
          origin: data.origin,
          image: data.image,
          features: data.features,
          hardness: data.hardness,
          usageArea: data.usage_area,
          createdAt: data.created_at,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Product create error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
