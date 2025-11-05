import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, phone, address, birthday, startMonth, programIds } = await req.json();

    if (!name || !email || !phone || !address || !birthday || typeof startMonth !== "number" || startMonth < 1 || startMonth > 12 || !Array.isArray(programIds) || programIds.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Semua data wajib diisi, termasuk program dan bulan mulai yang valid (1-12).",
        },
        { status: 400 }
      );
    }

    const currentYear = new Date().getFullYear();

    const student = await prisma.student.create({
      data: {
        name,
        email,
        phone,
        address,
        birthday,
        payments: {
          create: Array.from({ length: 12 - startMonth + 1 }, (_, i) => ({
            month: startMonth + i,
            year: currentYear,
          })),
        },
        programs: {
          connect: programIds.map((id: string) => ({ id })),
        },
      },
      include: {
        programs: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Siswa berhasil ditambahkan dan dikaitkan dengan program.",
        data: student,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Terjadi kesalahan saat menambahkan siswa:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menambahkan siswa. Silakan coba lagi nanti.",
      },
      { status: 500 }
    );
  }
}
