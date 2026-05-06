import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public and protected routes
  const isProtectedRoute = path.startsWith("/dashboard");

  // In a real production app with Firebase, you'd verify a session cookie here using Firebase Admin.
  // For this prototype, we'll check for a basic "auth-token" cookie set by the client.
  const token = request.cookies.get("auth-token")?.value || "";

  // Redirect logic
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if ((path === "/login" || path === "/signup") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/forgot-password",
    "/dashboard/:path*",
  ],
};
