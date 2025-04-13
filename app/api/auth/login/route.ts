import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ success: false, message: "Email atau kata sandi yang Anda masukkan salah." }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: "Email atau kata sandi yang Anda masukkan salah." }, { status: 401 });
    }

    const payload = { id: user.id, name: user.name, role: user.role };
    const secretKey = process.env.JWT_SECRET!;
    const refreshSecret = process.env.JWT_REFRESH_SECRET!;

    const accessToken = jwt.sign(payload, secretKey, { expiresIn: "5s" });
    const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: "7d" });

    const response = NextResponse.json({ success: true, message: "Berhasil masuk. Selamat datang kembali!" }, { status: 200 });

    response.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60,
    });

    response.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    return NextResponse.json({ success: false, message: "Terjadi kesalahan pada server. Silakan coba lagi nanti.", error: err }, { status: 500 });
  }
}
