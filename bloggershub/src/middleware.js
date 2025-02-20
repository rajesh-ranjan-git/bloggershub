import { NextResponse } from "next/server";
import axios from "axios";
import { checkAuthServiceApi } from "./services/apiUrls";

export async function middleware(request) {
  const cookies = request.headers.get("cookie");

  let checkAuthServiceResponse;

  try {
    checkAuthServiceResponse = await axios.get(checkAuthServiceApi, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies || "", // Forward cookies
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Expires: "0",
      },
    });
  } catch (error) {
    console.log("Error during authorization : ", error);
    return NextResponse.redirect(new URL("/blog", request.url));
  }

  if (!checkAuthServiceResponse.data.success) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Apply middleware only to specific paths
export const config = {
  matcher: ["/user/:path*"],
};
