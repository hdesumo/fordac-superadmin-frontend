import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("superadmin_token")?.value || "";
  const { pathname } = request.nextUrl;

  // Autorise les routes publiques
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // Redirection si pas de token et tentative d'accès au dashboard
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Active le middleware uniquement sur certaines routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
