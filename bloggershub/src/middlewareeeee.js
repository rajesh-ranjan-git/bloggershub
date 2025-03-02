import { NextResponse } from "next/server";
import { checkAuthServiceApi } from "@/services/apiUrls";

export async function middleware(request) {
  // Get auth token from cookies
  const authToken = request.cookies.get("authToken")?.value;

  // If no token exists and trying to access protected route, redirect to login
  if (!authToken && request.nextUrl.pathname.startsWith("/user")) {
    return NextResponse.redirect(new URL("/blog", request.url));
  }

  // For protected routes, verify token with backend
  if (request.nextUrl.pathname.startsWith("/user")) {
    try {
      const response = await fetch(checkAuthServiceApi, {
        headers: {
          Cookie: `authToken=${authToken}`,
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!data.success) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Allow access to public routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user/:path*", // Protected routes
    "/blog", // Public routes
    "/about",
    "/contact",
  ],
};
