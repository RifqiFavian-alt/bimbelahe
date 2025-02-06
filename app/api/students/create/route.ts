import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, phone, startMonth } = await req.json();
    const currentYear = new Date().getFullYear();
    const student = await prisma.student.create({
      data: {
        name,
        email,
        phone,
        payments: {
          create: Array.from({ length: 12 - startMonth + 1 }, (_, i) => ({
            month: startMonth + i,
            year: currentYear,
          })),
        },
      },
    });

    return NextResponse.json({ success: true, data: student }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to create student", error }, { status: 500 });
  }
}
