import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function POST() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("access_token")?.value;

    // Validasi token (opsional)
    if (token) {
      const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);
      await jwtVerify(token, secretKey);
    }

    // Hapus cookie `access_token`
    const response = NextResponse.json(
      {
        success: true,
        message: "Logout successful",
        loggedOutAt: new Date().toISOString(),
      },
      { status: 200 }
    );

    response.cookies.set("access_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0, // Menghapus cookie
    });

    return response;
  } catch (error) {
    console.error("Error during logout:", error);

    // Tanggapi dengan status sukses meskipun token tidak valid atau tidak ditemukan
    // agar tidak membocorkan informasi
    const response = NextResponse.json(
      {
        success: true,
        message: "Logout successful",
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

    return response;
  }
}
