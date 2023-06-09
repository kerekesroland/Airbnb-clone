import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api
     * - _next/static
     * - _next/image
     * - favicon.ico
     * - fonts
     */
    "/((?!api|_next/static|_next/image|favicon.ico|fonts).*)",
  ],
};

export function middleware(req: NextRequest) {
  // get the authentication cookie
  const authCookie = req.cookies.get("next-auth.session-token");
  const secureCookie = req.cookies.get("__Secure-next-auth.session-token");
  const url = req.nextUrl.clone();

  if (!authCookie && !secureCookie && !["/"].includes(req.nextUrl.pathname)) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
