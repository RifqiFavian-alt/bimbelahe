import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 });
    }
    const payload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };

    const secretKey = process.env.JWT_SECRET!;
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    const response = NextResponse.json({ success: true, message: "Login successful" }, { status: 200 });

    response.cookies.set("access_token", token, {
      httpOnly: true, // Melindungi cookie dari akses JavaScript
      secure: process.env.NODE_ENV === "production", // Hanya untuk HTTPS di production
      sameSite: "strict", // Mencegah pengiriman lintas situs
      path: "/", // Berlaku untuk semua route
      maxAge: 60 * 60, // 1 jam
    });

    return response;
  } catch (err) {
    return NextResponse.json({ success: false, message: "Something went wrong", error: err }, { status: 500 });
  }
}
