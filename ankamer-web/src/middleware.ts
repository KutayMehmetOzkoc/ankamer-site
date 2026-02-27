import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const defaultLocale = "tr";
const locales = ["tr", "en"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Admin ve API locale olmadan çalışsın
  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  // Zaten locale ile başlıyorsa (tr veya en) devam et
  if (locales.includes(firstSegment)) {
    return NextResponse.next();
  }

  // / -> /tr
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  // /urunler, /hakkimizda, /iletisim -> /tr/...
  if (["urunler", "hakkimizda", "iletisim"].includes(firstSegment)) {
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon|.*\\..*).*)"],
};
