import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      return NextResponse.json(
        { success: false, error: "Admin e-posta adresi yapılandırılmamış (ADMIN_EMAIL)." },
        { status: 503 }
      );
    }
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { success: false, error: "E-posta servisi yapılandırılmamış (RESEND_API_KEY)." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Ad, e-posta ve mesaj alanları zorunludur." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Ankamer İletişim <onboarding@resend.dev>",
      to: [adminEmail],
      replyTo: email,
      subject: `[Ankamer İletişim] ${name} - Web sitesinden mesaj`,
      html: `
        <h2>Yeni iletişim formu mesajı</h2>
        <p><strong>Ad Soyad:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-posta:</strong> ${escapeHtml(email)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(phone || "—")}</p>
        <h3>Mesaj</h3>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      const isResendTestRestriction =
        "statusCode" in error && error.statusCode === 403 &&
        typeof error.message === "string" && error.message.includes("only send testing emails");
      const userMessage = isResendTestRestriction
        ? "Resend test modunda sadece hesabınıza kayıtlı e-postaya gönderim yapılıyor. ADMIN_EMAIL'i Resend hesabınızdaki e-posta ile aynı yapın veya resend.com/domains üzerinden domain doğrulayın."
        : error.message;
      return NextResponse.json(
        { success: false, error: userMessage },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Mesaj gönderilemedi.",
      },
      { status: 500 }
    );
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (c) => map[c] ?? c);
}
