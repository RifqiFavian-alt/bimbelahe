import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token =
    req.cookies.get("access_token")?.value || // Cek JWT di cookies
    req.headers.get("Authorization")?.split(" ")[1]; // Fallback ke Authorization header

  if (!token) {
    return NextResponse.json({ success: false, message: "Unauthorized: No token provided" }, { status: 401 });
  }

  try {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secretKey);

    const role = payload.role;

    if (req.nextUrl.pathname.startsWith("/dashboard/user") && role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Forbidden: Admin access required" }, { status: 403 });
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.json({ success: false, message: "Unauthorized: Invalid token", error: err }, { status: 403 });
  }
}

export const config = {
  matcher: ["/api/students/:path*", "/api/payments/:path*", "/api/questionnaires/:path*", "/api/users/:path*", "/api/get-profile", "/dashboard/:path*"],
};
