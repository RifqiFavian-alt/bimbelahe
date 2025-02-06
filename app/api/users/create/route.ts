import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, email, password, role } = await req.json();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error creating user", error }, { status: 500 });
  }
}
