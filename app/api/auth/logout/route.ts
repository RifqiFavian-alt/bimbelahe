import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function POST() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("access_token")?.value;

    if (token) {
      const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);
      await jwtVerify(token, secretKey);
    }

    const response = NextResponse.json(
      {
        success: true,
        message: "Anda telah berhasil keluar.",
        loggedOutAt: new Date().toISOString(),
      },
      { status: 200 }
    );

    response.cookies.set("access_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });

    response.cookies.set("refresh_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("Terjadi kesalahan saat logout:", error);

    const response = NextResponse.json(
      {
        success: true,
        message: "Anda telah berhasil keluar.",
        loggedOutAt: new Date().toISOString(),
      },
      { status: 200 }
    );

    response.cookies.set("access_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });

    response.cookies.set("refresh_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });

    return response;
  }
}
