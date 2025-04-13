import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const name = searchParams.get("name") || "";

    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
      return NextResponse.json({ success: false, message: "Parameter halaman dan batas harus berupa angka yang valid." }, { status: 400 });
    }

    const skip = (page - 1) * limit;

    const [students, totalStudents] = await Promise.all([
      prisma.student.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
        where: {
          name: {
            contains: name,
            mode: "insensitive",
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: "asc" },
      }),
      prisma.student.count({
        where: {
          name: {
            contains: name,
            mode: "insensitive",
          },
        },
      }),
    ]);

    const responseMessage = totalStudents === 0 ? "Tidak ada data siswa yang ditemukan." : "Data siswa berhasil diambil.";

    return NextResponse.json(
      {
        success: true,
        message: responseMessage,
        data: {
          students,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalStudents / limit),
            totalStudents,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil data siswa:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data siswa. Silakan coba lagi nanti.",
      },
      { status: 500 }
    );
  }
}
