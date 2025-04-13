import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, phone, startMonth } = await req.json();

    if (!name || !email || !phone || typeof startMonth !== "number" || startMonth < 1 || startMonth > 12) {
      return NextResponse.json({ success: false, message: "Semua data wajib diisi dan bulan mulai harus valid (1-12)." }, { status: 400 });
    }

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

    return NextResponse.json({ success: true, message: "Siswa berhasil ditambahkan.", data: student }, { status: 201 });
  } catch (error) {
    console.error("Terjadi kesalahan saat menambahkan siswa:", error);

    return NextResponse.json({ success: false, message: "Gagal menambahkan siswa. Silakan coba lagi nanti." }, { status: 500 });
  }
}
