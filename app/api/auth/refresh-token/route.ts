import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json({ success: false, message: "No refresh token provided" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { id: string };

    const newAccessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    const newRefreshToken = jwt.sign({ id: decoded.id }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });

    const response = NextResponse.json({ success: true });

    response.cookies.set("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60,
    });

    response.cookies.set("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ success: false, message: "Invalid refresh token", error }, { status: 403 });
  }
}
