import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  if (!accessToken) {
    if (refreshToken) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(accessToken, secretKey);

    const role = payload.role;
    if ((req.nextUrl.pathname.startsWith("/dashboard/user") || req.nextUrl.pathname.startsWith("/api/users")) && role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Forbidden: Admin access required" }, { status: 403 });
    }

    return NextResponse.next();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    if (refreshToken) {
      return NextResponse.next();
    }

    return NextResponse.json({ success: false, message: "Unauthorized: Invalid token" }, { status: 403 });
  }
}

export const config = {
  matcher: [
    "/api/students/:path*",
    "/api/payments/:path*",
    "/api/questionnaires/update-detail",
    "/api/questionnaires/update",
    "/api/questionnaires/delete",
    "/api/users/:path*",
    "/api/get-profile",
    "/dashboard/:path*",
  ],
};
