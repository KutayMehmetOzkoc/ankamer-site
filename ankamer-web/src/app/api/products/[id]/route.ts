import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

async function requireAuth(req: Request) {
  if (!supabase) {
    return { error: NextResponse.json({ success: false, error: "Supabase is not configured." }, { status: 503 }) };
  }
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return { error: NextResponse.json({ success: false, error: "Yetkisiz. Giriş yapın." }, { status: 401 }) };
  }
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) {
    return { error: NextResponse.json({ success: false, error: "Geçersiz veya süresi dolmuş oturum." }, { status: 401 }) };
  }
  return { user };
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { success: false, error: "Supabase is not configured." },
        { status: 503 }
      );
    }
    const auth = await requireAuth(req);
    if (auth.error) return auth.error;

    const { id } = await context.params;
    const body = await req.json();

    const row: Record<string, unknown> = {};
    if (body.name !== undefined) row.name = body.name;
    if (body.category !== undefined) row.category = body.category;
    if (body.origin !== undefined) row.origin = body.origin;
    if (body.image !== undefined) row.image = body.image;
    if (body.features !== undefined) row.features = body.features;
    if (body.hardness !== undefined) row.hardness = body.hardness;
    if (body.usageArea !== undefined) row.usage_area = body.usageArea;

    if (Object.keys(row).length === 0) {
      return NextResponse.json({ success: false, error: "Güncellenecek alan yok." }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("products")
      .update(row)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase PATCH error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
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
    });
  } catch (err) {
    console.error("Product update error:", err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { success: false, error: "Supabase is not configured." },
        { status: 503 }
      );
    }
    const auth = await requireAuth(req);
    if (auth.error) return auth.error;

    const { id } = await context.params;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.error("Supabase DELETE error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Product delete error:", err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
